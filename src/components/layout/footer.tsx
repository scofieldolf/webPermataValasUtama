import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#031D36] text-gray-300 border-t-2 border-pv-gold-primary">
      {/* Upper Footer: Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Logo PT Permata Valas Utama"
                width={36}
                height={36}
                className="w-9 h-9 rounded-lg object-contain bg-white/10 p-0.5"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base leading-tight text-white tracking-tight">
                  PERMATA VALAS
                </span>
                <span className="font-sans text-[9px] tracking-widest text-pv-gold-light font-semibold uppercase leading-none">
                  UTAMA
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed pt-2">
              {SITE_CONFIG.description}
            </p>
            {/* Legal Status badge */}
            <div className="inline-flex items-center space-x-2 bg-pv-navy-deep/50 border border-pv-gold-dark/40 px-3 py-2 rounded-lg text-[11px] text-pv-gold-light font-semibold">
              <ShieldCheck className="w-4 h-4 text-pv-gold-primary flex-shrink-0" />
              <span>Berizin & Diawasi Bank Indonesia</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-white text-sm font-bold tracking-wider uppercase border-b border-gray-700/50 pb-2">
              Tautan Cepat
            </h3>
            <ul className="space-y-2.5 text-xs">
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-pv-gold-light hover:underline flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-pv-gold-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-white text-sm font-bold tracking-wider uppercase border-b border-gray-700/50 pb-2">
              Kontak Kami
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-pv-gold-light flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-400">
                  {SITE_CONFIG.contact.address.full}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-pv-gold-light flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:text-white hover:underline">
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-pv-gold-light flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white hover:underline">
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & BI License */}
          <div className="space-y-4">
            <h3 className="font-serif text-white text-sm font-bold tracking-wider uppercase border-b border-gray-700/50 pb-2">
              Izin Resmi BI
            </h3>
            <div className="bg-[#05284B] border border-pv-gold-dark/20 rounded-xl p-4 space-y-3 text-xs">
              <div className="font-semibold text-white">Penyelenggara KUPU BB</div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                PT Permata Valas Utama secara resmi terdaftar dan memegang izin Kegiatan Usaha Penukaran Valuta Asing Bukan Bank dari Bank Indonesia.
              </p>
              <div className="pt-1 text-[11px] font-mono text-pv-gold-light">
                No. Izin: {SITE_CONFIG.licenseNumber}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Footer: Copyright & Privacy Link */}
      <div className="bg-[#021427] text-gray-400 py-6 border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs space-y-4 sm:space-y-0">
          <div>
            &copy; {currentYear} {SITE_CONFIG.name}. Hak Cipta Dilindungi.
          </div>
          <div className="flex space-x-6">
            <Link href="/kebijakan-privasi" className="hover:text-white hover:underline">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-white hover:underline">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
