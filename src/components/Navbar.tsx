"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCartItems } from "@/lib/cart";

export default function Navbar() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const items = getCartItems();
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCount();
    window.addEventListener("cart_updated", updateCount);
    return () => window.removeEventListener("cart_updated", updateCount);
  }, []);

  if (pathname && (pathname.startsWith("/admin") || pathname.startsWith("/wp-admin"))) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Catalog", href: "/shop" },
    { name: "Installation & AMC", href: "/services" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <header className="border-b border-zinc-200 bg-[#FAF9F6] fixed top-0 left-0 right-0 z-40">
      {/* First Row: Logo on Left, Cart Button on Right (Desktop + Mobile) */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col justify-center">
          <span className="font-serif text-2xl tracking-[0.25em] font-extrabold text-zinc-900 leading-none">NOVA</span>
          <span className="text-[9px] tracking-[0.22em] font-semibold text-zinc-500 uppercase mt-1">COOKERS &amp; COOKSTOVES</span>
        </Link>

        {/* Desktop Menu Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold tracking-widest text-zinc-600 uppercase">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`hover:text-zinc-900 transition-colors ${
                pathname === link.href ? "text-zinc-950 font-black" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Cart Link (Common on desktop/mobile first row) */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/checkout" 
            className="border border-zinc-900 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 hover:text-white px-4 py-2.5 lg:px-5 lg:py-2.5 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center"
            style={{ borderRadius: "0px" }}
          >
            Cart <span className="ml-2 font-mono text-[11px] border-l border-zinc-700 pl-2">[{cartCount}]</span>
          </Link>
        </div>
      </div>

      {/* Second Row: Horizontal Scrolling Navigation List (only visible on mobile/tablet) */}
      <div className="lg:hidden w-full bg-white border-t border-zinc-150 relative z-10">
        <div className="max-w-[1360px] mx-auto px-4">
          <div className="flex w-full items-center divide-x divide-zinc-200 overflow-x-auto py-3 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex-1 px-3 py-1.5 text-center text-[10px] sm:text-[11px] whitespace-nowrap font-bold uppercase tracking-widest transition-colors leading-none ${
                  pathname === link.href ? "text-zinc-950 font-black" : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
