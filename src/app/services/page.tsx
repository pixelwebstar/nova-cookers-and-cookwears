"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveInquiry } from "@/lib/db";

export default function Services() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("Residential AMC (AED 499/yr)");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in your name and telephone number.");
      return;
    }

    saveInquiry({
      id: "srv-" + Math.random().toString(36).substring(2, 9),
      customerName: name,
      customerPhone: phone,
      message: `[SERVICE BOOKING: ${serviceType}] ${details}`,
      date: new Date().toLocaleDateString("en-AE")
    });

    setSubmitted(true);
    setName("");
    setPhone("");
    setDetails("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero Section (White background) - Image LEFT, Text RIGHT */}
      <section className="hero-fullscreen relative border-b border-zinc-200 bg-white grid grid-cols-1 lg:grid-cols-2 items-stretch overflow-hidden">
        {/* Image Column - Left on Desktop, First on Mobile */}
        <div className="order-1 lg:order-1 relative min-h-[260px] lg:h-full bg-zinc-200">
          <Image
            src="/bosch_oven.png"
            alt="DAKEEK Technical Partnership"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Text Column - Right on Desktop, Second on Mobile */}
        <div className="order-2 lg:order-2 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-10 lg:py-24 space-y-4 lg:space-y-6">
          <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
            Technical Partnership
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-zinc-900">
            Installation &amp; AMC.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-zinc-650 font-sans max-w-xl">
            Integrated technical connections and Annual Maintenance Contracts (AMC) in partnership with DAKEEK Technical Services.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 max-w-lg">
            <button
              onClick={() => {
                const element = document.getElementById("booking-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1 cursor-pointer"
            >
              Book DAKEEK Specialist
            </button>
            <Link
              href="/shop"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Browse Appliance Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Certified Setup Packages (Cream background) - No image */}
      <section className="border-b border-zinc-200 py-20 bg-[#FAF9F6] min-h-[70vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="mb-10 space-y-2">
            <h2 className="font-serif text-3xl text-zinc-900">Certified Setup Packages</h2>
            <p className="text-sm text-zinc-500 leading-relaxed font-semibold">Flat-rate technical connections for newly sourced kitchen hardware.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-3" style={{ borderRadius: "0px" }}>
              <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Built-in Hobs</span>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Hob Connection</h3>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                Connection to gas lines or electrical grids, pressure leakage validation, and countertop safety seal adjustments.
              </p>
              <p className="text-sm font-bold font-mono text-zinc-950 pt-2">AED 250</p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-3" style={{ borderRadius: "0px" }}>
              <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Range Cookers</span>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Range Cooker Connection</h3>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                Hose replacement, regulator calibration, leveling adjustments, gas valve routing, and full electrical load check.
              </p>
              <p className="text-sm font-bold font-mono text-zinc-950 pt-2">AED 350</p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-3" style={{ borderRadius: "0px" }}>
              <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Commercial</span>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Commercial Burner Connection</h3>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                High-pressure regulator routing, industrial safety line integration, manifold pressure checks, and commercial license certification.
              </p>
              <p className="text-sm font-bold font-mono text-zinc-950 pt-2">AED 450</p>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contact"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Inquire via Sourcing Desk
            </Link>
            <Link
              href="/shop"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Browse Sourcing Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Annual Maintenance Contracts (AMC) (White background) - Text LEFT, Image RIGHT */}
      <section className="border-b border-zinc-200 py-20 bg-white min-h-[70vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Title & Cards Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl text-zinc-900">Annual Maintenance Contracts (AMC)</h2>
                <p className="text-sm text-zinc-500 leading-relaxed font-semibold">Long-term checkup and warranty protection for residential kitchens.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-4" style={{ borderRadius: "0px" }}>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Residential AMC</h3>
                    <p className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Hobs</p>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-650 font-medium">
                    Includes two proactive annual checkups: burner nozzle cleaning, thermocouple safety test, valve lubrication.
                  </p>
                  <p className="text-sm font-bold font-mono text-zinc-950 pt-2">AED 499 / Yr</p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-4" style={{ borderRadius: "0px" }}>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Villa AMC</h3>
                    <p className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Whole Kitchen</p>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-650 font-medium">
                    Total kitchen appliance coverage (cooker, hobs, ovens, ceiling extraction hoods). Emergency leak checks.
                  </p>
                  <p className="text-sm font-bold font-mono text-zinc-950 pt-2">AED 899 / Yr</p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-4" style={{ borderRadius: "0px" }}>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Commercial AMC</h3>
                    <p className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Restaurants</p>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-650 font-medium">
                    Heavy-duty burner inspections, replacement regulator seals, compliance audits for local safety authorities.
                  </p>
                  <p className="text-sm font-bold font-mono text-zinc-950 pt-2">AED 1,499 / Yr</p>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6]">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200">
                <Image
                  src="/bosch_pcr9a5b90m.png"
                  alt="Annual Maintenance Checkup"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Safety Compliance Checklist (Cream background) - No image */}
      <section className="border-b border-zinc-200 py-20 bg-[#FAF9F6] min-h-[70vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                Safety Protocol
              </span>
              <h2 className="font-serif text-3xl tracking-tight text-zinc-900">
                Installation Compliance Rules
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-zinc-500 font-medium">
                <strong className="font-bold text-zinc-800">Every connection registered</strong> through NOVA and DAKEEK undergoes a strict safety checklist before final sign-off.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-zinc-200 p-6 bg-white space-y-2" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Gas Pressure Leak Test</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-500 font-medium">
                  Manifold air pressure leakage test conducted for 15 minutes at twice the operational pressure to guarantee gas line stability.
                </p>
              </div>

              <div className="border border-zinc-200 p-6 bg-white space-y-2" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Flame Sensor Audit</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-500 font-medium">
                  Verification of thermocouple safety valves on hobs and range cookers to ensure immediate gas shut-off if the flame goes out.
                </p>
              </div>

              <div className="border border-zinc-200 p-6 bg-white space-y-2" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Dedicated Electrical Wiring</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-500 font-medium">
                  Load analysis and wiring insulation validation for electric convection ovens and smart hobs to prevent load surges.
                </p>
              </div>

              <div className="border border-zinc-200 p-6 bg-white space-y-2" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Dubai Civil Defense Sign-off</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-500 font-medium">
                  Official engineering checklist verification matching all local municipal fire and gas safety standards.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button
              onClick={() => {
                const element = document.getElementById("booking-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1 cursor-pointer"
            >
              Submit Installation Ticket
            </button>
            <Link
              href="/contact"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Contact Support Dispatch
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Booking Form Block (White background) - Image LEFT, Form RIGHT */}
      <section id="booking-section" className="py-20 bg-white min-h-[70vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-zinc-200 p-6 md:p-10">
            {/* Image Column first - purely ONLY the image container block */}
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6] flex flex-col justify-center">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200 h-full w-full min-h-[300px]">
                <Image
                  src="/smeg_ssa91max2.png"
                  alt="Schedule Setup Sourcing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Form & Text Column second */}
            <div className="lg:col-span-7 bg-[#FAF9F6] border border-zinc-200 p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl text-zinc-900 font-bold">Request DAKEEK Service Booking</h3>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-650 font-semibold">
                  Schedule a certified engineer to visit your residential or commercial kitchen. DAKEEK’s support dispatch team will contact you to align on appointment slots.
                </p>
                <div className="flex items-center space-x-3 text-xs font-bold text-zinc-800">
                  <span>Support Hotline:</span>
                  <span className="text-zinc-500 font-mono">+971 4 123 4567</span>
                </div>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-white border border-zinc-200 space-y-4">
                  <span className="text-zinc-600 font-bold block text-sm uppercase tracking-wider">✓ Booking Request Received</span>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-500 font-medium">
                    Your DAKEEK service ticket has been created. A service representative will call you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-zinc-200 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Your Name</label>
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
                      <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Phone Number</label>
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
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Service Selected</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                      style={{ borderRadius: "0px" }}
                    >
                      <option>Built-in Hob Installation (AED 250)</option>
                      <option>Range Cooker Installation (AED 350)</option>
                      <option>Commercial Burner Calibration (AED 450)</option>
                      <option>Residential AMC (AED 499/yr)</option>
                      <option>Premium Villa AMC (AED 899/yr)</option>
                      <option>Commercial AMC (AED 1,499/yr)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Address / Special Request Details</label>
                    <textarea
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                      style={{ borderRadius: "0px" }}
                      placeholder="Provide kitchen dimensions, specific timing, or gas type requirements (LPG/Natural Gas)..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full matte-button-solid py-3 text-xs font-bold uppercase tracking-widest"
                  >
                    Book DAKEEK Specialist
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
