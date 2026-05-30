"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { saveInquiry } from "@/lib/db";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specs, setSpecs] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in your name and telephone number.");
      return;
    }
    saveInquiry({
      id: "hm-" + Math.random().toString(36).substring(2, 9),
      customerName: name,
      customerPhone: phone,
      message: `[HOMEPAGE CALLBACK] ${specs}`,
      date: new Date().toLocaleDateString("en-AE")
    });
    setFormSubmitted(true);
    setName("");
    setPhone("");
    setSpecs("");
  };

  const faqs = [
    {
      q: "What is the delivery timeline?",
      a: "Standard collections from primary distributor depots are completed and delivered within 24 to 48 hours from payment clearance."
    },
    {
      q: "Why is DAKEEK certification mandatory?",
      a: "All high-power electric cookers and gas connections require a certified technical connection to satisfy Dubai Civil Defense safety regulations."
    },
    {
      q: "Are products fully warrantied?",
      a: "Yes. Every procured appliance is brand new, factory-sealed, and carries a one-year manufacturer warranty supported by official regional service centers."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero Section (White background) */}
      <section className="hero-fullscreen relative border-b border-zinc-200 bg-white grid grid-cols-1 lg:grid-cols-2 items-stretch overflow-hidden">
        {/* Text Column */}
        <div className="order-2 lg:order-1 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-20 py-10 lg:py-24 space-y-4 lg:space-y-6">
          <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
            NOVA Cookers &amp; Cookstove Trading
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-zinc-900">
            Premium Kitchen Appliances.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-zinc-650 font-sans max-w-xl">
            Order-based sourcing for premium kitchen appliances in the UAE. Professionally installed and maintained by DAKEEK Technical Services.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            <Link
              href="/shop"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Browse Catalog
            </Link>
            <Link
              href="/services"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              DAKEEK Installation Details
            </Link>
          </div>
        </div>

        {/* Image Column */}
        <div className="order-1 lg:order-2 relative min-h-[260px] lg:h-full bg-zinc-200">
          <Image
            src="/premium_kitchen_hero.png"
            alt="Premium Matte Kitchen Range"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Section 2: Our Sourcing Advantages (Cream background) */}
      <section className="border-b border-zinc-200 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
              Brand Moat
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
              Our Sourcing Advantages
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
              <strong className="font-bold text-zinc-800">Why developers and private buyers partner with NOVA</strong> instead of standard retail outlets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-3xl font-light">01</span>
              <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                Direct Importer Pipeline
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                <strong className="font-bold text-zinc-800">We bypass retail intermediaries</strong> to source specialized luxury models directly from importer warehouses in Naif and Sharjah upon order confirmation.
              </p>
            </div>

            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-3xl font-light">02</span>
              <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                DAKEEK Engineering Integration
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                <strong className="font-bold text-zinc-800">Safety is guaranteed.</strong> DAKEEK technicians handle regulator calibration, safety pressure tests, and issue compliance certification.
              </p>
            </div>

            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-3xl font-light">03</span>
              <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                Annual Maintenance Contracts
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                <strong className="font-bold text-zinc-800">Long-term performance stability.</strong> We offer dedicated AMC checkups for cookers, hobs, and hoods to ensure ongoing safety compliance.
              </p>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/shop"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Browse Sourcing Catalog
            </Link>
            <Link
              href="/contact"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Request Sourcing Call
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Browse by Appliance Category (White background) */}
      <section className="border-b border-zinc-200 bg-white min-h-[100dvh] flex flex-col justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
                Curated Collections
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
                Browse by Appliance Category
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold tracking-widest uppercase text-zinc-800 hover:text-zinc-600 transition-colors border-b border-zinc-900 pb-1"
            >
              View Full Collection →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/shop?category=Built-in Hob"
              className="border border-zinc-200 relative overflow-hidden h-[320px] flex flex-col justify-end p-6 group"
              style={{ borderRadius: "0px" }}
            >
              <div className="absolute inset-0 bg-zinc-950/45 z-10 transition-colors group-hover:bg-zinc-950/30" />
              <img
                src="/bosch_pcr9a5b90m.png"
                alt="Built-in Hobs"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-20 space-y-2">
                <h3 className="font-serif text-xl font-bold text-white">Built-in Hobs</h3>
                <span className="text-[10px] tracking-widest font-bold text-zinc-200 uppercase border-b border-white pb-0.5 group-hover:border-zinc-300 transition-colors inline-block">
                  Browse Hob Range →
                </span>
              </div>
            </Link>

            <Link
              href="/shop?category=Cooker"
              className="border border-zinc-200 relative overflow-hidden h-[320px] flex flex-col justify-end p-6 group"
              style={{ borderRadius: "0px" }}
            >
              <div className="absolute inset-0 bg-zinc-950/45 z-10 transition-colors group-hover:bg-zinc-950/30" />
              <img
                src="/smeg_ssa91max2.png"
                alt="Professional Cookers"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-20 space-y-2">
                <h3 className="font-serif text-xl font-bold text-white">Professional Cookers</h3>
                <span className="text-[10px] tracking-widest font-bold text-zinc-200 uppercase border-b border-white pb-0.5 group-hover:border-zinc-300 transition-colors inline-block">
                  Browse Cooker Range →
                </span>
              </div>
            </Link>

            <Link
              href="/shop?category=Oven"
              className="border border-zinc-200 relative overflow-hidden h-[320px] flex flex-col justify-end p-6 group"
              style={{ borderRadius: "0px" }}
            >
              <div className="absolute inset-0 bg-zinc-950/45 z-10 transition-colors group-hover:bg-zinc-950/30" />
              <img
                src="/bosch_oven.png"
                alt="Built-in Ovens"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-20 space-y-2">
                <h3 className="font-serif text-xl font-bold text-white">Built-in Ovens</h3>
                <span className="text-[10px] tracking-widest font-bold text-zinc-200 uppercase border-b border-white pb-0.5 group-hover:border-zinc-300 transition-colors inline-block">
                  Browse Oven Range →
                </span>
              </div>
            </Link>

            <Link
              href="/shop?category=Hood"
              className="border border-zinc-200 relative overflow-hidden h-[320px] flex flex-col justify-end p-6 group"
              style={{ borderRadius: "0px" }}
            >
              <div className="absolute inset-0 bg-zinc-950/45 z-10 transition-colors group-hover:bg-zinc-950/30" />
              <img
                src="/elica_cloud_seven.png"
                alt="Extraction Hoods"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-20 space-y-2">
                <h3 className="font-serif text-xl font-bold text-white">Extraction Hoods</h3>
                <span className="text-[10px] tracking-widest font-bold text-zinc-200 uppercase border-b border-white pb-0.5 group-hover:border-zinc-300 transition-colors inline-block">
                  Browse Hood Range →
                </span>
              </div>
            </Link>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/shop"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Shop All Categories
            </Link>
            <Link
              href="/contact"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Custom Specifications
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Depot Logistics Network (Cream background) */}
      <section className="border-b border-zinc-200 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
              Supply Infrastructure
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
              Regional Depot Logistics
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
              We coordinate transit directly from primary importer trade yards to guarantee authentic, brand-new stock dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">Deira Trade Gate</span>
              <h3 className="font-serif text-lg font-bold text-zinc-900">Naif Depot</h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                Direct clearance channels for European built-in gas hobs, electrical ovens, and high-power hoods. Handles quick-dispatch requests for city apartments.
              </p>
            </div>

            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">Industrial Core</span>
              <h3 className="font-serif text-lg font-bold text-zinc-900">Sharjah Industrial Yard</h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                Central storage hub for heavy-duty cooking ranges, gas regulators, and large-capacity stove components. Handles bulk logistics for villa developments.
              </p>
            </div>

            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">Fulfillment Gate</span>
              <h3 className="font-serif text-lg font-bold text-zinc-900">Dragon Mart Gate</h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                Secondary warehousing partner hub facilitating immediate collection of installation hardware, electrical cables, and gas copper piping.
              </p>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contact"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Verify Depot Stock
            </Link>
            <Link
              href="/services"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              View Dispatch Timelines
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: The Procurement Process (White background) */}
      <section className="border-b border-zinc-200 bg-white min-h-[100dvh] flex flex-col justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
              How We Work
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
              The Procurement Process
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
              <strong className="font-bold text-zinc-800">Our structured coordination</strong> ensures seamless delivery and installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">1</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Inquiry</h4>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-500">
                Submit model specifications. We verify distributor availability and dimensions.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">2</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Invoice</h4>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-500">
                Review your quotation. Confirm your order with a secure bank or card advance.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">3</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Collection</h4>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-500">
                We collect the factory-sealed appliance directly from distributor depots.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">4</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Installation</h4>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-500">
                We coordinate transport and schedule DAKEEK engineers to perform safety connections.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-355 text-xl font-bold">5</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Handover</h4>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-500">
                We verify pressure settings, issue compliance certificates, and hand over the warranty.
              </p>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contact"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Start Procurement Inquiry
            </Link>
            <Link
              href="/services"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Explore Custom Services
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Featured Models Showcase (Cream background) */}
      <section className="border-b border-zinc-200 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
              Premium Stock Highlights
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
              Featured Luxury Models
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
              Carefully sourced best-sellers representing the pinnacle of European cooking craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Model 1 */}
            <div className="border border-zinc-200 bg-white flex flex-col" style={{ borderRadius: "0px" }}>
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-50 border-b border-zinc-150 p-4 flex items-center justify-center">
                <img
                  src="/smeg_ssa91max2.png"
                  alt="Smeg Cooker"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Smeg • Range Cooker</span>
                  <h3 className="font-serif text-lg font-bold text-zinc-900">SSA91MAX2 90cm Cooker</h3>
                  <ul className="space-y-1.5 text-xs text-zinc-500 font-semibold pt-2">
                    <li className="flex justify-between border-b border-zinc-100 pb-1">
                      <span>Fuel Type</span>
                      <span className="text-zinc-800">Gas (LPG/NG Ready)</span>
                    </li>
                    <li className="flex justify-between border-b border-zinc-100 pb-1">
                      <span>Cavity Volume</span>
                      <span className="text-zinc-800">115 Liters</span>
                    </li>
                    <li className="flex justify-between border-b border-zinc-100 pb-1">
                      <span>Origin</span>
                      <span className="text-zinc-800">Italy</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 flex items-baseline justify-between border-t border-zinc-100">
                  <span className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Sourcing Price</span>
                  <span className="text-sm font-bold text-zinc-900 font-mono">AED 3,850</span>
                </div>
              </div>
            </div>

            {/* Model 2 */}
            <div className="border border-zinc-200 bg-white flex flex-col" style={{ borderRadius: "0px" }}>
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-50 border-b border-zinc-150 p-4 flex items-center justify-center">
                <img
                  src="/bosch_pcr9a5b90m.png"
                  alt="Bosch Hob"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Bosch • Built-in Hob</span>
                  <h3 className="font-serif text-lg font-bold text-zinc-900">PCR9A5B90M 90cm Gas Hob</h3>
                  <ul className="space-y-1.5 text-xs text-zinc-500 font-semibold pt-2">
                    <li className="flex justify-between border-b border-zinc-100 pb-1">
                      <span>Burners</span>
                      <span className="text-zinc-800">5 Gas Burners</span>
                    </li>
                    <li className="flex justify-between border-b border-zinc-100 pb-1">
                      <span>FlameSelect</span>
                      <span className="text-zinc-800">9 Power Levels</span>
                    </li>
                    <li className="flex justify-between border-b border-zinc-100 pb-1">
                      <span>Origin</span>
                      <span className="text-zinc-800">Spain</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 flex items-baseline justify-between border-t border-zinc-100">
                  <span className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Sourcing Price</span>
                  <span className="text-sm font-bold text-zinc-900 font-mono">AED 2,450</span>
                </div>
              </div>
            </div>

            {/* Model 3 */}
            <div className="border border-zinc-200 bg-white flex flex-col" style={{ borderRadius: "0px" }}>
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-50 border-b border-zinc-150 p-4 flex items-center justify-center">
                <img
                  src="/elica_cloud_seven.png"
                  alt="Elica Hood"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">Elica • Ceiling Hood</span>
                  <h3 className="font-serif text-lg font-bold text-zinc-900">Cloud Seven Extraction</h3>
                  <ul className="space-y-1.5 text-xs text-zinc-500 font-semibold pt-2">
                    <li className="flex justify-between border-b border-zinc-100 pb-1">
                      <span>Suction Power</span>
                      <span className="text-zinc-800">750 m³/h</span>
                    </li>
                    <li className="flex justify-between border-b border-zinc-100 pb-1">
                      <span>Control</span>
                      <span className="text-zinc-800">Remote Included</span>
                    </li>
                    <li className="flex justify-between border-b border-zinc-100 pb-1">
                      <span>Origin</span>
                      <span className="text-zinc-800">Poland</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 flex items-baseline justify-between border-t border-zinc-100">
                  <span className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Sourcing Price</span>
                  <span className="text-sm font-bold text-zinc-900 font-mono">AED 3,150</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/shop"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Explore Full Catalog
            </Link>
            <Link
              href="/contact"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Request Custom Sourcing
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: DAKEEK Safety Connections (White background) */}
      <section className="border-b border-zinc-200 bg-white min-h-[100dvh] flex flex-col justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Specifications Column (Left) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                Engineering Partnership
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900 leading-tight">
                Partnered with DAKEEK Safety Integration
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-zinc-650 font-sans">
                To meet Dubai Civil Defense guidelines, high-power cookers and gas connections require professional calibration. DAKEEK Technical Services validates every line pressure and electrical load capacity before certification.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">LPG / NG Valve Safety</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    Calibration of regulator valves to match the building's central LPG manifold or domestic natural gas lines.
                  </p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">High-Amperage Insulation</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    Dedicated electrical loop isolation for induction cookers and multifunction pyrolytic ovens to prevent short-circuits.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4 max-w-md">
                <Link
                  href="/services"
                  className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
                >
                  Explore Installation Tiers
                </Link>
                <Link
                  href="/contact"
                  className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
                >
                  Schedule Dispatch Desk
                </Link>
              </div>
            </div>

            {/* Schematic Image Column (Right) */}
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6]">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200">
                <Image
                  src="/bosch_pcr9a5b90m.png"
                  alt="DAKEEK Calibration Schematic"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Community Sourcing Coverage (Cream background) */}
      <section className="border-b border-zinc-200 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
              Distribution Scope
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
              Dubai Community Coverage
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
              Providing order-based delivery and DAKEEK installation coordination across Dubai’s premium neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Palm Jumeirah</h4>
              <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                Villa gas connections, cooker calibration, and maintenance schedules. Daily morning dispatch.
              </p>
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold pt-2">Transit: 24 Hours</p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Downtown Dubai</h4>
              <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                Built-in induction hobs and high-capacity electrical oven isolation. Daily afternoon dispatch.
              </p>
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold pt-2">Transit: 24 Hours</p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Emirates Hills</h4>
              <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                Large-scale culinary range cookers, manifolds, and dual cylinder regulator fittings. Bi-weekly slots.
              </p>
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold pt-2">Transit: 48 Hours</p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Dubai Marina</h4>
              <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                Smart extractor hoods, duct routing adjustments, and high-power built-in hobs. Daily dispatch.
              </p>
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold pt-2">Transit: 24 Hours</p>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contact"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Verify Sourcing Coordinates
            </Link>
            <Link
              href="/shop"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Browse Active Stock
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Sourcing & Compliance FAQs (White background) */}
      <section className="py-20 bg-white min-h-[100dvh] flex flex-col justify-center border-b border-zinc-200">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* FAQs Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                  Owner's Guide
                </span>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900 leading-tight">
                  Sourcing &amp; Compliance FAQs
                </h2>
                <p className="text-base leading-relaxed text-zinc-500">
                  <strong className="font-bold text-zinc-800">Sourcing guidelines</strong> regarding direct importer procurement, safety sign-offs, and compliance protocols.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-zinc-200 bg-white hover:border-zinc-950 transition-all duration-300"
                      style={{ borderRadius: "0px" }}
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer group"
                      >
                        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest group-hover:text-zinc-950 transition-colors">
                          {faq.q}
                        </h4>
                        <span className={`text-base font-mono text-zinc-400 transition-transform duration-300 transform ${isOpen ? "rotate-45 text-zinc-950" : ""}`}>
                          +
                        </span>
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[200px] border-t border-zinc-100" : "max-h-0"}`}>
                        <p className="p-6 text-xs md:text-sm leading-relaxed text-zinc-650 font-medium bg-zinc-50/50">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4 max-w-md">
                <Link
                  href="/contact"
                  className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
                >
                  Contact Support Desk
                </Link>
                <Link
                  href="/services"
                  className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
                >
                  View Connection Details
                </Link>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6]">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200">
                <Image
                  src="/bosch_oven.png"
                  alt="Premium Built-in Oven Sourcing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Final Callback Sourcing Form (Cream background) */}
      <section className="py-20 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-zinc-200 p-6 md:p-10">
            {/* Image Column */}
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6] flex flex-col justify-center">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200 h-full w-full min-h-[300px]">
                <Image
                  src="/commercial_stove.png"
                  alt="Inquire Sourcing Specifications"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#FAF9F6] border border-zinc-200 p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl text-zinc-900 font-bold">Request Sourcing Callback</h3>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-650 font-semibold">
                  Submit your custom appliance requirements, kitchen layout dimensions, or DAKEEK engineering details. Our dispatch desk will call you back within 2 hours.
                </p>
                <div className="flex items-center space-x-3 text-xs font-bold text-zinc-800">
                  <span>Customer Support:</span>
                  <span className="text-zinc-500 font-mono">+971 4 123 4567</span>
                </div>
              </div>

              {formSubmitted ? (
                <div className="p-8 text-center bg-white border border-zinc-200 space-y-4">
                  <span className="text-zinc-600 font-bold block text-sm uppercase tracking-wider">✓ Inquiry Successfully Recorded</span>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-500 font-medium">
                    Your sourcing specification has been logged. Jaydeek S. or a support coordinator will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 bg-white border border-zinc-200 p-6">
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
                    <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Sourcing Details / Model Number</label>
                    <textarea
                      rows={3}
                      value={specs}
                      onChange={(e) => setSpecs(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                      style={{ borderRadius: "0px" }}
                      placeholder="e.g. Smeg range cooker SSA91MAX2 connection type, dimensions..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full matte-button-solid py-3 text-xs font-bold uppercase tracking-widest"
                  >
                    Submit Sourcing Ticket
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
