import React from "react";
import type { Metadata } from "next";
import { MapPin, MessageSquare, Clock, Compass } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Lokasi Cabang & Kontak",
  description:
    "Kunjungi kantor PT Permata Valas Utama di SCBD Jakarta Selatan. Peta lokasi, alamat lengkap, jam operasional, nomor telepon, dan petunjuk arah cabang.",
};

export default function LokasiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 mb-12 text-center lg:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-pv-navy-deep">
          Lokasi Cabang Kami
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-3xl">
          Temukan rute menuju cabang utama PT Permata Valas Utama. Gerai kami terletak di lokasi strategis pusat bisnis Jakarta dengan akses parkir yang mudah dan aman.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Branch Info Details */}
        <div className="lg:col-span-5 space-y-6 w-full">
          {/* Card Info Cabang Utama */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-pv-navy-deep flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-pv-gold-primary" />
              Cabang Utama SCBD
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-600">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Alamat Lengkap</span>
                <p className="leading-relaxed text-pv-navy-deep font-medium">
                  {SITE_CONFIG.contact.address.full}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Telepon Kantor</span>
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} className="font-semibold text-pv-navy-deep hover:underline">
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">WhatsApp Sales</span>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-600 hover:underline flex items-center"
                  >
                    <MessageSquare className="w-4 h-4 mr-1 flex-shrink-0" />
                    {SITE_CONFIG.contact.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Jam Operasional</span>
                <div className="flex items-center space-x-2 text-xs text-pv-navy-deep font-semibold">
                  <Clock className="w-4 h-4 text-pv-gold-primary" />
                  <span>{SITE_CONFIG.contact.operatingHours.weekdays.days}: {SITE_CONFIG.contact.operatingHours.weekdays.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-pv-navy-deep font-semibold">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{SITE_CONFIG.contact.operatingHours.weekends.days}: {SITE_CONFIG.contact.operatingHours.weekends.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direction Guidelines Card */}
          <div className="bg-pv-ivory-surface/40 border border-pv-gold-light/20 rounded-2xl p-6 space-y-4">
            <h4 className="font-serif text-sm font-bold text-pv-navy-deep flex items-center">
              <Compass className="w-4 h-4 mr-2 text-pv-gold-primary" />
              Petunjuk Akses Ke Gerai
            </h4>
            <ul className="text-xs text-gray-500 space-y-2 leading-relaxed">
              <li>
                <strong className="text-pv-navy-deep">Kendaraan Pribadi:</strong> Masuk melalui gerbang SCBD Senopati atau Sudirman, ikuti petunjuk jalan ke arah Permata Tower. Gedung menyediakan parkir basement yang aman.
              </li>
              <li>
                <strong className="text-pv-navy-deep">Transportasi Publik (MRT):</strong> Turun di Stasiun MRT Istora Mandiri, keluar ke arah SCBD. Anda dapat berjalan kaki sekitar 5 menit atau menggunakan layanan shuttle bus internal SCBD.
              </li>
              <li>
                <strong className="text-pv-navy-deep">Keamanan Transaksi:</strong> Gerai kami dilengkapi dengan pengamanan CCTV 24 jam serta petugas sekuriti gedung yang berjaga untuk keamanan transaksi valas Anda.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Google Maps Interactive Embed */}
        <div className="lg:col-span-7 w-full h-[350px] lg:h-[480px] rounded-2xl overflow-hidden border border-gray-200/60 shadow-lg bg-gray-100">
          <iframe
            src={SITE_CONFIG.contact.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Lokasi Kantor Utama PT Permata Valas Utama SCBD"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
