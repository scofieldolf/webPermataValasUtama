import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { KursTable } from "./kurs-table";
import type { KursData } from "@/types/kurs";

// Mock Lucide icons
jest.mock("lucide-react", () => ({
  Search: () => <span data-testid="search-icon" />,
  TrendingUp: () => <span data-testid="trend-up" />,
  TrendingDown: () => <span data-testid="trend-down" />,
  Minus: () => <span data-testid="minus-icon" />,
  RefreshCw: () => <span data-testid="refresh-icon" />,
}));

const mockRates: KursData[] = [
  { kode: "USD", beli: 16250, jual: 16350, perubahan: 0.15, tren: "up" },
  { kode: "SGD", beli: 12050, jual: 12150, perubahan: -0.05, tren: "down" },
  { kode: "JPY", beli: 103.5, jual: 104.8, perubahan: 0.0, tren: "flat" },
];

describe("KursTable Component", () => {
  it("should render correctly with data, formatted numbers, and update timestamp", () => {
    render(<KursTable initialRates={mockRates} />);

    // Memastikan judul table ter-render
    expect(screen.getByText("Tabel Kurs Valas")).toBeInTheDocument();

    // Memastikan timestamp ter-render
    expect(screen.getByText(/Terakhir update:/)).toBeInTheDocument();

    // Memastikan mata uang mock ter-render
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("SGD")).toBeInTheDocument();
    expect(screen.getByText("JPY")).toBeInTheDocument();

    // Memastikan format desimal Rupiah ter-render
    expect(screen.getByText("16.250", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("16.350", { exact: false })).toBeInTheDocument();
  });

  it("should filter the table rows correctly based on search input", () => {
    render(<KursTable initialRates={mockRates} />);

    const searchInput = screen.getByPlaceholderText(/Cari mata uang/);

    // Filter "USD"
    fireEvent.change(searchInput, { target: { value: "USD" } });
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.queryByText("SGD")).not.toBeInTheDocument();

    // Reset dan filter "Yen" (berdasarkan properti nama mata uang di SITE_CONFIG)
    fireEvent.change(searchInput, { target: { value: "Yen" } });
    expect(screen.getByText("JPY")).toBeInTheDocument();
    expect(screen.queryByText("USD")).not.toBeInTheDocument();
  });

  it("should display a warning message if no currency matches the search query", () => {
    render(<KursTable initialRates={mockRates} />);

    const searchInput = screen.getByPlaceholderText(/Cari mata uang/);

    fireEvent.change(searchInput, { target: { value: "XYZ" } });
    expect(screen.getByText(/tidak ditemukan/)).toBeInTheDocument();
  });

  it("should conform to accessibility standards (caption and table header scope)", () => {
    const { container } = render(<KursTable initialRates={mockRates} />);

    // Memastikan caption tabel ada
    const caption = container.querySelector("caption");
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveClass("sr-only");

    // Memastikan th memiliki scope
    const headers = container.querySelectorAll("th");
    expect(headers.length).toBeGreaterThan(0);
    headers.forEach((th) => {
      expect(th).toHaveAttribute("scope", "col");
    });
  });
});
