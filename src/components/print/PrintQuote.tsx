"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Minus, Plus, RotateCcw, Upload } from "lucide-react";
import type { LoadedModel } from "@/lib/meshStats";
import {
  PRICING,
  computeQuote,
  formatINR,
  type Color,
  type Material,
  type Quality,
  type QuoteOptions,
} from "@/lib/printPricing";

const ModelViewer = dynamic(
  () => import("@/components/print/ModelViewer").then((m) => m.ModelViewer),
  { ssr: false },
);

const ACCEPT = ".stl,.obj,.3mf";
const MAX_MB = 100;
const DIRECT_LIMIT = 4 * 1024 * 1024; // Vercel request bodies cap at 4.5MB
const ease = [0.22, 1, 0.36, 1] as const;

type Model = LoadedModel & { file: File };
type Status = "idle" | "uploading" | "sending" | "done" | "error";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  notes: "",
};

function fitsBuildVolume(size: [number, number, number]) {
  const part = [...size].sort((a, b) => b - a);
  const bed = [...PRICING.buildVolumeMm].sort((a, b) => b - a);
  return part.every((d, i) => d <= bed[i]);
}

function Label({ step, children }: { step: string; children: string }) {
  return (
    <p className="mb-sm flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50">
      <span className="text-white">{step}</span> {children}
    </p>
  );
}

