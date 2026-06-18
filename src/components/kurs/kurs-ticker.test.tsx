import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { KursTicker } from "./kurs-ticker";
import type { KursData } from "@/types/kurs";

// Mock Lucide icons agar rendering berjalan cepat tanpa bergantung pada SVG internal
jest.mock("lucide-react", () => ({
  ArrowUpRight: () => <span data-testid="arrow-up" />,
  ArrowDownRight: () => <span data-testid="arrow-down" />,
  Minus: () => <span data-testid="minus" />,
}));

const mockRates: KursData[] = [
  { kode: "USD", beli: 16250, jual: 16350, perubahan: 0.15, tren: "up" },
  { kode: "SGD", beli: 12050, jual: 12150, perubahan: -0.05, tren: "down" },
  { kode: "EUR", beli: 17450, jual: 17600, perubahan: 0.0, tren: "flat" },
];

describe("KursTicker Component", () => {
  it("should render currency codes and formatted exchange rates", () => {
    render(<KursTicker rates={mockRates} />);

    // Memastikan kode mata uang tampil
    expect(screen.getAllByText("USD").length).toBeGreaterThan(0);
    expect(screen.getAllByText("SGD").length).toBeGreaterThan(0);
    expect(screen.getAllByText("EUR").length).toBeGreaterThan(0);

    // Memastikan nilai kurs beli & jual ter-render dengan format Rupiah yang benar
    expect(screen.getAllByText("16.250").length).toBeGreaterThan(0);
    expect(screen.getAllByText("16.350").length).toBeGreaterThan(0);
  });

  it("should display correct trend icons based on rate change direction", () => {
    const { container } = render(<KursTicker rates={mockRates} />);

    // Tren UP: USD (+0.15%) -> harus merender arrow-up
    expect(container.querySelector('[data-testid="arrow-up"]')).toBeInTheDocument();

    // Tren DOWN: SGD (-0.05%) -> harus merender arrow-down
    expect(container.querySelector('[data-testid="arrow-down"]')).toBeInTheDocument();

    // Tren FLAT: EUR (0.00%) -> harus merender minus icon
    expect(container.querySelector('[data-testid="minus"]')).toBeInTheDocument();
  });
});
