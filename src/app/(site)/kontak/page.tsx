"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

export default function KontakPage() {
  // State untuk formulir Hubungi Kami
  const [contactForm, setContactForm] = useState({ nama: "", email: "", telepon: "", pesan: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success">("idle");

  // State untuk formulir Booking Kurs
  const [bookingForm, setBookingForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    valas: "USD",
    nominal: "",
    tipe: "beli",
    note: "",
  });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "sending" | "success">("idle");
  const [bookingCode, setBookingCode] = useState("");

  // State untuk FAQ Accordion (indeks FAQ yang terbuka)
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("sending");
    // Simulasi respons server 1.5 detik
    setTimeout(() => {
      setContactStatus("success");
      setContactForm({ nama: "", email: "", telepon: "", pesan: "" });
    }, 1500);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("sending");
    const code = `PV-${Math.floor(100000 + Math.random() * 900000)}`;
    // Simulasi respons server 1.5 detik
    setTimeout(() => {
      setBookingStatus("success");
      setBookingCode(code);
      setBookingForm({
        nama: "",
        email: "",
        telepon: "",
        valas: "USD",
        nominal: "",
        tipe: "beli",
        note: "",
      });
    }, 1500);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 mb-12 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-pv-navy-deep">
          Hubungi & Reservasi Kurs
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
          Kirim pesan ke tim kami, reservasi nominal penukaran valuta asing, atau pelajari hal-hal umum seputar transaksi melalui FAQ di bawah.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left: Contact Form & Info Details */}
        <div className="lg:col-span-6 space-y-8 w-full">
          {/* General Message Form */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-pv-navy-deep mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-pv-gold-primary" />
              Kirim Pesan
            </h3>

            {contactStatus === "success" ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-emerald-800 text-sm">Pesan Berhasil Terkirim</h4>
                <p className="text-xs text-emerald-600 leading-relaxed">
                  Terima kasih telah menghubungi kami. Tim administrasi PT Permata Valas Utama akan segera meninjau pesan Anda dan membalas melalui email atau telepon.
                </p>
                <button
                  onClick={() => setContactStatus("idle")}
                  className="mt-2 text-xs font-bold text-pv-navy-deep hover:underline"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs font-bold text-gray-600 block">
                      Nama Lengkap *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactForm.nama}
                      onChange={(e) => setContactForm({ ...contactForm, nama: e.target.value })}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="text-xs font-bold text-gray-600 block">
                      Nomor Telepon *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={contactForm.telepon}
                      onChange={(e) => setContactForm({ ...contactForm, telepon: e.target.value })}
                      placeholder="Contoh: 08123456789"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-xs font-bold text-gray-600 block">
                    Alamat Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-xs font-bold text-gray-600 block">
                    Isi Pesan *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={contactForm.pesan}
                    onChange={(e) => setContactForm({ ...contactForm, pesan: e.target.value })}
                    placeholder="Tuliskan detail pertanyaan Anda di sini..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={contactStatus === "sending"}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-pv-navy-deep hover:bg-pv-navy-deep/95 text-white text-xs font-bold transition-all disabled:opacity-50"
                >
                  {contactStatus === "sending" ? (
                    "Mengirim..."
                  ) : (
                    <>
                      Kirim Pesan
                      <Send className="w-3.5 h-3.5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick Info contacts */}
          <div className="bg-pv-ivory-surface/40 border border-pv-gold-light/20 rounded-2xl p-6">
            <h4 className="font-serif text-sm font-bold text-pv-navy-deep mb-4">Informasi Kontak Perusahaan</h4>
            <div className="space-y-3.5 text-xs text-gray-600">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-pv-gold-primary mt-0.5 flex-shrink-0" />
                <span>{SITE_CONFIG.contact.address.full}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-pv-gold-primary flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:underline font-semibold text-pv-navy-deep">
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-pv-gold-primary flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:underline font-semibold text-pv-navy-deep">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking / Currency Reservation Form */}
        <div className="lg:col-span-6 w-full">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg">
            <h3 className="font-serif text-base font-bold text-pv-navy-deep mb-2 flex items-center">
              <ChevronDown className="w-5 h-5 mr-2 text-pv-gold-primary rotate-180" />
              Reservasi / Booking Kurs
            </h3>
            <p className="text-[11px] text-gray-500 mb-5 leading-normal">
              Pesan mata uang asing Anda secara online dan ambil di gerai ITC Permata Hijau kami untuk mengamankan persediaan fisik bank notes dan mengunci kurs referensi harian.
            </p>

            {bookingStatus === "success" ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <div>
                  <h4 className="font-bold text-emerald-800 text-sm">Reservasi Anda Terdaftar</h4>
                  <p className="text-[11px] text-emerald-700 font-mono mt-1 font-semibold">Kode Booking: {bookingCode}</p>
                </div>
                <p className="text-xs text-emerald-600 leading-relaxed">
                  Staf konter utama kami akan segera menghubungi Anda melalui WhatsApp atau telepon untuk mengonfirmasi ketersediaan nominal dan jam pengambilan valuta asing di gerai.
                </p>
                <button
                  onClick={() => {
                    setBookingStatus("idle");
                    setBookingCode("");
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-pv-navy-deep text-white text-xs font-bold"
                >
                  Buat Reservasi Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Arah Transaksi */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-600 block">Tipe Transaksi *</span>
                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setBookingForm({ ...bookingForm, tipe: "beli" })}
                      className={cn(
                        "py-2 text-xs font-bold rounded-md transition-all",
                        bookingForm.tipe === "beli"
                          ? "bg-white text-pv-navy-deep shadow-sm border border-gray-100"
                          : "text-gray-500 hover:text-pv-navy-deep"
                      )}
                    >
                      Jual Valas (Saya Bawa Valas)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingForm({ ...bookingForm, tipe: "jual" })}
                      className={cn(
                        "py-2 text-xs font-bold rounded-md transition-all",
                        bookingForm.tipe === "jual"
                          ? "bg-white text-pv-navy-deep shadow-sm border border-gray-100"
                          : "text-gray-500 hover:text-pv-navy-deep"
                      )}
                    >
                      Beli Valas (Saya Butuh Valas)
                    </button>
                  </div>
                </div>

                {/* Form Nama, Email, & Telepon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="booking-name" className="text-xs font-bold text-gray-600 block">
                      Nama Lengkap *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={bookingForm.nama}
                      onChange={(e) => setBookingForm({ ...bookingForm, nama: e.target.value })}
                      placeholder="Sesuai KTP / Paspor"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="booking-email" className="text-xs font-bold text-gray-600 block">
                      Alamat Email *
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="booking-phone" className="text-xs font-bold text-gray-600 block">
                      Nomor WhatsApp *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      value={bookingForm.telepon}
                      onChange={(e) => setBookingForm({ ...bookingForm, telepon: e.target.value })}
                      placeholder="Contoh: 08123456789"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                    />
                  </div>
                </div>

                {/* Valas & Nominal Input */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="booking-currency" className="text-xs font-bold text-gray-600 block">
                      Pilih Mata Uang *
                    </label>
                    <select
                      id="booking-currency"
                      value={bookingForm.valas}
                      onChange={(e) => setBookingForm({ ...bookingForm, valas: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep bg-white cursor-pointer"
                    >
                      {SITE_CONFIG.currencies.map((c) => (
                        <option key={c.kode} value={c.kode}>
                          {c.kode} ({c.nama})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="booking-amount" className="text-xs font-bold text-gray-600 block">
                      Nominal Transaksi (Valas) *
                    </label>
                    <input
                      id="booking-amount"
                      type="number"
                      required
                      min={10}
                      value={bookingForm.nominal}
                      onChange={(e) => setBookingForm({ ...bookingForm, nominal: e.target.value })}
                      placeholder="Contoh: 5000"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                    />
                  </div>
                </div>

                {/* Note / Catatan */}
                <div className="space-y-1">
                  <label htmlFor="booking-note" className="text-xs font-bold text-gray-600 block">
                    Catatan Reservasi
                  </label>
                  <textarea
                    id="booking-note"
                    rows={3}
                    value={bookingForm.note}
                    onChange={(e) => setBookingForm({ ...bookingForm, note: e.target.value })}
                    placeholder="Contoh: pecahan nominal besar, jam rencana penjemputan, dll."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep resize-none"
                  />
                </div>

                <div className="text-[10px] text-gray-400 italic bg-gray-50 p-3 rounded-lg border border-gray-100 leading-normal">
                  *Pemesanan online ini berlaku sebagai antrean prioritas. Kunci rate resmi hanya berlaku selama 2 jam setelah konfirmasi WhatsApp oleh tim teller gerai kami.
                </div>

                <button
                  type="submit"
                  disabled={bookingStatus === "sending"}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-pv-gold-primary hover:bg-pv-gold-dark text-white text-xs font-bold transition-all disabled:opacity-50"
                >
                  {bookingStatus === "sending" ? "Memproses..." : "Kirim Pengajuan Booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. FAQ Accordion Section */}
      <section className="border-t border-gray-100 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-2xl font-bold text-pv-navy-deep flex items-center justify-center">
            <HelpCircle className="w-5 h-5 mr-2 text-pv-gold-primary" />
            Tanya Jawab (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Mencari jawaban cepat mengenai kebijakan transaksi, perizinan, dan batas maksimum penukaran uang.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {SITE_CONFIG.faqs.map((faq, idx) => {
            const isFaqOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left font-serif font-bold text-xs sm:text-sm text-pv-navy-deep flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200",
                      isFaqOpen && "transform rotate-180"
                    )}
                  />
                </button>
                {isFaqOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
