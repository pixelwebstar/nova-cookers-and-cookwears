"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname && (pathname.startsWith("/admin") || pathname.startsWith("/wp-admin"))) {
    return null;
  }

  return (
    <footer className="border-t border-zinc-200 bg-[#FAF9F6] py-16 mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="md:col-span-2">
          <Link href="/" className="flex flex-col mb-4">
            <span className="font-serif text-xl tracking-[0.25em] font-extrabold text-zinc-900 leading-none">NOVA</span>
            <span className="text-[8px] tracking-[0.22em] font-semibold text-zinc-500 uppercase mt-1">COOKERS &amp; COOKSTOVES</span>
          </Link>
          <p className="text-[13px] leading-6 text-zinc-500 max-w-sm font-sans mt-4">
            NOVA Cookers &amp; Cookstove Trading LLC is Dubai's premium kitchen appliance partner. We offer direct order-based sourcing from Europe's top luxury brands, fully integrated with professional gas and electric installation.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[11px] tracking-[0.2em] font-bold text-zinc-900 uppercase mb-4">Quick Links</h4>
          <ul className="space-y-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <li>
              <Link href="/" className="hover:text-zinc-900 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-zinc-900 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-zinc-900 transition-colors">
                Product Catalog
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-zinc-900 transition-colors">
                DAKEEK Installation
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-zinc-900 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Technical Partner */}
        <div>
          <h4 className="text-[11px] tracking-[0.2em] font-bold text-zinc-900 uppercase mb-4">Service Integration</h4>
          <div className="border border-zinc-200 p-4 bg-white" style={{ borderRadius: "0px" }}>
            <p className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase mb-1">Integrated Technical Partner</p>
            <p className="text-xs font-bold text-zinc-800 uppercase tracking-widest">DAKEEK Technical Services</p>
            <p className="text-[11px] text-zinc-500 mt-2 leading-5">
              All safety connections, gas regulator setups, and AMCs are handled by DAKEEK's certified engineers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-400 font-sans tracking-wide">
        <p>© 2026 NOVA Cookers &amp; Cookstove Trading LLC. All Rights Reserved.</p>
        <p className="mt-4 md:mt-0 uppercase font-semibold tracking-widest text-[10px] text-zinc-500">Dubai Mainland, United Arab Emirates</p>
      </div>
    </footer>
  );
}
