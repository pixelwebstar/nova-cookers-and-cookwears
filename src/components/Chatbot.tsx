"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Welcome to NOVA. I am your corporate sourcing assistant. I can guide you through our factory-sealed European appliance catalog, outline DAKEEK Civil Defense certifications, or explain shipping schedules. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat window
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const suggestPrompts = [
    { label: "Book DAKEEK Setup", key: "dakeek" },
    { label: "Sourcing Timelines", key: "timeline" },
    { label: "Appliance Brands", key: "brands" },
    { label: "Installation Rates", key: "rates" },
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user" as const, text }];
    setMessages(newMessages);
    setInput("");

    // Calculate response
    setTimeout(() => {
      let botResponse = "";
      const lower = text.toLowerCase();

      if (lower.includes("dakeek") || lower.includes("install") || lower.includes("book") || lower.includes("setup")) {
        botResponse =
          "All gas regulator fittings, pressure leak validations, and electrical lines are handled exclusively by certified DAKEEK Technical Services engineers. You can book an appointment directly from our 'Installation & AMC' services page.";
      } else if (lower.includes("time") || lower.includes("deliver") || lower.includes("ship") || lower.includes("dubai") || lower.includes("sharjah")) {
        botResponse =
          "We collect factory-sealed stock from distributor depots in Naif and Sharjah upon order confirmation. Deliveries within Dubai and Sharjah are completed within 24 to 48 hours.";
      } else if (lower.includes("brand") || lower.includes("miele") || lower.includes("smeg") || lower.includes("bosch") || lower.includes("elica") || lower.includes("bertazzoni")) {
        botResponse =
          "We source authentic Miele, Smeg, Bosch, Bertazzoni, and Elica cooking hardware directly from regional importer networks, ensuring full UAE manufacturer warranties.";
      } else if (lower.includes("rate") || lower.includes("price") || lower.includes("cost") || lower.includes("aed")) {
        botResponse =
          "DAKEEK technical connection flat rates: Built-in Hobs are AED 250, Range Cookers are AED 350, and Commercial Burners are AED 450. Annual Maintenance Contracts (AMC) start from AED 499/year.";
      } else if (lower.includes("office") || lower.includes("location") || lower.includes("address") || lower.includes("deira")) {
        botResponse =
          "Our corporate operations are registered under Dubai Mainland guidelines. Sourced inventories are dispatched directly from distributor logistics yards in Sharjah and Deira.";
      } else {
        botResponse =
          "NOVA is Dubai's premier order-led trading pipeline for European culinary hardware. You can browse our available models under the 'Catalog' page or send specialized requests on our 'Contact' page.";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105"
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Slide-Up Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[460px] bg-white border border-zinc-200 shadow-xl flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{ borderRadius: "0px" }}
      >
        {/* Header */}
        <div className="bg-zinc-950 p-4 flex items-center justify-between text-white border-b border-zinc-900">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest leading-none">NOVA Sourcing Advisor</h4>
            <span className="text-[8px] tracking-wider text-zinc-400 uppercase font-semibold block mt-1">
              • AI Partner Agent Connected
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Messages Log */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-zinc-900 text-white font-medium"
                    : "bg-zinc-50 border border-zinc-150 text-zinc-700 font-semibold"
                }`}
                style={{ borderRadius: "0px" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Sugggestion Chips */}
        {messages.length === 1 && (
          <div className="px-4 py-2 border-t border-zinc-100 bg-zinc-50 flex flex-wrap gap-1.5">
            {suggestPrompts.map((prompt) => (
              <button
                key={prompt.key}
                onClick={() => handleSend(prompt.label)}
                className="text-[9px] font-bold uppercase tracking-wider bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-950 px-2.5 py-1.5 transition-colors"
                style={{ borderRadius: "0px" }}
              >
                {prompt.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="border-t border-zinc-200 p-3 bg-white flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your sourcing question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            className="flex-1 bg-zinc-50 border border-zinc-200 px-3 py-2 text-xs text-zinc-800 focus:outline-none focus:border-zinc-900"
            style={{ borderRadius: "0px" }}
          />
          <button
            onClick={() => handleSend(input)}
            className="bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 transition-colors"
            style={{ borderRadius: "0px" }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
