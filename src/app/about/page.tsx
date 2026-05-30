import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero Section (White background) - Image LEFT, Text RIGHT */}
      <section className="hero-fullscreen relative border-b border-zinc-200 bg-white grid grid-cols-1 lg:grid-cols-2 items-stretch overflow-hidden">
        {/* Image Column - Left on Desktop, First on Mobile */}
        <div className="order-1 lg:order-1 relative min-h-[260px] lg:h-full bg-zinc-200">
          <Image
            src="/bertazzoni_heritage.png"
            alt="Bertazzoni Heritage Cooker Sourcing"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Text Column - Right on Desktop, Second on Mobile */}
        <div className="order-2 lg:order-2 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-10 lg:py-24 space-y-4 lg:space-y-6">
          <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
            NOVA Cookers &amp; Cookstove Trading
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-zinc-900">
            Order-Based Sourcing.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-zinc-650 font-sans max-w-xl">
            Direct partnerships with premium distributors across Sharjah and Dubai. Order-based sourcing prevents inventory overheads and ensures factory-sealed quality.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 max-w-lg">
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
              Contact Sourcing Desk
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Sourcing Coordinates (Cream background) - No image */}
      <section className="border-b border-zinc-200 py-20 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                Supply Network
              </span>
              <h2 className="font-serif text-3xl tracking-tight text-zinc-900">
                Direct Distribution Channels
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-zinc-500 font-semibold">
                <strong className="font-bold text-zinc-800">Our trade network coordinates directly</strong> with primary importer depots to secure inventory priority.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-zinc-250 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Deira Hub</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-550 font-semibold">
                  Direct clearance channels for European built-in gas hobs, electrical ovens, and smart extraction hoods.
                </p>
              </div>

              <div className="border border-zinc-250 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Sharjah Industrial</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-550 font-semibold">
                  Central logistics yard for heavy-duty cooking ranges, commercial stoves, and specialized burners.
                </p>
              </div>

              <div className="border border-zinc-250 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Dragon Mart Gate</h4>
                <p className="text-xs md:text-sm leading-relaxed text-zinc-550 font-semibold">
                  Immediate sourcing partner desks for high-volume culinary hardware accessories.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contact"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Schedule Depot Sourcing
            </Link>
            <Link
              href="/shop"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Read Sourcing Guides
            </Link>
          </div>
        </div>
      </section>      {/* Section 3: Technical Alliance (White background) - Text LEFT, Image RIGHT */}
      <section className="border-b border-zinc-200 py-20 bg-white min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                Technical Alliance
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900 leading-tight">
                Partnered with DAKEEK Technical Services
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-zinc-650 font-sans">
                <strong className="font-bold text-zinc-900">Certified technical connection is vital.</strong> We partner exclusively with DAKEEK Technical Services Co. LLC to provide UAE Civil Defense compliant gas regulator fittings, pressure leak verification, and high-power electric stove line routing.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 max-w-md">
                <Link href="/services" className="matte-button-solid px-6 py-4 text-xs font-bold uppercase tracking-wider text-center flex-1">
                  Explore Connection Services
                </Link>
                <Link href="/services" className="matte-button px-6 py-4 text-xs font-bold uppercase tracking-wider text-center flex-1">
                  Submit Installation Inquiry
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6]">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200">
                <Image
                  src="/bosch_pcr9a5b90m.png"
                  alt="DAKEEK Safety Connections"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: GCC Growth Milestone Timeline (Cream background) - No image */}
      <section className="border-b border-zinc-200 py-20 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
              Our Vision
            </span>
            <h2 className="font-serif text-3xl tracking-tight text-zinc-900">
              Long-Term Growth Roadmap
            </h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
              <strong className="font-bold text-zinc-800">Our scaling roadmap</strong> for the order-based luxury appliance procurement ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-serif text-zinc-800 text-lg font-bold">Year 1</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Market Entry</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                Consolidate distributor networks and build the certified DAKEEK engineering pipeline.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-serif text-zinc-800 text-lg font-bold">Year 3</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">AMC Operations</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                Expand residential client base and scale Annual Maintenance Contracts (AMC) in luxury communities.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-serif text-zinc-800 text-lg font-bold">Year 5</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Dedicated Hub</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                Establish a dedicated corporate fulfillment center and logistics yard in Dubai.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-serif text-zinc-800 text-lg font-bold">Year 10</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">Regional Scaling</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                Introduce direct importer channels in Saudi Arabia, Qatar, and Bahrain.
              </p>
            </div>

            <div className="border border-zinc-250 p-6 bg-white space-y-3" style={{ borderRadius: "0px" }}>
              <span className="font-serif text-zinc-800 text-lg font-bold">Year 20</span>
              <h4 className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">GCC Ecosystem</h4>
              <p className="text-xs leading-relaxed text-zinc-500 font-semibold">
                Operate as the premier online importer and maintenance partner for premium cooking hardware.
              </p>
            </div>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contact"
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Partner With Us
            </Link>
            <Link
              href="/shop"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Browse Active Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Legal & Compliance (White background) - Image LEFT, Text RIGHT */}
      <section className="py-20 bg-white min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Column first */}
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6]">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200">
                <Image
                  src="/commercial_stove.png"
                  alt="ESMA Regulatory Standards"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text & Compliance Column second */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                  Compliance
                </span>
                <h2 className="font-serif text-3xl tracking-tight text-zinc-900 leading-tight">
                  Regulatory Sign-Off Standards
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-zinc-500 font-semibold">
                  <strong className="font-bold text-zinc-800">Our business structure conforms fully</strong> to Dubai Mainland DED corporate guidelines and FTA regulations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Dubai Mainland DED</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    Fully licensed and registered under Dubai Mainland authorities, guaranteeing transaction compliance.
                  </p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">5% VAT FTA Compliance</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    Complete tax reporting. Sourcing invoices include the standard UAE 5% VAT.
                  </p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">ESMA Safe Certification</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    We import and procure cooking hardware that complies strictly with regional ESMA standards.
                  </p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Custom Declarations</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-600 font-medium">
                    Imports clear Dubai Customs with official safety inspections and customs duty settlements.
                  </p>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4 max-w-md">
                <Link
                  href="/contact"
                  className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
                >
                  Verify Sourcing Credentials
                </Link>
                <Link
                  href="/services"
                  className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
                >
                  Check VAT Guidelines
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
