"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { saveInquiry, Product } from "@/lib/db";
import { addToCart } from "@/lib/cart";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specs, setSpecs] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  const featuredModels: Product[] = [
    {
      id: "prod-002",
      brand: "Smeg",
      category: "Cooker",
      name: "Smeg SSA91MAX2 Opera Range Cooker — Dual Fuel",
      image: "/smeg_ssa91max2.png",
      retailPrice: 12499,
      estimatedCost: 8200,
      specs: { "Width": "90 cm", "Fuel Type": "Dual Fuel", "Oven Capacity": "115 L", "Burners": "6 Gas", "Energy Class": "A" },
      description: "Italian-designed 90cm dual fuel range cooker with 6 gas burners, multifunction electric oven (115L capacity), and telescopic sliding shelves. Stainless steel finish with Vapor Clean technology.",
      supplierName: "Smeg Middle East — Sharjah Industrial"
    },
    {
      id: "prod-001",
      brand: "Bosch",
      category: "Built-in Hob",
      name: "Bosch PCR9A5B90M Gas Hob — 5 Burner FlameSelect",
      image: "/bosch_pcr9a5b90m.png",
      retailPrice: 3299,
      estimatedCost: 2100,
      specs: { "Burners": "5 (incl. wok)", "Width": "90 cm", "Surface": "Tempered Glass", "Ignition": "Automatic", "Gas Type": "LPG / Natural Gas" },
      description: "Five-burner gas hob with FlameSelect stepless flame control, cast iron pan supports, and automatic re-ignition. Tempered glass surface in black. Built for countertop integration with standard 90cm cutout.",
      supplierName: "Bosch UAE — Deira Trade Gate"
    },
    {
      id: "prod-005",
      brand: "Elica",
      category: "Hood",
      name: "Elica Cloud Seven Ceiling-Mounted Hood",
      image: "/elica_cloud_seven.png",
      retailPrice: 6800,
      estimatedCost: 4200,
      specs: { "Type": "Ceiling Mount", "Width": "90 cm", "Extraction": "770 m³/h", "Noise Level": "49 dB", "Lighting": "LED" },
      description: "Award-winning ceiling-mounted extraction hood with perimetral aspiration, LED ambient lighting, and whisper-quiet motor. Designed by Fabrizio Crisà. 90cm width with 770 m³/h extraction rate.",
      supplierName: "Elica Gulf Dist. — Sharjah Industrial"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentModelIndex((prev) => (prev + 1) % featuredModels.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentModelIndex((prev) => (prev + 1) % featuredModels.length);
  };

  const prevSlide = () => {
    setCurrentModelIndex((prev) => (prev - 1 + featuredModels.length) % featuredModels.length);
  };

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
            Save on Premium Kitchen Appliances.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-zinc-650 font-sans max-w-xl">
            Direct wholesale sourcing for high-quality cookers, hobs, and ovens in the UAE. Save up to 35% on showroom markups with direct depot collection and DAKEEK safety installations.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            <Link
              href="/shop"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Browse Wholesale Catalog
            </Link>
            <Link
              href="/services"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              DAKEEK Installation Rates
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

      {/* Section 2: Direct Sourcing Values (Cream background) - Optimized Z-Pattern Layout */}
      <section className="border-b border-zinc-200 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* 1. Top-Left: Main Heading & Value Focus */}
          <div className="flex flex-col justify-center space-y-4 lg:space-y-6">
            <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
              Value Focus
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-zinc-900">
              Why Procure Through NOVA?
            </h2>
            <p className="text-base md:text-lg text-zinc-650 leading-relaxed max-w-xl">
              We connect home buyers and project developers directly with primary importer networks, <strong className="font-bold text-zinc-800">bypassing expensive retail showroom markups</strong> to optimize your kitchen costs.
            </p>
          </div>

          {/* 2. Top-Right: Supporting Visual Asset (Image) */}
          <div className="relative border border-zinc-200 p-2 bg-white flex flex-col justify-center min-h-[300px]">
            <div className="aspect-[16/10] relative overflow-hidden bg-zinc-150 w-full h-full">
              <Image
                src="/premium_hybrid_skillet.png"
                alt="Direct Importer Pipeline Products"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* 3. Bottom-Left: Supporting Specifications (LESS visual weight) */}
          <div className="flex flex-col justify-center space-y-6 pt-4">
            <span className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">
              Sourcing Benefits
            </span>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <span className="font-mono text-zinc-350 text-xl font-bold">01</span>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Save Showroom Commissions</h4>
                  <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mt-0.5">
                    Clearance channels from Naif and Sharjah depots <strong className="font-bold text-zinc-800">save you up to 35%</strong> on retail markups.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="font-mono text-zinc-350 text-xl font-bold">02</span>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Guaranteed High Quality</h4>
                  <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mt-0.5">
                    Procure <strong className="font-bold text-zinc-800">100% brand-new, factory-sealed</strong> appliances with official manufacturer warranty.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="font-mono text-zinc-350 text-xl font-bold">03</span>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Certified DAKEEK Connection</h4>
                  <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mt-0.5">
                    Full safety integration with <strong className="font-bold text-zinc-800">gas leak pressure testing</strong> and electrical loop calibration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Bottom-Right: Primary Sourcing Call-To-Action (CTAs) with optimized button sizes */}
          <div className="flex flex-col justify-center items-center lg:items-end pt-4 space-y-6">
            <span className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase hidden lg:block">
              Immediate Sourcing Desk
            </span>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Link
                href="/shop"
                className="matte-button-solid px-6 py-3 text-xs font-bold uppercase tracking-widest text-center flex-1"
              >
                Browse Wholesale Catalog
              </Link>
              <Link
                href="/contact"
                className="matte-button px-6 py-3 text-xs font-bold uppercase tracking-widest text-center flex-1"
              >
                Request Wholesale Quote
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: Advanced Category Showcase (White background) */}
      <section className="border-b border-zinc-200 bg-white min-h-[100dvh] flex flex-col justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
                Product Collections
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
                Browse by Appliance Category
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold tracking-widest uppercase text-zinc-800 hover:text-zinc-650 transition-colors border-b border-zinc-900 pb-1"
            >
              View Full Collection →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/shop?category=Built-in Hob"
              className="border border-zinc-200 relative overflow-hidden h-[400px] flex flex-col justify-end p-6 group transition-all duration-300 hover:border-zinc-800"
              style={{ borderRadius: "0px" }}
            >
              <div className="absolute inset-0 bg-zinc-950/50 z-10 transition-colors group-hover:bg-zinc-950/35" />
              <img
                src="/bosch_pcr9a5b90m.png"
                alt="Built-in Hobs"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="relative z-20 space-y-3">
                <span className="text-[8px] tracking-[0.25em] font-bold text-zinc-200 uppercase">Gas &amp; Induction</span>
                <h3 className="font-serif text-2xl font-bold text-white">Built-in Hobs</h3>
                <p className="text-[11px] text-zinc-300 font-medium leading-relaxed max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  5-burner gas manifolds and smart touch electric induction hobs sourced directly.
                </p>
                <span className="text-[10px] tracking-widest font-bold text-zinc-100 uppercase border-b border-white pb-0.5 group-hover:text-white transition-colors inline-block">
                  Browse Hobs →
                </span>
              </div>
            </Link>

            <Link
              href="/shop?category=Cooker"
              className="border border-zinc-200 relative overflow-hidden h-[400px] flex flex-col justify-end p-6 group transition-all duration-300 hover:border-zinc-800"
              style={{ borderRadius: "0px" }}
            >
              <div className="absolute inset-0 bg-zinc-950/50 z-10 transition-colors group-hover:bg-zinc-950/35" />
              <img
                src="/smeg_ssa91max2.png"
                alt="Professional Cookers"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="relative z-20 space-y-3">
                <span className="text-[8px] tracking-[0.25em] font-bold text-zinc-200 uppercase">Free-standing Ranges</span>
                <h3 className="font-serif text-2xl font-bold text-white">Culinary Ranges</h3>
                <p className="text-[11px] text-zinc-300 font-medium leading-relaxed max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  Professional multi-cavity gas ovens and electrical convection cooking ranges.
                </p>
                <span className="text-[10px] tracking-widest font-bold text-zinc-100 uppercase border-b border-white pb-0.5 group-hover:text-white transition-colors inline-block">
                  Browse Cookers →
                </span>
              </div>
            </Link>

            <Link
              href="/shop?category=Oven"
              className="border border-zinc-200 relative overflow-hidden h-[400px] flex flex-col justify-end p-6 group transition-all duration-300 hover:border-zinc-800"
              style={{ borderRadius: "0px" }}
            >
              <div className="absolute inset-0 bg-zinc-950/50 z-10 transition-colors group-hover:bg-zinc-950/35" />
              <img
                src="/bosch_oven.png"
                alt="Built-in Ovens"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="relative z-20 space-y-3">
                <span className="text-[8px] tracking-[0.25em] font-bold text-zinc-200 uppercase">Built-in Steam &amp; Heat</span>
                <h3 className="font-serif text-2xl font-bold text-white">Built-in Ovens</h3>
                <p className="text-[11px] text-zinc-300 font-medium leading-relaxed max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  Energy-efficient built-in ovens, grills, and integrated microwave cavities.
                </p>
                <span className="text-[10px] tracking-widest font-bold text-zinc-100 uppercase border-b border-white pb-0.5 group-hover:text-white transition-colors inline-block">
                  Browse Ovens →
                </span>
              </div>
            </Link>

            <Link
              href="/shop?category=Hood"
              className="border border-zinc-200 relative overflow-hidden h-[400px] flex flex-col justify-end p-6 group transition-all duration-300 hover:border-zinc-800"
              style={{ borderRadius: "0px" }}
            >
              <div className="absolute inset-0 bg-zinc-950/50 z-10 transition-colors group-hover:bg-zinc-950/35" />
              <img
                src="/elica_cloud_seven.png"
                alt="Extraction Hoods"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="relative z-20 space-y-3">
                <span className="text-[8px] tracking-[0.25em] font-bold text-zinc-200 uppercase">Canopy &amp; Smart Extraction</span>
                <h3 className="font-serif text-2xl font-bold text-white">Extraction Hoods</h3>
                <p className="text-[11px] text-zinc-300 font-medium leading-relaxed max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  Smart ceiling-mount filters and island cooker hoods with high-suction motors.
                </p>
                <span className="text-[10px] tracking-widest font-bold text-zinc-100 uppercase border-b border-white pb-0.5 group-hover:text-white transition-colors inline-block">
                  Browse Hoods →
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
              Custom Sourcing Request
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
              <p className="text-sm leading-relaxed text-zinc-500 font-semibold">
                Clearance channels from Naif and Sharjah depots <strong className="font-bold text-zinc-800">bypass intermediaries</strong> to secure high-power European ovens and hobs directly.
              </p>
            </div>

            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">Industrial Core</span>
              <h3 className="font-serif text-lg font-bold text-zinc-900">Sharjah Industrial Yard</h3>
              <p className="text-sm leading-relaxed text-zinc-500 font-semibold">
                Central storage hub for heavy-duty cooking ranges, gas regulators, and large-capacity stove components. <strong className="font-bold text-zinc-800">Manages high-volume transit</strong> for villa developments.
              </p>
            </div>

            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase">Fulfillment Gate</span>
              <h3 className="font-serif text-lg font-bold text-zinc-900">Dragon Mart Gate</h3>
              <p className="text-sm leading-relaxed text-zinc-500 font-semibold">
                Secondary warehousing partner hub facilitating <strong className="font-bold text-zinc-800">immediate collection</strong> of installation hardware, electrical cables, and gas copper piping.
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

      {/* Section 5: Bulk Sourcing & Wholesale Savings (White background) */}
      <section className="border-b border-zinc-200 bg-white min-h-[100dvh] flex flex-col justify-center py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
              Financial Benefits
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
              Bulk Sourcing &amp; Wholesale Savings
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed font-semibold">
              Highlighting major procurement benefits for residential developers and bulk retail clients looking to <strong className="font-bold text-zinc-800">maximize savings</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3 flex flex-col justify-between" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">01</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Bulk Discount</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                Special commercial volume discounts for <strong className="font-bold text-zinc-800">multi-unit developers</strong> and contractors.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3 flex flex-col justify-between" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">02</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Wholesale Price</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                <strong className="font-bold text-zinc-800">Save up to 35%</strong> on high-street showroom price tags with order-based direct procurement.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3 flex flex-col justify-between" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">03</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">High Quality</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                Brand-new, factory-sealed appliances with <strong className="font-bold text-zinc-800">official manufacturer warranty</strong> terms.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3 flex flex-col justify-between" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">04</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Depot Dispatch</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                Swift dispatch directly from central logistics yards to <strong className="font-bold text-zinc-800">your building site</strong>.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3 flex flex-col justify-between" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-355 text-xl font-bold">05</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Turnkey Safety</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                Professional connections by certified DAKEEK engineers with <strong className="font-bold text-zinc-800">safety compliance</strong> sign-offs.
              </p>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contact"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Request Bulk Pricing
            </Link>
            <Link
              href="/services"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Explore Turnkey Hookups
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Popular Models Showcase - Autoplay Slideshow with tall visual cards */}
      <section className="border-b border-zinc-200 bg-white min-h-[100dvh] flex flex-col justify-center py-10 lg:py-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          {/* Header pushed to the top */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
              Sourced Stocks
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900 font-bold">
              Popular Models for All Budgets
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed font-semibold">
              Delivering high-quality kitchen solutions. We cater to both <strong className="font-bold text-zinc-800">budget-conscious apartments</strong> and <strong className="font-bold text-zinc-800">premium villa projects</strong>.
            </p>
          </div>

          {/* Interactive Slideshow Carousel */}
          <div className="relative border border-zinc-200 p-2 bg-[#FAF9F6] max-w-[1200px] mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-zinc-800 border border-zinc-200 hover:border-zinc-800 w-10 h-10 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              style={{ borderRadius: "0px" }}
              aria-label="Previous Slide"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-zinc-800 border border-zinc-200 hover:border-zinc-800 w-10 h-10 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              style={{ borderRadius: "0px" }}
              aria-label="Next Slide"
            >
              →
            </button>

            {/* Slider Content Card with Taller visual image wrapper */}
            <div className="bg-white border border-zinc-200 p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[520px]">
              {/* Product Image Column - Tall card container */}
              <div className="md:col-span-5 relative w-full h-[350px] lg:h-[450px] bg-zinc-50 p-4 border border-zinc-150 flex items-center justify-center overflow-hidden">
                <img
                  src={featuredModels[currentModelIndex].image}
                  alt={featuredModels[currentModelIndex].name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Product Specifications Column */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">
                      {featuredModels[currentModelIndex].brand} • {featuredModels[currentModelIndex].category}
                    </span>
                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-zinc-900 leading-tight">
                      {featuredModels[currentModelIndex].name}
                    </h3>
                  </div>

                  <p className="text-xs md:text-sm leading-relaxed text-zinc-655 font-semibold">
                    {featuredModels[currentModelIndex].description}
                  </p>

                  <div className="border-t border-zinc-100 pt-4">
                    <span className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block mb-2">Technical Specifications</span>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs md:text-sm font-semibold text-zinc-650">
                      {Object.entries(featuredModels[currentModelIndex].specs).map(([key, val], sIdx) => (
                        <li key={sIdx} className="flex justify-between border-b border-zinc-100 pb-1">
                          <span className="text-zinc-400">{key}</span>
                          <span className="text-zinc-800">{val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Wholesale Price</span>
                    <span className="text-xl font-bold text-zinc-900 font-mono">AED {featuredModels[currentModelIndex].retailPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        addToCart(featuredModels[currentModelIndex], false);
                        alert(`${featuredModels[currentModelIndex].name} added to cart!`);
                      }}
                      className="matte-button-solid px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-center flex-1 sm:flex-none cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <Link
                      href="/shop"
                      className="matte-button px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-center flex-1 sm:flex-none"
                    >
                      View Catalog
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Dots Indicators */}
            <div className="flex justify-center space-x-2 pt-4 pb-2">
              {featuredModels.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentModelIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-350 cursor-pointer ${
                    currentModelIndex === idx ? "bg-zinc-800 w-6" : "bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: DAKEEK Safety Connections (Cream background) */}
      <section className="border-b border-zinc-200 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center py-20">
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
              <p className="text-sm md:text-base leading-relaxed text-zinc-655 font-sans">
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

      {/* Section 8: Community Sourcing Coverage (White background) */}
      <section className="border-b border-zinc-200 bg-white min-h-[100dvh] flex flex-col justify-center py-20">
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
            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3" style={{ borderRadius: "0px" }}>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Palm Jumeirah</h4>
              <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                Villa gas connections, cooker calibration, and maintenance schedules. Daily morning dispatch.
              </p>
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold pt-2">Transit: 24 Hours</p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3" style={{ borderRadius: "0px" }}>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Downtown Dubai</h4>
              <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                Built-in induction hobs and high-capacity electrical oven isolation. Daily afternoon dispatch.
              </p>
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold pt-2">Transit: 24 Hours</p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3" style={{ borderRadius: "0px" }}>
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2">Emirates Hills</h4>
              <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                Large-scale culinary range cookers, manifolds, and dual cylinder regulator fittings. Bi-weekly slots.
              </p>
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold pt-2">Transit: 48 Hours</p>
            </div>

            <div className="border border-zinc-200 p-6 bg-[#FAF9F6] space-y-3" style={{ borderRadius: "0px" }}>
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

      {/* Section 9: Sourcing & Compliance FAQs (Cream background) */}
      <section className="py-20 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center border-b border-zinc-200">
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
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-white">
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

      {/* Section 10: Final Callback Sourcing Form (White background - contrasts with Cream Footer) */}
      <section className="py-20 bg-white min-h-[100dvh] flex flex-col justify-center">
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
                <p className="text-xs md:text-sm leading-relaxed text-zinc-655 font-semibold">
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
