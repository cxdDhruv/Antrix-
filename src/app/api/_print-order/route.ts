import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  PRICING,
  computeQuote,
  formatINR,
  isValidOptions,
  type QuoteOptions,
} from "@/lib/printPricing";

export const runtime = "nodejs";

const EXT = /\.(stl|obj|3mf)$/i;
const DIRECT_MAX = 4.5 * 1024 * 1024;
const ATTACH_MAX = 20 * 1024 * 1024; // Gmail caps messages at 25MB
const BLOB_HOST = /^[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/i;

const FIELDS = {
  name: 80,
  email: 120,
  phone: 20,
  address: 200,
  city: 60,
  pincode: 10,
  notes: 1000,
} as const;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

function orderId() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `AX3D-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function POST(request: Request) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, ORDER_EMAIL_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return fail("Ordering is not configured yet. Please email us your file.", 503);
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return fail("Invalid request.");
  }

  // Customer fields
  const f = {} as Record<keyof typeof FIELDS, string>;
  for (const [key, max] of Object.entries(FIELDS) as [keyof typeof FIELDS, number][]) {
    const v = String(data.get(key) ?? "").trim();
    if (v.length > max) return fail(`${key} is too long.`);
    if (key !== "notes" && !v) return fail(`Please fill in ${key}.`);
    f[key] = v;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return fail("Invalid email.");
  if (!/^[0-9]{6}$/.test(f.pincode)) return fail("Invalid PIN code.");

  // Print options + model stats
  let opts: QuoteOptions;
  let model: { fileName: string; fileSize: number; volumeCm3: number; areaCm2: number; sizeMm: number[] };
  try {
    const o = JSON.parse(String(data.get("options")));
    if (!isValidOptions(o)) return fail("Invalid print options.");
    opts = o;
    model = JSON.parse(String(data.get("model")));
  } catch {
    return fail("Invalid order data.");
  }
  const nums = [model.volumeCm3, model.areaCm2, ...(model.sizeMm ?? [])];
  if (
    nums.length !== 5 ||
    !nums.every((n) => Number.isFinite(n) && n >= 0) ||
    !Number.isFinite(model.fileSize)
  ) {
    return fail("Invalid model data.");
  }
  // ponytail: volume/area come from the browser's parse; fine for a quote that we confirm by hand,
  // re-measure the file server-side before taking online payment.
  const quote = computeQuote(model, opts);

  // Model file: direct upload (small) or Vercel Blob URL (large)
  const attachments: { filename: string; content: Buffer }[] = [];
  let fileName = "";
  let fileLink = "";
  const file = data.get("file");
  const blobUrl = String(data.get("blobUrl") ?? "");

  if (file instanceof File) {
    if (!EXT.test(file.name)) return fail("Only STL, OBJ or 3MF files.");
    if (file.size > DIRECT_MAX) return fail("File too large for direct upload.");
    fileName = file.name;
    attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
  } else if (blobUrl) {
    let url: URL;
    try {
      url = new URL(blobUrl);
    } catch {
      return fail("Invalid file link.");
    }
    if (url.protocol !== "https:" || !BLOB_HOST.test(url.hostname) || !EXT.test(url.pathname)) {
      return fail("Invalid file link.");
    }
    fileName = decodeURIComponent(url.pathname.split("/").pop() ?? "model");
    fileLink = url.toString();
    const head = await fetch(fileLink, { method: "HEAD" });
    if (!head.ok) return fail("Uploaded file not found.");
    const size = Number(head.headers.get("content-length") ?? 0);
    if (size && size <= ATTACH_MAX) {
      const res = await fetch(fileLink);
      if (res.ok) attachments.push({ filename: fileName, content: Buffer.from(await res.arrayBuffer()) });
    }
  } else {
    return fail("Please attach your 3D model.");
  }

  const id = orderId();
  const mat = PRICING.materials[opts.material];
  const q = PRICING.qualities[opts.quality];
  const rows: [string, string][] = [
    ["Order ID", id],
    ["Name", f.name],
    ["Email", f.email],
    ["Phone", f.phone],
    ["Address", `${f.address}, ${f.city} - ${f.pincode}`],
    ["File", `${fileName} (${(model.fileSize / 1024 / 1024).toFixed(2)} MB)`],
    ["Size", `${model.sizeMm.map((d) => d.toFixed(1)).join(" × ")} mm`],
    ["Volume", `${model.volumeCm3.toFixed(2)} cm³`],
    ["Material", mat.label],
    ["Quality", `${q.label} (${q.layer})`],
    ["Infill", `${Math.round(opts.infill * 100)}%`],
    ["Colour", opts.color],
    ["Quantity", String(opts.qty)],
    ["Weight / piece", `${quote.grams.toFixed(1)} g`],
    ["Print time / piece", `${quote.hours.toFixed(2)} h`],
    ["Estimated total", formatINR(quote.total)],
    ["Notes", f.notes || "-"],
  ];
  const table = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#666;border-bottom:1px solid #eee">${esc(k)}</td><td style="border-bottom:1px solid #eee"><b>${esc(v)}</b></td></tr>`,
    )
    .join("")}</table>`;
  const linkHtml = fileLink
    ? `<p>Download model: <a href="${esc(fileLink)}">${esc(fileName)}</a>${
        attachments.length ? " (also attached)" : " (too large to attach)"
      }</p>`
    : "";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `"Antrix 3D Printing" <${GMAIL_USER}>`,
      to: ORDER_EMAIL_TO || GMAIL_USER,
      replyTo: f.email,
      subject: `New 3D print order ${id} · ${formatINR(quote.total)} · ${f.name}`,
      html: `<h2 style="font-family:Arial,sans-serif">New 3D print order</h2>${table}${linkHtml}`,
      attachments,
    });
  } catch (e) {
    console.error("print-order: owner mail failed", e);
    return fail("Could not place the order right now. Please try again.", 502);
  }

  // Customer copy is best-effort; the order is already with us.
  // Awaited because serverless functions may freeze once the response is sent.
  try {
    await transporter.sendMail({
      from: `"Antrix" <${GMAIL_USER}>`,
      to: f.email,
      subject: `We received your 3D print order ${id}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px"><p>Hi ${esc(f.name)},</p><p>Thanks for your order. We'll review your file and confirm the final price and payment details shortly.</p>${table}<p>Antrix · Surat, Gujarat, India</p></div>`,
    });
  } catch (e) {
    console.error("print-order: customer mail failed", e);
  }

  return NextResponse.json({ ok: true, orderId: id });
}
