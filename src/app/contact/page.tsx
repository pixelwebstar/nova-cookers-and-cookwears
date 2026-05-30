"use client";

import { useState } from "react";
import Image from "next/image";
import { saveInquiry } from "@/lib/db";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in your name and telephone number.");
      return;
    }

    saveInquiry({
      id: "cnt-" + Math.random().toString(36).substring(2, 9),
      customerName: name,
      customerPhone: phone,
      message: `[DIRECT CONTACT] ${message}`,
      date: new Date().toLocaleDateString("en-AE")
    });

    setSubmitted(true);
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero Section (White background) - Text LEFT, Image RIGHT */}
      <section className="hero-fullscreen relative border-b border-zinc-200 bg-white grid grid-cols-1 lg:grid-cols-2 items-stretch overflow-hidden">
        {/* Text Column - Left on Desktop, Second on Mobile */}
        <div className="order-2 lg:order-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-10 lg:py-24 space-y-4 lg:space-y-6">
          <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-zinc-900">
            Contact Sourcing Desk.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-zinc-650 font-sans max-w-xl">
            Request custom appliance specifications or schedule maintenance/installation coordination through DAKEEK Technical Services.
          </p>
        </div>

        {/* Image Column - Right on Desktop, First on Mobile */}
        <div className="order-1 lg:order-2 relative min-h-[260px] lg:h-full bg-zinc-200">
          <Image
            src="/bosch_oven.png"
            alt="Appliance Sourcing Inquiry"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Section 2: Importer Coordinates (Cream background) - No image */}
      <section className="border-b border-zinc-200 py-20 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                Location Details
              </span>
              <h2 className="font-serif text-3xl tracking-tight text-zinc-900">
                Sourcing Offices &amp; Hubs
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-zinc-500 font-semibold">
                <strong className="font-bold text-zinc-800">Our logistics coordinators</strong> manage supplier pickups and regional transit operations from major trade gates.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-zinc-250 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Main Office</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-550 font-semibold">
                  Dubai Mainland. Coordinates corporate compliance, developer contracts, and direct account queries.
                </p>
              </div>

              <div className="border border-zinc-250 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Deira Hub</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-550 font-semibold">
                  Sourcing depot coordinates immediately with wholesalers forbuilt-in gas hardware.
                </p>
              </div>

              <div className="border border-zinc-250 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Sharjah Yard</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-550 font-semibold">
                  Industrial Area yard manages high-pressure range cookers, commercial components, and bulk stocks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: DAKEEK Support Alliance (White background) - Text LEFT, Image RIGHT */}
      <section className="border-b border-zinc-200 py-20 bg-white min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                Technical Dispatch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900 leading-tight">
                DAKEEK Connection Hotline
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-zinc-650 font-sans">
                <strong className="font-bold text-zinc-900">Certified gas hookups, electrical calibrations</strong>, and official safety sign-offs are managed directly by DAKEEK's certified engineering dispatch desks.
              </p>
              <div className="pt-2 space-y-2 text-xs md:text-sm font-semibold text-zinc-800">
                <p>Hotline: <span className="font-mono text-zinc-550">+971 4 123 4567</span></p>
                <p>Email: <span className="font-mono text-zinc-550">dispatch@dakeek-technical.ae</span></p>
              </div>
            </div>

            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6]">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200">
                <Image
                  src="/elica_cloud_seven.png"
                  alt="DAKEEK Technical Hotline"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Callback request form (Cream background) - No image */}
      <section className="border-b border-zinc-200 py-20 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                Callback Service
              </span>
              <h2 className="font-serif text-3xl tracking-tight text-zinc-900 leading-tight">
                Request Sourcing Consultation
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-zinc-500 font-medium">
                <strong className="font-bold text-zinc-800">Provide your custom cooker specifications</strong> or DAKEEK setup request. Our team will verify distributor databases and call you back.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white border border-zinc-200 p-6 shadow-sm" style={{ borderRadius: "0px" }}>
              {submitted ? (
                <div className="p-8 text-center space-y-4">
                  <span className="text-zinc-600 font-bold block text-sm uppercase tracking-wider">✓ Consultation Submitted</span>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    Your request was recorded. Jaydeek S. or a DAKEEK engineer will call you back within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                        style={{ borderRadius: "0px" }}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">UAE Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                        style={{ borderRadius: "0px" }}
                        placeholder="+971 50..."
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Consultation message</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                      style={{ borderRadius: "0px" }}
                      placeholder="Specify appliance model, dimensions, or custom installation scheduling details..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full matte-button-solid py-3 text-xs font-bold uppercase tracking-widest"
                  >
                    Request Partner Call
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Advisory Hours (White background) - Image LEFT, Text RIGHT */}
      <section className="py-20 bg-white min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Column first */}
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6]">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200">
                <Image
                  src="/premium_kitchen_hero.png"
                  alt="Consultation Timings"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text & Timing Column second */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                  Office Hours
                </span>
                <h2 className="font-serif text-3xl tracking-tight text-zinc-900 leading-tight">
                  Consultation Timings
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-zinc-500 font-semibold">
                  <strong className="font-bold text-zinc-800">Our logistics desks coordinate supplier collections</strong> and client callbacks according to this weekly schedule.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Sourcing Desk</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    Monday to Saturday: 9:00 AM – 7:00 PM. Closed on Sundays.
                  </p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">DAKEEK Dispatch</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    Engineers available for booking slots Monday to Sunday: 8:00 AM – 8:00 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
