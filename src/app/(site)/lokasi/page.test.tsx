import React from "react";
import { render, screen } from "@testing-library/react";
import LokasiPage from "./page";
import { SITE_CONFIG } from "@/config/site";

describe("Lokasi Page", () => {
  it("should render page header and address successfully", () => {
    render(<LokasiPage />);

    expect(screen.getByText("Lokasi Cabang Kami")).toBeInTheDocument();
    expect(screen.getByText(SITE_CONFIG.contact.address)).toBeInTheDocument();
  });

  it("should render operating hours dynamically from SITE_CONFIG", () => {
    render(<LokasiPage />);

    const weekdayText = `${SITE_CONFIG.contact.operatingHours.weekdays.days}: ${SITE_CONFIG.contact.operatingHours.weekdays.time}`;
    const weekendText = `${SITE_CONFIG.contact.operatingHours.weekends.days}: ${SITE_CONFIG.contact.operatingHours.weekends.time}`;

    expect(screen.getByText(weekdayText)).toBeInTheDocument();
    expect(screen.getByText(weekendText)).toBeInTheDocument();
  });
});
