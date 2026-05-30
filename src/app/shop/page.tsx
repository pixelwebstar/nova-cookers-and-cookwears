"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { getStoredProducts, Product } from "@/lib/db";
import { addToCart } from "@/lib/cart";

function ShopCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do you deliver outside Dubai?",
      a: "Yes. We coordinate transport across Abu Dhabi, Sharjah, Ajman, and Ras Al Khaimah."
    },
    {
      q: "Can I collect the appliance?",
      a: "Yes. You can coordinate physical collection directly from our partner warehouses in Sharjah."
    }
  ];

  // Sync with search params
  useEffect(() => {
    setProducts(getStoredProducts());
    
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
    
    const brand = searchParams.get("brand");
    if (brand) {
      setSelectedBrand(brand);
    }
  }, [searchParams]);

  // Categories & Brands list
  const categories = ["All", "Built-in Hob", "Cooker", "Oven", "Hood", "Commercial Burner"];
  const brands = ["All", "Bosch", "Miele", "Smeg", "Bertazzoni", "Elica", "LG", "NOVA Commercial"];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSearchQuery("");
    router.push("/shop");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Catalog Header / Hero (White background) - Text LEFT, Image RIGHT */}
      <section className="hero-fullscreen relative border-b border-zinc-200 bg-white grid grid-cols-1 lg:grid-cols-2 items-stretch overflow-hidden">
        {/* Text Column - Left on Desktop, Second on Mobile */}
        <div className="order-2 lg:order-1 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-20 py-10 lg:py-24 space-y-4 lg:space-y-6">
          <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
            Curated Sourcing
          </span>
          <h1 className="font-serif text-3xl md:text-5xl tracking-tight text-zinc-900 leading-tight">
            Appliance Catalog.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-zinc-650 font-sans max-w-xl">
            Order-based pricing strategy for premium imported kitchen appliances. Select your brand or category to view specifications.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 max-w-lg">
            <button
              onClick={() => {
                const element = document.getElementById("catalog-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1 cursor-pointer"
            >
              Browse Sourcing Catalog
            </button>
            <Link
              href="/contact"
              className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
            >
              Request Sourcing Call
            </Link>
          </div>
        </div>

        {/* Image Column - Right on Desktop, First on Mobile */}
        <div className="order-1 lg:order-2 relative min-h-[260px] lg:h-full bg-zinc-200">
          <Image
            src="/smeg_ssa91max2.png"
            alt="Storefront Sourcing Catalog"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Section 2: Main Catalog Search & Filter Layout (Cream background) */}
      <section id="catalog-section" className="border-b border-zinc-200 py-12 md:py-20 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 w-full">
          {/* Subheader / Status Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-zinc-200 mb-6 gap-2">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                {selectedCategory === "All" && selectedBrand === "All" ? "Full Collection" : `${selectedBrand !== "All" ? selectedBrand : ""} ${selectedCategory !== "All" ? selectedCategory : "Appliances"}`}
              </h3>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Showing {filteredProducts.length} of {products.length} models
              </p>
            </div>
            {(selectedCategory !== "All" || selectedBrand !== "All" || searchQuery !== "") && (
              <button 
                onClick={clearFilters}
                className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-zinc-650 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Mobile Filter Bar (only visible on mobile/tablet) */}
          <div className="lg:hidden w-full bg-white border border-zinc-200 p-4 mb-6 space-y-4" style={{ borderRadius: "0px" }}>
            {/* Search Input */}
            <div className="space-y-1">
              <span className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Search Models</span>
              <input
                type="text"
                placeholder="e.g. Bosch, Miele..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-zinc-900 focus:bg-white"
                style={{ borderRadius: "0px" }}
              />
            </div>

            {/* Category Filter Horizontal Scroll */}
            <div className="space-y-1">
              <span className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Category</span>
              <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      const params = new URLSearchParams(searchParams.toString());
                      if (cat === "All") params.delete("category");
                      else params.set("category", cat);
                      router.push(`/shop?${params.toString()}`);
                    }}
                    className={`px-3 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border transition-colors ${
                      selectedCategory === cat
                        ? "bg-zinc-900 text-zinc-50 border-zinc-900"
                        : "bg-white text-zinc-500 border-zinc-200 hover:text-zinc-900"
                    }`}
                    style={{ borderRadius: "0px" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter Horizontal Scroll */}
            <div className="space-y-1">
              <span className="text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Brand</span>
              <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setSelectedBrand(b);
                      const params = new URLSearchParams(searchParams.toString());
                      if (b === "All") params.delete("brand");
                      else params.set("brand", b);
                      router.push(`/shop?${params.toString()}`);
                    }}
                    className={`px-3 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border transition-colors ${
                      selectedBrand === b
                        ? "bg-zinc-900 text-zinc-50 border-zinc-900"
                        : "bg-white text-zinc-500 border-zinc-200 hover:text-zinc-900"
                    }`}
                    style={{ borderRadius: "0px" }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Desktop Filters Sidebar - Hidden on Mobile */}
            <aside className="hidden lg:block lg:col-span-3 space-y-8 border border-zinc-200 p-6 bg-white sticky top-28 self-start" style={{ borderRadius: "0px" }}>
              {/* Search */}
              <div className="space-y-3">
                <h4 className="text-[11px] tracking-[0.2em] font-bold text-zinc-900 uppercase">Search Models</h4>
                <input
                  type="text"
                  placeholder="e.g. Bosch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                  style={{ borderRadius: "0px" }}
                />
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h4 className="text-[11px] tracking-[0.2em] font-bold text-zinc-900 uppercase">Category</h4>
                <div className="flex flex-col space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        const params = new URLSearchParams(searchParams.toString());
                        if (cat === "All") params.delete("category");
                        else params.set("category", cat);
                        router.push(`/shop?${params.toString()}`);
                      }}
                      className={`text-left text-xs font-semibold py-1.5 px-2 tracking-wide uppercase transition-colors ${
                        selectedCategory === cat
                          ? "bg-zinc-900 text-zinc-50 font-bold"
                          : "text-zinc-500 hover:text-zinc-900"
                      }`}
                      style={{ borderRadius: "0px" }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-3">
                <h4 className="text-[11px] tracking-[0.2em] font-bold text-zinc-900 uppercase">Brand</h4>
                <div className="flex flex-col space-y-2">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setSelectedBrand(b);
                        const params = new URLSearchParams(searchParams.toString());
                        if (b === "All") params.delete("brand");
                        else params.set("brand", b);
                        router.push(`/shop?${params.toString()}`);
                      }}
                      className={`text-left text-xs font-semibold py-1.5 px-2 tracking-wide uppercase transition-colors ${
                        selectedBrand === b
                          ? "bg-zinc-900 text-zinc-50 font-bold"
                          : "text-zinc-500 hover:text-zinc-900"
                      }`}
                      style={{ borderRadius: "0px" }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full text-center border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50 py-3 text-xs font-bold uppercase tracking-widest text-zinc-800 transition-colors"
                style={{ borderRadius: "0px" }}
              >
                Reset Filters
              </button>
            </aside>

            {/* Product Grid on right */}
            <main className="lg:col-span-9">
              {filteredProducts.length === 0 ? (
                <div className="border border-zinc-200 p-12 text-center text-zinc-500 text-xs tracking-wider uppercase bg-white">
                  No appliances found matching the filters.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="border border-zinc-200 bg-white flex flex-col group shadow-sm transition-all hover:border-zinc-400"
                      style={{ borderRadius: "0px" }}
                    >
                      {/* Image wrapped with details Link */}
                      <Link 
                        href={`/shop/${product.id}`}
                        className="aspect-square relative overflow-hidden bg-zinc-50 border-b border-zinc-100 p-4 flex items-center justify-center cursor-pointer block"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <p className="text-[8px] sm:text-[9px] tracking-[0.2em] font-bold text-zinc-400 uppercase leading-none">
                            {product.brand} • {product.category}
                          </p>
                          <Link 
                            href={`/shop/${product.id}`}
                            className="font-serif text-xs sm:text-sm font-bold text-zinc-800 hover:text-zinc-950 block leading-tight min-h-[2.5rem]"
                          >
                            {product.name}
                          </Link>
                        </div>
                        
                        <div className="pt-2 flex items-baseline justify-between border-t border-zinc-100">
                          <span className="text-[8px] sm:text-[9px] tracking-wider font-bold text-zinc-400 uppercase">Retail Price</span>
                          <span className="text-xs sm:text-sm font-bold text-zinc-900 font-mono">AED {product.retailPrice.toLocaleString()}</span>
                        </div>

                        <div className="pt-1">
                          <button
                            onClick={() => {
                              addToCart(product, false);
                              alert(`${product.name} added to cart!`);
                            }}
                            className="matte-button-solid w-full text-center py-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Section 3: Sourcing Guidelines (White background) - Image LEFT, Text RIGHT */}
      <section className="border-b border-zinc-200 py-20 bg-white min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Column first */}
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6]">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200">
                <Image
                  src="/bertazzoni_heritage.png"
                  alt="Order-Sourcing Delivery"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Sourcing Guidelines cards second */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                  Procurement Protocol
                </span>
                <h2 className="font-serif text-3xl tracking-tight text-zinc-900">
                  How Order-Sourcing Works
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-zinc-500 font-semibold">
                  <strong className="font-bold text-zinc-800">Our business coordinates directly with primary distributors.</strong> Sourced products are collected factory-sealed from logistics yards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Distributor Verification</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-650 font-medium">
                    We coordinate availability checks with Deira and Sharjah trade gates to verify authentic manufacturing specifications.
                  </p>
                </div>

                <div className="border border-zinc-200 p-6 bg-white hover:border-zinc-950 transition-all duration-300 space-y-2" style={{ borderRadius: "0px" }}>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Collection &amp; Dispatch</h4>
                  <p className="text-xs md:text-sm leading-relaxed text-zinc-650 font-medium">
                    Upon secure advance clearance, we pick up the boxed hardware and dispatch it directly to your site.
                  </p>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4 max-w-md">
                <Link
                  href="/about"
                  className="matte-button-solid px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
                >
                  Learn Sourcing Protocols
                </Link>
                <Link
                  href="/contact"
                  className="matte-button px-8 py-4 text-xs font-bold uppercase tracking-widest text-center flex-1"
                >
                  Submit Sourcing Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: DAKEEK Setup (Cream background) - No image */}
      <section className="border-b border-zinc-200 py-20 bg-[#FAF9F6] min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                Setup Integration
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900 leading-tight">
                Add DAKEEK certified connection to your checkout
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-zinc-650 font-sans">
                <strong className="font-bold text-zinc-900">Every range cooker, built-in gas hob, and high-power electric oven</strong> requires professional connection. DAKEEK engineers handle regulator fittings and dedicated wiring, providing official Civil Defense sign-offs.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 max-w-md">
                <Link href="/services" className="matte-button-solid px-6 py-4 text-xs font-bold uppercase tracking-wider text-center flex-1">
                  View Service Packages
                </Link>
                <Link href="/contact" className="matte-button px-6 py-4 text-xs font-bold uppercase tracking-wider text-center flex-1">
                  Inquire via Sourcing Desk
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 border border-zinc-200 p-6 bg-white" style={{ borderRadius: "0px" }}>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-4">DAKEEK Flat Connection Rates</h3>
              <ul className="space-y-3 text-xs md:text-sm font-semibold text-zinc-600">
                <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                  <span>Built-in Hob Connection</span>
                  <span className="font-mono text-zinc-800">AED 250</span>
                </li>
                <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                  <span>Professional Cooker Connection</span>
                  <span className="font-mono text-zinc-800">AED 350</span>
                </li>
                <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                  <span>Commercial Burner Connection</span>
                  <span className="font-mono text-zinc-800">AED 450</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Delivery & Sourcing FAQ (White background) - Text LEFT, Image RIGHT */}
      <section className="py-20 bg-white min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* FAQ Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
                  Logistics Guide
                </span>
                <h2 className="font-serif text-3xl tracking-tight text-zinc-900 leading-tight">
                  Delivery &amp; Logistics FAQs
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-zinc-500 font-semibold">
                  <strong className="font-bold text-zinc-800">Procurement guidelines</strong> regarding shipping coordinates and delivery scopes.
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
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 relative border border-zinc-200 p-2 bg-[#FAF9F6]">
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200">
                <Image
                  src="/commercial_stove.png"
                  alt="Delivery Coordination Sourcing"
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

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-24 text-center text-xs uppercase tracking-widest text-zinc-400">
        Loading Catalog...
      </div>
    }>
      <ShopCatalog />
    </Suspense>
  );
}
