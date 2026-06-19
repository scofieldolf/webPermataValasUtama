import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { SITE_CONFIG } from "@/config/site";

describe("Home Page (Beranda /)", () => {
  it("should render page headings and links successfully", () => {
    render(<HomePage />);

    expect(
      screen.getByText("Tukar Valuta Asing Aman &")
    ).toBeInTheDocument();
    expect(screen.getByText("Kurs Terbaik & Kompetitif")).toBeInTheDocument();
    expect(screen.getByText("Keunggulan Permata Valas Utama")).toBeInTheDocument();
  });

  it("should render Schema.org JSON-LD structured data for FinancialService/LocalBusiness", () => {
    const { container } = render(<HomePage />);

    const jsonLdScript = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLdScript).toBeInTheDocument();

    const jsonLdData = JSON.parse(jsonLdScript?.textContent || "{}");
    expect(jsonLdData["@context"]).toBe("https://schema.org");
    expect(jsonLdData["@type"]).toContain("FinancialService");
    expect(jsonLdData["@type"]).toContain("LocalBusiness");
    expect(jsonLdData.name).toBe("PT Permata Valas Utama");
    expect(jsonLdData.address.addressLocality).toBe("Jakarta Selatan");
    expect(jsonLdData.telephone).toBe(SITE_CONFIG.contact.phone);
    expect(jsonLdData.award).toContain("KP: 12/345/KEP/DIR/2026"); // BI License validation
  });
});