export function PrintQuote() {
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [opts, setOpts] = useState<QuoteOptions>({
    material: "PLA",
    quality: "standard",
    infill: 0.2,
    color: "Black",
    qty: 1,
  });
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => model?.geometry.dispose(), [model]);

  const quote = useMemo(
    () => (model ? computeQuote(model, opts) : null),
    [model, opts],
  );
  const fits = model ? fitsBuildVolume(model.sizeMm) : true;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setLoadError("");
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ACCEPT.split(",").includes(ext)) {
      setLoadError("Please upload an STL, OBJ or 3MF file.");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setLoadError(`Files up to ${MAX_MB}MB, please.`);
      return;
    }
    setLoading(true);
    try {
      const { loadModel } = await import("@/lib/meshStats");
      const loaded = await loadModel(file);
      setModel({ ...loaded, file });
      setStatus("idle");
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Could not read this file.");
    } finally {
      setLoading(false);
    }
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!model || !quote) return;
    setError("");

    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v.trim()));
    body.append("options", JSON.stringify(opts));
    body.append(
      "model",
      JSON.stringify({
        fileName: model.file.name,
        fileSize: model.file.size,
        volumeCm3: model.volumeCm3,
        areaCm2: model.areaCm2,
        sizeMm: model.sizeMm,
      }),
    );

    try {
      if (model.file.size <= DIRECT_LIMIT) {
        body.append("file", model.file);
      } else {
        setStatus("uploading");
        setProgress(0);
        const { upload } = await import("@vercel/blob/client");
        const blob = await upload(`print-orders/${model.file.name}`, model.file, {
          access: "public",
          handleUploadUrl: "/api/print-upload",
          contentType: "application/octet-stream",
          multipart: model.file.size > 20 * 1024 * 1024,
          onUploadProgress: (p) => setProgress(Math.round(p.percentage)),
        });
        body.append("blobUrl", blob.url);
      }

      setStatus("sending");
      const res = await fetch("/api/print-order", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Order failed.");
      setOrderId(data.orderId);
      setStatus("done");
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  const busy = status === "uploading" || status === "sending";
  const input =
    "w-full rounded-xl border border-white/10 bg-[#111] px-4 py-[14px] text-[15px] text-white placeholder:text-white/35 focus:outline-none focus:border-white/50 transition-colors";

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-lg lg:gap-xl items-start">
      {/* Stage */}
      <div className="lg:sticky lg:top-[80px]">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          className={`relative aspect-square lg:aspect-auto lg:h-[calc(100vh-120px)] lg:max-h-[720px] overflow-hidden rounded-[32px] border bg-[#0b0b0b] transition-colors duration-300 ${
            dragging ? "border-white" : "border-white/10"
          }`}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08),transparent_65%)]"
          />

          {model ? (
            <>
              <ModelViewer geometry={model.geometry} color={PRICING.colors[opts.color]} />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-xs p-md">
                <div className="rounded-full bg-black/70 backdrop-blur px-4 py-2 text-[13px] font-medium">
                  {model.file.name}
                </div>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black transition-transform hover:scale-105"
                >
                  <RotateCcw size={14} /> Replace
                </button>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap gap-xs p-md">
                {[
                  `${model.sizeMm.map((d) => d.toFixed(1)).join(" × ")} mm`,
                  `${model.volumeCm3.toFixed(2)} cm³`,
                ].map((t) => (
                  <span key={t} className="rounded-full bg-black/70 backdrop-blur px-4 py-2 text-[13px]">
                    {t}
                  </span>
                ))}
                {!fits && (
                  <span className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black">
                    Larger than our {PRICING.buildVolumeMm.join("×")} mm bed. We&apos;ll contact you.
                  </span>
                )}
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-md p-lg text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-black transition-transform duration-300 group-hover:scale-110"
              >
                {loading ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
              </motion.div>
              <div>
                <p className="text-[24px] md:text-[32px] font-semibold tracking-tighter">
                  {loading ? "Reading your model…" : "Drop your 3D model here"}
                </p>
                <p className="mt-xs text-[15px] text-text-secondary">
                  STL, OBJ or 3MF · up to {MAX_MB}MB · units in mm
                </p>
              </div>
              <span className="rounded-full border border-white/30 px-5 py-2 text-[14px] font-medium transition-colors group-hover:bg-white group-hover:text-black">
                Browse files
              </span>
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
        {loadError && (
          <p role="alert" className="mt-sm text-[14px] text-red-400">
            {loadError}
          </p>
        )}
      </div>

      {/* Configurator */}
      <div className="space-y-xl">
        <div>
          <Label step="01">Material</Label>
          <div className="grid grid-cols-2 gap-xs">
            {(Object.keys(PRICING.materials) as Material[]).map((m) => {
              const on = opts.material === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setOpts({ ...opts, material: m })}
                  className={`rounded-2xl border p-md text-left transition-all duration-300 ${
                    on ? "border-white bg-white text-black" : "border-white/10 hover:border-white/40"
                  }`}
                >
                  <span className="block text-[17px] font-semibold">{PRICING.materials[m].label}</span>
                  <span className={`mt-1 block text-[13px] leading-[1.4] ${on ? "text-black/60" : "text-white/50"}`}>
                    {PRICING.materials[m].note}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label step="02">Quality</Label>
          <div className="grid grid-cols-3 gap-xs">
            {(Object.keys(PRICING.qualities) as Quality[]).map((q) => {
              const on = opts.quality === q;
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => setOpts({ ...opts, quality: q })}
                  className={`rounded-2xl border p-md text-left transition-all duration-300 ${
                    on ? "border-white bg-white text-black" : "border-white/10 hover:border-white/40"
                  }`}
                >
                  <span className="block text-[16px] font-semibold">{PRICING.qualities[q].label}</span>
                  <span className={`block text-[13px] ${on ? "text-black/60" : "text-white/50"}`}>
                    {PRICING.qualities[q].layer}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <Label step="03">Infill</Label>
            <span className="text-[17px] font-semibold">{Math.round(opts.infill * 100)}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={Math.round(opts.infill * 100)}
            onChange={(e) => setOpts({ ...opts, infill: Number(e.target.value) / 100 })}
            aria-label="Infill percentage"
            className="w-full accent-white"
          />
          <div className="mt-1 flex justify-between text-[12px] text-white/40">
            <span>Light</span>
            <span>Strong</span>
            <span>Solid</span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-lg">
          <div>
            <Label step="04">Colour</Label>
            <div className="flex flex-wrap gap-xs">
              {(Object.keys(PRICING.colors) as Color[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  title={c}
                  aria-label={c}
                  aria-pressed={opts.color === c}
                  onClick={() => setOpts({ ...opts, color: c })}
                  className={`h-10 w-10 rounded-full border-2 transition-transform duration-300 hover:scale-110 ${
                    opts.color === c ? "border-white scale-110" : "border-white/15"
                  }`}
                  style={{ background: PRICING.colors[c] }}
                />
              ))}
            </div>
            <p className="mt-xs text-[13px] text-white/50">{opts.color}</p>
          </div>
          <div>
            <Label step="05">Qty</Label>
            <div className="flex items-center rounded-full border border-white/15">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setOpts({ ...opts, qty: Math.max(1, opts.qty - 1) })}
                className="p-3"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center text-[17px] font-semibold">{opts.qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setOpts({ ...opts, qty: Math.min(PRICING.maxQty, opts.qty + 1) })}
                className="p-3"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="rounded-[28px] border border-white/10 bg-[#0d0d0d] p-lg">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Instant estimate
          </p>
          <div className="mt-xs h-[64px] md:h-[72px] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={quote?.total ?? "none"}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="text-[52px] md:text-[60px] font-semibold tracking-tightest leading-none"
              >
                {quote ? formatINR(quote.total) : "—"}
              </motion.p>
            </AnimatePresence>
          </div>
          {quote ? (
            <dl className="mt-md grid grid-cols-2 gap-y-2 text-[14px]">
              <dt className="text-white/50">Weight / piece</dt>
              <dd className="text-right">{quote.grams.toFixed(1)} g</dd>
              <dt className="text-white/50">Print time / piece</dt>
              <dd className="text-right">
                {Math.floor(quote.hours)}h {Math.round((quote.hours % 1) * 60)}m
              </dd>
              <dt className="text-white/50">Material</dt>
              <dd className="text-right">{formatINR(quote.materialCost)}</dd>
              <dt className="text-white/50">Machine time</dt>
              <dd className="text-right">{formatINR(quote.machineCost)}</dd>
              <dt className="text-white/50">Setup</dt>
              <dd className="text-right">{formatINR(quote.setup)}</dd>
            </dl>
          ) : (
            <p className="mt-sm text-[14px] text-white/50">Upload a model to see your price.</p>
          )}
          <p className="mt-md text-[12px] leading-[1.5] text-white/40">
            Estimate excludes shipping and GST. Final price is confirmed after
            we review your file. Minimum order {formatINR(PRICING.minimumOrder)}.
          </p>
        </div>

        {/* Order */}
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="rounded-[28px] bg-white p-lg text-black text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
                <Check size={30} />
              </div>
              <p className="mt-md text-[28px] font-semibold tracking-tighter">Order received.</p>
              <p className="mt-xs text-[15px] text-black/60">
                Order ID <span className="font-semibold text-black">{orderId}</span>. We&apos;ve
                emailed you a copy and will confirm the final price and payment details shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setModel(null);
                }}
                className="mt-md rounded-full bg-black px-6 py-3 text-[15px] font-medium text-white"
              >
                Print another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={placeOrder}
              className="space-y-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Label step="06">Your details</Label>
              <div className="grid sm:grid-cols-2 gap-sm">
                <input required maxLength={80} placeholder="Full name *" className={input}
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input required type="email" maxLength={120} placeholder="Email *" className={input}
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input required type="tel" maxLength={20} placeholder="Mobile *" className={input}
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input required maxLength={10} inputMode="numeric" pattern="[0-9]{6}" placeholder="PIN code *" className={input}
                  value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
              </div>
              <input required maxLength={200} placeholder="Delivery address *" className={input}
                value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              <input required maxLength={60} placeholder="City *" className={input}
                value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <textarea rows={3} maxLength={1000} placeholder="Notes (orientation, tolerances, deadline…)" className={input}
                value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

              <button
                type="submit"
                disabled={!model || busy}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-[16px] text-[17px] font-medium text-black transition-transform duration-300 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
              >
                {busy && <Loader2 size={18} className="animate-spin" />}
                {status === "uploading"
                  ? `Uploading model… ${progress}%`
                  : status === "sending"
                    ? "Placing order…"
                    : model && quote
                      ? `Place order · ${formatINR(quote.total)}`
                      : "Upload a model to order"}
              </button>
              {status === "error" && (
                <p role="alert" className="text-[14px] text-red-400">
                  {error} You can also email your file to info@antrix.solutions.
                </p>
              )}
              <p className="text-[12px] text-white/40 text-center">
                No payment now. We confirm the final price before printing.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
