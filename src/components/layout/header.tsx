"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { KursTicker } from "../kurs/kurs-ticker";
import { cn } from "@/lib/utils";
import type { KursData } from "@/types/kurs";

// Mock data kurs awal untuk ticker
const mockTickerRates: KursData[] = [
  { kode: "USD", beli: 16250, jual: 16350, perubahan: 0.15, tren: "up" },
  { kode: "SGD", beli: 12050, jual: 12150, perubahan: -0.05, tren: "down" },
  { kode: "JPY", beli: 103.5, jual: 104.8, perubahan: 0.22, tren: "up" },
  { kode: "EUR", beli: 17450, jual: 17600, perubahan: 0.0, tren: "flat" },
  { kode: "AUD", beli: 10780, jual: 10890, perubahan: -0.12, tren: "down" },
  { kode: "GBP", beli: 20650, jual: 20850, perubahan: 0.45, tren: "up" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      {/* Kurs Ticker */}
      <KursTicker rates={mockTickerRates} />

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Logo PT Permata Valas Utama"
              width={40}
              height={40}
              priority
              className="w-10 h-10 rounded-lg object-contain shadow-md"
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-tight text-pv-navy-deep tracking-tight">
                PERMATA VALAS
              </span>
              <span className="font-sans text-[10px] tracking-widest text-pv-gold-primary font-semibold uppercase leading-none">
                UTAMA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200 py-2 border-b-2 outline-none",
                    "focus-visible:ring-2 focus-visible:ring-pv-gold-primary focus-visible:ring-offset-2 focus-visible:rounded-md",
                    isActive
                      ? "text-pv-navy-deep border-pv-gold-primary"
                      : "text-gray-500 border-transparent hover:text-pv-navy-deep hover:border-pv-gold-light"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-pv-navy-deep text-white hover:bg-pv-navy-deep/95 transition-all duration-200 text-sm font-semibold shadow hover:shadow-md hover:-translate-y-0.5 group"
            >
              <PhoneCall className="w-4 h-4 mr-2 text-pv-gold-light group-hover:rotate-12 transition-transform duration-200" />
              Kontak & Reservasi
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-pv-navy-deep hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pv-gold-primary"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                  className={cn(
                    "block px-3 py-3 rounded-md text-base font-semibold transition-colors outline-none",
                    "focus-visible:ring-2 focus-visible:ring-pv-gold-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-pv-ivory-surface text-pv-navy-deep border-l-4 border-pv-gold-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-pv-navy-deep"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 pb-2 px-3 border-t border-gray-100">
              <Link
                href="/kontak"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-pv-navy-deep text-white text-base font-semibold shadow"
              >
                <PhoneCall className="w-4 h-4 mr-2 text-pv-gold-light" />
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
