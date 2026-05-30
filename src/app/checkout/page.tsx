"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  getCartItems, 
  updateCartQuantity, 
  toggleCartInstallation, 
  removeFromCart, 
  clearCart,
  CartItem 
} from "@/lib/cart";
import { saveOrder } from "@/lib/db";

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  const syncCart = () => {
    setCartItems(getCartItems());
  };

  useEffect(() => {
    syncCart();
    window.addEventListener("cart_updated", syncCart);
    return () => window.removeEventListener("cart_updated", syncCart);
  }, []);

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateCartQuantity(productId, quantity);
  };

  const handleToggleInstallation = (productId: string) => {
    toggleCartInstallation(productId);
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.retailPrice * item.quantity, 0);
  const installationTotal = cartItems.reduce((sum, item) => 
    sum + (item.includeInstallation ? 350 * item.quantity : 0), 0
  );
  const vat = (subtotal + installationTotal) * 0.05; // UAE 5% VAT
  const total = subtotal + installationTotal + vat;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!custName || !custPhone || !custEmail || !address) {
      alert("Please fill in all customer details.");
      return;
    }

    let finalPaymentMethod = paymentMethod;
    if (paymentMethod === "Credit Card") {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        alert("Please complete all credit card information fields.");
        return;
      }
      if (cardNumber.replace(/\s/g, "").length < 15) {
        alert("Please enter a valid credit card number.");
        return;
      }
      const last4 = cardNumber.replace(/\s/g, "").slice(-4);
      const firstDigit = cardNumber.trim()[0];
      const brand = firstDigit === "3" ? "AMEX" : firstDigit === "5" ? "MasterCard" : "Visa";
      finalPaymentMethod = `Credit Card (${brand} ending in *${last4})`;
    } else if (paymentMethod === "Apple Pay") {
      finalPaymentMethod = "Apple Pay (Authorized via Apple Wallet)";
    } else if (paymentMethod === "Google Pay") {
      finalPaymentMethod = "Google Pay (Authorized via Google Wallet)";
    }

    const orderId = "ord-" + Math.floor(100000 + Math.random() * 900000);
    
    // Save order details securely
    saveOrder({
      id: orderId,
      customerName: custName,
      customerPhone: custPhone,
      customerEmail: custEmail,
      address,
      paymentMethod: finalPaymentMethod,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        retailPrice: item.product.retailPrice,
        estimatedCost: item.product.estimatedCost,
        quantity: item.quantity
      })),
      totalPrice: total,
      totalCost: cartItems.reduce((sum, item) => 
        sum + (item.product.estimatedCost * item.quantity), 0
      ) + (installationTotal * 0.6), // Assume installation cost is 60% of price
      status: "Pending Sourcing",
      date: new Date().toLocaleDateString("en-AE")
    });

    setPlacedOrderId(orderId);
    setOrderCompleted(true);
    clearCart();
  };

  if (orderCompleted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="border border-zinc-200 p-8 bg-white space-y-6">
          <span className="text-zinc-600 font-bold block text-sm uppercase tracking-wider">✓ Sourcing Order Submitted</span>
          <h2 className="font-serif text-3xl text-zinc-900 leading-tight">Order #{placedOrderId} Created</h2>
          <p className="text-xs text-zinc-500 leading-5">
            Your premium sourcing order is officially in queue. We will check availability with our distributors in Deira/Sharjah and contact you within the next 2 hours to process the advance payment.
          </p>

          <div className="border-t border-zinc-100 pt-6 text-left space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase">Sourcing Timeline</h4>
            <div className="space-y-3 text-[11px]">
              <div className="flex justify-between">
                <span className="font-bold text-zinc-800 uppercase">1. Distributor Verification</span>
                <span className="text-zinc-500">In Progress</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-zinc-800 uppercase">2. Advance Payment</span>
                <span className="text-zinc-400">Awaiting Invoice</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-zinc-800 uppercase">3. DAKEEK Setup</span>
                <span className="text-zinc-400">Scheduled on Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <Link href="/shop" className="matte-button px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-block">
          Return to Shop Catalog
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-6">
        <p className="text-zinc-500 text-xs tracking-wider uppercase">Your Cart is Empty</p>
        <Link href="/shop" className="matte-button px-8 py-3.5 text-xs font-bold uppercase tracking-widest inline-block">
          Explore Kitchen Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 pt-36 lg:pt-32">
      <div className="mb-12 space-y-4">
        <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-400 uppercase">
          Finalize Setup
        </span>
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900">
          Shopping Cart &amp; Sourcing Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Cart items list */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
            Selected Appliances ({cartItems.length})
          </h3>

          <div className="border border-zinc-200 bg-white divide-y divide-zinc-200">
            {cartItems.map((item) => (
              <div key={item.product.id} className="p-6 flex space-x-6 items-start">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover border border-zinc-150"
                />
                
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-[9px] tracking-widest font-bold text-zinc-400 uppercase">
                        {item.product.brand}
                      </p>
                      <h4 className="font-serif text-sm font-semibold text-zinc-800">
                        {item.product.name}
                      </h4>
                    </div>
                    <span className="text-xs font-bold font-mono text-zinc-900">
                      AED {(item.product.retailPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity and DAKEEK option */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-100">
                    <div className="flex items-center border border-zinc-200">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-zinc-500 hover:text-zinc-950 font-mono text-xs"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-mono text-xs text-zinc-800 border-l border-r border-zinc-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-zinc-500 hover:text-zinc-950 font-mono text-xs"
                      >
                        +
                      </button>
                    </div>

                    <label className="flex items-center space-x-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={item.includeInstallation}
                        onChange={() => handleToggleInstallation(item.product.id)}
                        className="border border-zinc-900 text-zinc-900 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                        style={{ borderRadius: "0px" }}
                      />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        + DAKEEK Setup (AED 350)
                      </span>
                    </label>

                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-800 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Checkout Summary & Form */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
            Sourcing Summary
          </h3>

          <div className="border border-zinc-200 bg-white p-6 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase tracking-wider">Subtotal</span>
                <span className="font-mono font-semibold text-zinc-800">AED {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase tracking-wider">DAKEEK Installation</span>
                <span className="font-mono font-semibold text-zinc-800">AED {installationTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase tracking-wider">VAT (5%)</span>
                <span className="font-mono font-semibold text-zinc-800">AED {vat.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-4 flex justify-between items-baseline">
              <span className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Estimated Total</span>
              <span className="text-lg font-bold text-zinc-900 font-mono">AED {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Sourcing Checkout Form */}
          <div className="border border-zinc-200 bg-white p-6 space-y-6">
            <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest">
              Sourcing Registration
            </h3>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Customer Full Name</label>
                <input
                  type="text"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                  style={{ borderRadius: "0px" }}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">UAE Contact Phone</label>
                  <input
                    type="tel"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                    style={{ borderRadius: "0px" }}
                    placeholder="+971 50..."
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                    style={{ borderRadius: "0px" }}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase">Delivery &amp; Setup Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-xs text-zinc-800 focus:outline-none focus:bg-white focus:border-zinc-900"
                  style={{ borderRadius: "0px" }}
                  placeholder="Villa/Apartment No, Street Name, Community Area, Dubai..."
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] tracking-wider font-bold text-zinc-400 uppercase block">Sourcing Payment Preference</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "Credit Card",
                    "Apple Pay",
                    "Google Pay",
                    "Bank Transfer",
                    "Cash on Delivery"
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`text-center py-2 text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                        paymentMethod === method
                          ? "bg-zinc-950 text-white border-zinc-950 font-bold"
                          : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-900"
                      }`}
                      style={{ borderRadius: "0px" }}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {/* Subforms based on selection */}
                {paymentMethod === "Credit Card" && (
                  <div className="border border-zinc-200 p-4 space-y-4 bg-zinc-50" style={{ borderRadius: "0px" }}>
                    <div className="flex justify-between items-center border-b border-zinc-200 pb-2 mb-2">
                      <span className="text-[9px] uppercase font-bold text-zinc-400">Secure Card Processing</span>
                      <div className="flex space-x-1.5 text-[9px] font-bold font-sans text-zinc-400">
                        <span>VISA</span>
                        <span>•</span>
                        <span>MC</span>
                        <span>•</span>
                        <span>AMEX</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-zinc-400 block">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-white border border-zinc-250 p-2 text-xs"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold text-zinc-400 block">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="4000 1234 5678 9010"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, "").replace(/(\d{4})/g, "$1 ").trim())}
                        className="w-full bg-white border border-zinc-250 p-2 text-xs font-mono"
                        style={{ borderRadius: "0px" }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-bold text-zinc-400 block">Expiry Date</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/[^0-9]/g, "");
                            if (value.length > 2) {
                              value = value.substring(0, 2) + "/" + value.substring(2);
                            }
                            setCardExpiry(value);
                          }}
                          className="w-full bg-white border border-zinc-250 p-2 text-xs font-mono"
                          style={{ borderRadius: "0px" }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-bold text-zinc-400 block">CVV Code</label>
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ""))}
                          className="w-full bg-white border border-zinc-250 p-2 text-xs font-mono"
                          style={{ borderRadius: "0px" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "Apple Pay" && (
                  <div className="border border-zinc-200 p-6 space-y-3 bg-zinc-50 text-center" style={{ borderRadius: "0px" }}>
                    <div className="h-10 w-full bg-black text-white hover:bg-zinc-900 flex items-center justify-center font-bold tracking-widest text-sm cursor-pointer border border-black font-sans" style={{ borderRadius: "0px" }}>
                       Pay
                    </div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                      Double-click side button to authenticate (Simulated)
                    </p>
                  </div>
                )}

                {paymentMethod === "Google Pay" && (
                  <div className="border border-zinc-200 p-6 space-y-3 bg-zinc-50 text-center" style={{ borderRadius: "0px" }}>
                    <div className="h-10 w-full bg-white text-black hover:bg-zinc-100 flex items-center justify-center font-bold tracking-widest text-xs cursor-pointer border border-zinc-300 font-sans" style={{ borderRadius: "0px" }}>
                      <span className="font-sans font-extrabold text-zinc-800 text-[13px] tracking-tight">G</span>Pay
                    </div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                      Authorize transaction via Google Wallet (Simulated)
                    </p>
                  </div>
                )}

                {paymentMethod === "Bank Transfer" && (
                  <div className="border border-zinc-200 p-4 space-y-2 bg-zinc-50 text-xs leading-relaxed text-zinc-650 font-semibold" style={{ borderRadius: "0px" }}>
                    <p className="font-bold text-zinc-850 uppercase text-[9px] mb-1">NOVA Corporate Sourcing coordinates</p>
                    <p>Bank: <span className="text-zinc-800">Emirates NBD</span></p>
                    <p>IBAN: <span className="text-zinc-800 font-mono">AE89 0230 0000 1234 5678 901</span></p>
                    <p>BIC: <span className="text-zinc-800 font-mono">EBILAEADXXX</span></p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold mt-2">
                      Please upload transfer receipt via WhatsApp or reply to the email invoice.
                    </p>
                  </div>
                )}

                {paymentMethod === "Cash on Delivery" && (
                  <div className="border border-zinc-200 p-4 space-y-1 bg-zinc-50 text-xs leading-relaxed text-zinc-650 font-semibold" style={{ borderRadius: "0px" }}>
                    <p className="font-bold text-zinc-855 uppercase text-[9px]">Selective Delivery Settlement</p>
                    <p>
                      Cash, check, or physical card payments accepted at your doorstep. We charge a 20% advance via invoice to coordinate distributor sourcing.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full matte-button-solid py-4 text-xs font-bold uppercase tracking-widest text-center"
              >
                Submit Sourcing Order Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
