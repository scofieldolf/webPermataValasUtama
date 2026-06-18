import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { KalkCalc } from "./kalk-calc";

// Mock Lucide icons
jest.mock("lucide-react", () => ({
  Calculator: () => <span data-testid="calc-icon" />,
  ArrowLeftRight: () => <span data-testid="arrow-icon" />,
  HelpCircle: () => <span data-testid="help-icon" />,
}));

describe("KalkCalc Component", () => {
  it("should render default form state with USD and Sell direction", () => {
    render(<KalkCalc />);

    expect(screen.getByText("Kalkulator Valas")).toBeInTheDocument();
    expect(screen.getByLabelText("Nominal Valas")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1000")).toBeInTheDocument();

    // Default rate referensi USD beli harus ter-render (1 USD = Rp 16.250,00)
    expect(screen.getByText(/1 USD = Rp 16.250,00/)).toBeInTheDocument();

    // Estimasi Rupiah yang diterima nasabah (1000 * 16250 = Rp 16.250.000)
    expect(screen.getByText((content) => content.replace(/ /g, " ") === "Rp 16.250.000")).toBeInTheDocument();
  });

  it("should calculate correctly when transaction type changes to Jual", () => {
    render(<KalkCalc />);

    const buyButton = screen.getByText("Saya Mau Beli Valas");
    fireEvent.click(buyButton);

    // Rate Jual USD adalah Rp 16.350,00
    expect(screen.getByText(/1 USD = Rp 16.350,00/)).toBeInTheDocument();

    // Estimasi Rupiah yang dibayarkan nasabah (1000 * 16350 = Rp 16.350.000)
    expect(screen.getByText((content) => content.replace(/ /g, " ") === "Rp 16.350.000")).toBeInTheDocument();
  });

  it("should calculate correctly when custom nominal is typed", () => {
    render(<KalkCalc />);

    const amountInput = screen.getByLabelText("Nominal Valas");
    fireEvent.change(amountInput, { target: { value: "500" } });

    // Estimasi Rupiah yang diterima nasabah (500 * 16250 = Rp 8.125.000)
    expect(screen.getByText((content) => content.replace(/ /g, " ") === "Rp 8.125.000")).toBeInTheDocument();
  });

  it("should handle unit scaling calculation for Yen (JPY - quoted per 100)", () => {
    render(<KalkCalc />);

    const currencySelect = screen.getByLabelText("Nominal Valas").previousSibling as HTMLSelectElement;
    fireEvent.change(currencySelect, { target: { value: "JPY" } });

    // Rate Beli JPY adalah Rp 103,50 per 100 Yen
    expect(screen.getByText(/1 JPY = Rp 103,50/)).toBeInTheDocument();

    // Estimasi Rupiah untuk 1000 JPY -> (1000 * 103.5) / 100 = Rp 1.035
    expect(screen.getByText("Rp 1.035")).toBeInTheDocument();
  });

  it("should handle unit scaling calculation for Won (KRW - quoted per 1000)", () => {
    render(<KalkCalc />);

    const currencySelect = screen.getByLabelText("Nominal Valas").previousSibling as HTMLSelectElement;
    fireEvent.change(currencySelect, { target: { value: "KRW" } });

    // Rate Beli KRW adalah Rp 11,80 per 1000 Won
    expect(screen.getByText(/1 KRW = Rp 11,80/)).toBeInTheDocument();

    // Estimasi Rupiah untuk 1000 KRW -> (1000 * 11.8) / 1000 = Rp 11,8
    expect(screen.getByText((content) => content.replace(/ /g, " ") === "Rp 11,8")).toBeInTheDocument();
  });

  it("should build dynamic WhatsApp CTA links correctly", () => {
    render(<KalkCalc />);

    const amountInput = screen.getByLabelText("Nominal Valas");
    fireEvent.change(amountInput, { target: { value: "2500" } });

    const waLink = screen.getByText("Kunci Kurs via WhatsApp") as HTMLAnchorElement;
    expect(waLink.href).toContain("wa.me");
    expect(waLink.href).toContain("2500");
    expect(waLink.href).toContain("USD");
  });
});
