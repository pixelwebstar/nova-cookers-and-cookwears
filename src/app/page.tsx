import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Editorial Hero Section (White background) - Clean, uniform layout */}
      <section className="hero-fullscreen relative border-b border-zinc-200 bg-white grid grid-cols-1 lg:grid-cols-2 items-stretch overflow-hidden">
        {/* Text Column - Left on Desktop, Second on Mobile */}
        <div className="order-2 lg:order-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-10 lg:py-24 space-y-4 lg:space-y-6">
          <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
            NOVA Cookers &amp; Cookstove Trading
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-zinc-900">
            Premium Kitchen Appliances.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-zinc-650 font-sans max-w-xl">
            Order-based sourcing for premium kitchen appliances in the UAE. Professionally installed and maintained by DAKEEK Technical Services.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 max-w-lg">
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

        {/* Image Column - Right on Desktop, First on Mobile */}
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

      {/* Section 2: Brand Moat & Value Proposition (Cream background) - Uniform spacing */}
      <section className="border-b border-zinc-200 bg-[#FAF9F6] min-h-[70vh] flex flex-col justify-center py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
              Our Sourcing Advantages
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
              <strong className="font-bold text-zinc-800">Why developers and private buyers partner with NOVA</strong> instead of standard retail outlets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-300 text-3xl font-light">01</span>
              <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                Direct Importer Pipeline
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                <strong className="font-bold text-zinc-800">We bypass retail intermediaries</strong> to source specialized luxury models directly from importer warehouses in Naif and Sharjah upon order confirmation.
              </p>
            </div>

            <div className="border border-zinc-200 p-8 bg-white space-y-4" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-300 text-3xl font-light">02</span>
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

      {/* Section 3: Category Grid Section (White background) - Visual category cards */}
      <section className="border-b border-zinc-200 bg-white min-h-[70vh] flex flex-col justify-center py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
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
        </div>
      </section>

      {/* Section 4: The DAKEEK Customer Journey Process (Cream background) - Uniform spacing */}
      <section className="border-b border-zinc-200 bg-[#FAF9F6] min-h-[70vh] flex flex-col justify-center py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
              The Procurement Process
            </h2>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
              <strong className="font-bold text-zinc-800">Our structured coordination</strong> ensures seamless delivery and installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">1</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Inquiry</h4>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-500">
                Submit model specifications. We verify distributor availability and dimensions.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">2</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Invoice</h4>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-500">
                Review your quotation. Confirm your order with a secure bank or card advance.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">3</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Collection</h4>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-500">
                We collect the factory-sealed appliance directly from distributor depots.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-mono text-zinc-350 text-xl font-bold">4</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Installation</h4>
              <p className="text-xs md:text-sm leading-relaxed text-zinc-500">
                We coordinate transport and schedule DAKEEK engineers to perform safety connections.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
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

      {/* Section 5: Sourcing & Compliance FAQs (White background) - Text on LEFT, Image on RIGHT */}
      <section className="py-20 bg-white min-h-[70vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
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
                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">What is the delivery timeline?</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    Standard collections from primary distributor depots are completed and delivered within <strong className="font-bold text-zinc-900">24 to 48 hours</strong> from payment clearance.
                  </p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Why is DAKEEK certification mandatory?</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    All high-power electric cookers and gas connections require a <strong className="font-bold text-zinc-900">certified technical connection</strong> to satisfy Dubai Civil Defense safety regulations.
                  </p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Are products fully warrantied?</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-650 font-medium">
                    Yes. Every procured appliance is brand new, factory-sealed, and carries a <strong className="font-bold text-zinc-900">one-year manufacturer warranty</strong> supported by official regional service centers.
                  </p>
                </div>
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
    </div>
  );
}
