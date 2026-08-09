"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Mail, Phone, AtSign } from "lucide-react";

const CONTACT_EMAIL = "info@antrix.solutions";
const CONTACT_PHONE = "+91 94996 36914";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    need: "Antrix Measure Demo",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const payload = new FormData();
      payload.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
      payload.append("subject", `Demo Request — ${form.need}`);
      payload.append("from_name", "Antrix Website");
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("replyto", form.email);
      payload.append("phone", form.phone);
      payload.append("company", form.company);
      payload.append("industry", form.industry);
      payload.append("need", form.need);
      payload.append("message", form.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          industry: "",
          need: "Antrix Measure Demo",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-bg-secondary border border-border rounded-md px-4 py-3 text-[15px] text-white placeholder:text-text-muted focus:outline-none focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)] transition-all duration-200";

  return (
    <section id="contact" className="py-2xl md:py-3xl">
      <div className="max-w-content mx-auto px-md md:px-xl grid grid-cols-1 lg:grid-cols-2 gap-2xl">
        <Reveal>
          <Eyebrow>GET IN TOUCH</Eyebrow>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-display leading-[1.1]">
            Let&apos;s Build Something
            <br />
            Precise.
          </h2>

          <div className="mt-xl space-y-md">
            <div className="flex items-center gap-3 text-text-secondary">
              <MapPin size={18} />
              Surat, Gujarat, India
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <Mail size={18} />
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <Phone size={18} />
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="hover:text-white">
                {CONTACT_PHONE}
              </a>
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <AtSign size={18} />
              <a
                href="https://antrix.solutions"
                className="hover:text-white"
              >
                antrix.solutions
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-md">
            <input
              required
              placeholder="Full Name *"
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email Address *"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              required
              type="tel"
              placeholder="Mobile Number *"
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              required
              placeholder="Company / Organization *"
              className={inputClass}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <input
              required
              placeholder="Industry *"
              className={inputClass}
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            />
            <select
              className={inputClass}
              value={form.need}
              onChange={(e) => setForm({ ...form, need: e.target.value })}
            >
              <option>Antrix Measure Demo</option>
              <option>Custom Machine Vision Solution</option>
              <option>Custom Mechatronics Solution</option>
              <option>General Inquiry</option>
            </select>
            <textarea
              placeholder="Message"
              rows={4}
              className={inputClass}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-[28px] py-[14px] rounded-md text-[14px] md:text-[15px] font-semibold tracking-button bg-white text-black hover:bg-white/85 transition-colors disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message →"}
            </button>

            {status === "success" && (
              <p className="text-[14px] text-white/90">
                Thanks — your message has been sent. We&apos;ll get back to
                you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-[14px] text-red-400">
                Something went wrong. Please email us directly at{" "}
                {CONTACT_EMAIL}.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
