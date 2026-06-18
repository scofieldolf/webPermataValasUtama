import React from "react";
import { render, screen } from "@testing-library/react";

// Mock sub-komponen
jest.mock("@/components/kurs/kurs-table", () => ({
  KursTable: () => <div data-testid="mock-kurs-table">Tabel Kurs Mock</div>,
}));

jest.mock("@/components/kurs/kalk-calc", () => ({
  KalkCalc: () => <div data-testid="mock-kalk-calc">Kalkulator Mock</div>,
}));

jest.mock("@/components/kurs/kurs-trend-chart", () => ({
  KursTrendChart: () => <div data-testid="mock-kurs-trend-chart">Grafik Tren Mock</div>,
}));

import KursPage, { metadata } from "./page";

describe("Kurs Page (/kurs)", () => {
  it("should render page header, table, calculator, and trend chart", () => {
    render(<KursPage />);

    expect(screen.getByText("Kurs Valuta Asing Hari Ini")).toBeInTheDocument();
    expect(screen.getByTestId("mock-kurs-table")).toBeInTheDocument();
    expect(screen.getByTestId("mock-kalk-calc")).toBeInTheDocument();
    expect(screen.getByTestId("mock-kurs-trend-chart")).toBeInTheDocument();
  });

  it("should export correct metadata for SEO", () => {
    expect(metadata.title).toBe("Kurs Hari Ini");
    expect(metadata.description).toContain("Daftar kurs jual dan beli valuta asing");
  });
});
