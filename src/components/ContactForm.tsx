"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  budget: z.string().min(1, { message: "Please select a budget range." }),
  timeline: z.string().min(1, { message: "Please select a timeline." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  honeypot: z.string().optional(), // Honeypot field for anti-spam
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      timeline: "",
      description: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/contact";
      const isExternalFormService = endpoint.startsWith("http");

      let requestBody: string;
      if (isExternalFormService) {
        // Map fields for standard external form handlers like Formspree / Web3Forms
        requestBody = JSON.stringify({
          ...data,
          message: `Company: ${data.company || "None"}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\nDetails:\n${data.description}`,
          subject: `New Freelance/Consulting Inquiry from ${data.name}`,
        });
      } else {
        requestBody = JSON.stringify(data);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: requestBody,
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please check your connection.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-8 text-center max-w-xl mx-auto glass flex flex-col items-center gap-4">
        <CheckCircle2 className="w-12 h-12 text-accent-android mx-auto" />
        <h3 className="text-xl font-bold text-white uppercase select-none">Message Sent!</h3>
        <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. Abdelrahman will review your project details and get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-5 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all font-semibold text-xs uppercase tracking-wider cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto flex flex-col gap-5 rounded-md border border-zinc-800/80 bg-[#121214]/40 p-6 sm:p-8 glass"
    >
      <h3 className="text-lg font-bold text-white uppercase tracking-tight select-none pb-2 border-b border-zinc-850">
        Start a Project Consultation
      </h3>
      
      {/* Honeypot field (hidden from users) */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("honeypot")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest" htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00e5ff] rounded px-6 py-4.5 text-white focus:outline-none text-sm transition-colors"
            {...register("name")}
          />
          {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest" htmlFor="email">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            placeholder="jane@company.com"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00e5ff] rounded px-6 py-4.5 text-white focus:outline-none text-sm transition-colors"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email.message}</p>}
        </div>
      </div>

      {/* Company */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest" htmlFor="company">
          Company / Institution <span className="text-zinc-600">(Optional)</span>
        </label>
        <input
          id="company"
          type="text"
          placeholder="Acme Corp"
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00e5ff] rounded px-6 py-4.5 text-white focus:outline-none text-sm transition-colors"
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Budget */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest" htmlFor="budget">
            Estimated Budget *
          </label>
          <select
            id="budget"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00e5ff] rounded px-6 py-4.5 text-white focus:outline-none text-sm transition-colors"
            {...register("budget")}
          >
            <option value="">Select range...</option>
            <option value="consulting">Hourly Consulting ($150+/hr)</option>
            <option value="under-5k">Small Project (&lt; $5,000)</option>
            <option value="5k-15k">Medium Project ($5,000 - $15,000)</option>
            <option value="15k-plus">Enterprise / Scaling ($15,000+)</option>
            <option value="recruiting">Full-time Contract / Recruiting</option>
          </select>
          {errors.budget && <p className="text-xs text-red-400 mt-1 font-mono">{errors.budget.message}</p>}
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest" htmlFor="timeline">
            Project Timeline *
          </label>
          <select
            id="timeline"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00e5ff] rounded px-6 py-4.5 text-white focus:outline-none text-sm transition-colors"
            {...register("timeline")}
          >
            <option value="">Select timing...</option>
            <option value="immediate">Immediate Start</option>
            <option value="1-3-months">1 to 3 Months</option>
            <option value="3-months-plus">3+ Months / Flexible</option>
          </select>
          {errors.timeline && <p className="text-xs text-red-400 mt-1 font-mono">{errors.timeline.message}</p>}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest" htmlFor="description">
          Project Details / Role Requirements *
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Briefly describe your application needs, legacy codebase issues, or architectural challenges..."
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00e5ff] rounded px-6 py-4.5 text-white focus:outline-none text-sm transition-colors resize-none"
          {...register("description")}
        />
        {errors.description && <p className="text-xs text-red-400 mt-1 font-mono">{errors.description.message}</p>}
      </div>

      {/* Error alert if any */}
      {status === "error" && (
        <div className="flex items-center gap-2 rounded border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400 font-mono">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center px-8 py-4.5 text-sm font-bold text-gray-950 rounded bg-[#00e5ff] hover:bg-cyan-400 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.1)] gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-gray-950" />
            <span>Dispatching email...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-gray-950" />
            <span>Submit Project Query</span>
          </>
        )}
      </button>
    </form>
  );
}
