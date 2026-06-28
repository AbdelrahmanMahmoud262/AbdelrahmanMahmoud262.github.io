import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, Clock, ShieldCheck, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/constants";

export default function Contact() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col gap-16 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <p className="text-xs font-mono text-accent-android uppercase tracking-wider font-extrabold select-none">
          {"// LEAD GENERATION & RECRUITING FUNNEL"}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-none">
          Get in Touch
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          Ready to kick off a performance review, Compose migration, or hire an Android Team Lead? Fill out the project questionnaire below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-6 flex flex-col gap-6 glass">
            <h3 className="text-base font-bold text-white border-b border-zinc-800 pb-2 uppercase select-none">
              Direct Contact Channels
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-accent-android mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-zinc-550 font-mono text-[10px] uppercase select-none">Email</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-accent-android transition-colors font-mono">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-accent-android mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-zinc-550 font-mono text-[10px] uppercase select-none">Phone</span>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-white hover:text-[#00e5ff] transition-colors font-mono font-bold">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-[#00e5ff] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-zinc-550 font-mono text-[10px] uppercase select-none">Based in</span>
                  <span className="text-white font-mono">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timezone alignment */}
          <div className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-6 flex flex-col gap-4 glass">
            <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase select-none">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Remote Availability</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              I collaborate with remote organizations globally. My target working hours are aligned with <strong>GMT+1 through GMT+4</strong> timezones, ensuring sufficient overlap with European and Middle Eastern development sprints.
            </p>
          </div>

          {/* Recruiting Guidelines */}
          <div className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-6 flex flex-col gap-4 glass">
            <h3 className="text-base font-bold text-white flex items-center gap-2 uppercase select-none">
              <ShieldCheck className="w-4 h-4 text-accent-android" />
              <span>Recruiting Notes</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              For corporate recruiters: I am open to discussing senior-level contract roles, mobile architecture advisory, or hands-on Android Team Lead positions. Complete the form to fast-track scheduling.
            </p>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7 w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
