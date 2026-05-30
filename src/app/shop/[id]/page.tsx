"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStoredProducts, Product, saveInquiry } from "@/lib/db";
import { addToCart } from "@/lib/cart";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  
  // Inquiry form states
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custMessage, setCustMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const products = getStoredProducts();
    const found = products.find((p) => p.id === resolvedParams.id);
    if (found) {
      setProduct(found);
      setCustMessage(`Hello, I would like to get a quotation and check availability for the ${found.brand} ${found.name}.`);
    }
  }, [resolvedParams.id]);

  if (!product) {
    return (
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-24 text-center">
        <p className="text-zinc-500 text-xs tracking-wider uppercase mb-4">Product Not Found</p>
        <Link href="/shop" className="matte-button px-6 py-3 text-xs uppercase tracking-widest inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Generate WhatsApp link
  const whatsappNumber = "971501234567"; // Mock client phone number for UAE
  const whatsappText = encodeURIComponent(
    `Hello NOVA Cookers, I am interested in the ${product.brand} ${product.name} (Model ID: ${product.id}). ` +
    `Please confirm sourcing availability and DAKEEK installation scheduling.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  const handleAddToCartAndCheckout = () => {
    addToCart(product, includeInstallation);
    router.push("/checkout");
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) {
      alert("Please fill in your name and telephone number.");
      return;
    }
    
    saveInquiry({
      id: "inq-" + Math.random().toString(36).substring(2, 9),
      customerName: custName,
      customerPhone: custPhone,
      message: custMessage,
      productId: product.id,
      productName: product.name,
      date: new Date().toLocaleDateString("en-AE")
    });

    setFormSubmitted(true);
    setCustName("");
    setCustPhone("");
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8 text-[10px] tracking-widest font-bold text-zinc-400 uppercase flex items-center space-x-2">
        <Link href="/" className="hover:text-zinc-900">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-zinc-900">Catalog</Link>
        <span>/</span>
        <span className="text-zinc-600">{product.brand}</span>
        <span>/</span>
        <span className="text-zinc-900 truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image Column */}
        <div className="border border-zinc-200 p-4 bg-zinc-50 flex items-center justify-center">
          <div className="aspect-square w-full relative overflow-hidden bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Information Column */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
              {product.brand} • {product.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight text-zinc-900">
              {product.name}
            </h1>
            <div className="pt-2 flex items-baseline space-x-3">
              <span className="text-xs tracking-wider font-bold text-zinc-400 uppercase">Retail Price</span>
              <span className="text-xl font-bold text-zinc-900 font-mono">AED {product.retailPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-b border-zinc-200 py-6">
            <h4 className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase mb-2">Description</h4>
            <p className="text-[13px] leading-6 text-zinc-600 font-sans">
              {product.description}
            </p>
          </div>

          {/* Specifications Table */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
              Technical Specifications
            </h3>
            <div className="border border-zinc-200 divide-y divide-zinc-200 bg-white">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 p-3 text-xs tracking-wide">
                  <span className="font-bold text-zinc-500 uppercase">{key}</span>
                  <span className="col-span-2 text-zinc-800 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DAKEEK Installation Option */}
          <div className="border border-zinc-200 p-5 bg-zinc-50 space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeInstallation}
                onChange={() => setIncludeInstallation(!includeInstallation)}
                className="mt-0.5 border border-zinc-900 bg-white text-zinc-900 focus:ring-0 w-4 h-4 cursor-pointer"
                style={{ borderRadius: "0px" }}
              />
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider select-none">
                Include certified DAKEEK gas/electric installation (+ AED 350)
              </span>
            </label>
            <p className="text-[11px] leading-5 text-zinc-500 pl-7">
              Includes safety valve inspection, certified connection, leakage test, and official ESMA compliance verification.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleAddToCartAndCheckout}
              className="matte-button-solid py-4 text-xs font-bold uppercase tracking-widest text-center"
            >
              Order &amp; Schedule Setup
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="matte-button py-4 text-xs font-bold uppercase tracking-widest text-center block"
            >
              Inquire via WhatsApp
            </a>
          </div>

          {/* Offline Inquiry Form */}
          <div className="border border-zinc-200 p-6 bg-white space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
                Request Sourcing Quotation
              </h4>
              <p className="text-[11px] text-zinc-500">
                Can't connect to WhatsApp? Submit details below and we will contact you within 2 hours.
              </p>
            </div>

            {formSubmitted ? (
              <div className="border border-zinc-200 p-4 bg-zinc-50 text-center text-xs font-bold uppercase tracking-wider text-zinc-600">
                ✓ Inquiry submitted. We will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full bg-white border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                    style={{ borderRadius: "0px" }}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (e.g. +971...)"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full bg-white border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                    style={{ borderRadius: "0px" }}
                    required
                  />
                </div>
                <textarea
                  placeholder="Inquiry Details"
                  rows={2}
                  value={custMessage}
                  onChange={(e) => setCustMessage(e.target.value)}
                  className="w-full bg-white border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                  style={{ borderRadius: "0px" }}
                  required
                />
                <button
                  type="submit"
                  className="w-full matte-button-solid py-2.5 text-[10px] font-bold uppercase tracking-widest text-center"
                >
                  Submit Sourcing Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
