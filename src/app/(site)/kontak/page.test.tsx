import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import KontakPage from "./page";
import { SITE_CONFIG } from "@/config/site";

describe("Kontak Page", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render page header, contact form, and booking form successfully", () => {
    render(<KontakPage />);

    expect(screen.getByText("Hubungi & Reservasi Kurs")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Kirim Pesan", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Reservasi / Booking Kurs")).toBeInTheDocument();
    expect(screen.getByText(SITE_CONFIG.contact.address.full)).toBeInTheDocument();
  });

  it("should handle contact form submission", () => {
    render(<KontakPage />);

    const nameInput = screen.getByLabelText("Nama Lengkap *", { selector: "#contact-name" });
    const phoneInput = screen.getByLabelText("Nomor Telepon *", { selector: "#contact-phone" });
    const emailInput = screen.getByLabelText("Alamat Email *", { selector: "#contact-email" });
    const messageInput = screen.getByLabelText("Isi Pesan *", { selector: "#contact-message" });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(phoneInput, { target: { value: "08123456789" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Hello, this is a test message." } });

    const submitButton = screen.getByRole("button", { name: /Kirim Pesan/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Mengirim...")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByText("Pesan Berhasil Terkirim")).toBeInTheDocument();

    const resetButton = screen.getByRole("button", { name: "Kirim Pesan Lain" });
    fireEvent.click(resetButton);

    expect(screen.getByRole("heading", { name: "Kirim Pesan", level: 3 })).toBeInTheDocument();
  });

  it("should handle booking form submission with new fields and bookingCode state", () => {
    render(<KontakPage />);

    const buyButton = screen.getByRole("button", { name: "Beli Valas (Saya Butuh Valas)" });
    const sellButton = screen.getByRole("button", { name: "Jual Valas (Saya Bawa Valas)" });

    fireEvent.click(buyButton);
    fireEvent.click(sellButton);

    const nameInput = screen.getByLabelText("Nama Lengkap *", { selector: "#booking-name" });
    const emailInput = screen.getByLabelText("Alamat Email *", { selector: "#booking-email" });
    const phoneInput = screen.getByLabelText("Nomor WhatsApp *", { selector: "#booking-phone" });
    const currencySelect = screen.getByLabelText("Pilih Mata Uang *", { selector: "#booking-currency" });
    const amountInput = screen.getByLabelText("Nominal Transaksi (Valas) *", { selector: "#booking-amount" });
    const noteInput = screen.getByLabelText("Catatan Reservasi", { selector: "#booking-note" });

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "08987654321" } });
    fireEvent.change(currencySelect, { target: { value: "EUR" } });
    fireEvent.change(amountInput, { target: { value: "1000" } });
    fireEvent.change(noteInput, { target: { value: "Pecahan 100 EUR saja." } });

    const submitButton = screen.getByRole("button", { name: "Kirim Pengajuan Booking" });
    fireEvent.click(submitButton);

    expect(screen.getByText("Memproses...")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByText("Reservasi Anda Terdaftar")).toBeInTheDocument();
    expect(screen.getByText(/Kode Booking: PV-\d{6}/)).toBeInTheDocument();

    const newBookingButton = screen.getByRole("button", { name: "Buat Reservasi Baru" });
    fireEvent.click(newBookingButton);

    expect(screen.getByText("Reservasi / Booking Kurs")).toBeInTheDocument();
  });

  it("should toggle FAQ questions", () => {
    render(<KontakPage />);

    const firstFaqQuestion = SITE_CONFIG.faqs[0].question;
    const firstFaqAnswer = SITE_CONFIG.faqs[0].answer;

    expect(screen.queryByText(firstFaqAnswer)).not.toBeInTheDocument();

    const faqButton = screen.getByText(firstFaqQuestion);
    fireEvent.click(faqButton);

    expect(screen.getByText(firstFaqAnswer)).toBeInTheDocument();

    fireEvent.click(faqButton);
    expect(screen.queryByText(firstFaqAnswer)).not.toBeInTheDocument();
  });
});
