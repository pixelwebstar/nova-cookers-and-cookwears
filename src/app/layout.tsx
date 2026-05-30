import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingOverlay from "@/components/LoadingOverlay";
import Chatbot from "@/components/Chatbot";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOVA Cookers & Cookstove Trading LLC | Premium Kitchen Appliances UAE",
  description: "Sourced and installed by specialists. Premium gas hobs, cookers, hoods, and ovens integrated with DAKEEK Technical Services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setVh() {
                  var vh = window.innerHeight * 0.01;
                  document.documentElement.style.setProperty('--vh', vh + 'px');
                }
                setVh();
                
                var lastWidth = window.innerWidth;
                window.addEventListener('resize', function() {
                  var currentWidth = window.innerWidth;
                  var isMobile = window.innerWidth < 1024;
                  if (!isMobile || currentWidth !== lastWidth) {
                    setVh();
                    lastWidth = currentWidth;
                  }
                });
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-zinc-800 bg-white">
        <LoadingOverlay />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
