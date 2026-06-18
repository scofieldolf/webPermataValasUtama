import { cn, formatRupiah, formatNumber } from "./utils";

describe("Utility Functions (utils.ts)", () => {
  describe("cn (tailwind merger utility)", () => {
    it("should merge basic class names", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("should ignore conditional falsy classes", () => {
      expect(cn("class1", false && "class2", null, undefined, "class3")).toBe("class1 class3");
    });

    it("should merge and resolve tailwind class conflicts correctly", () => {
      // px-2 and px-4 conflict, tailwindMerge should resolve to the last one (px-4)
      expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    });
  });

  describe("formatRupiah", () => {
    it("should format numbers to Indonesian Rupiah", () => {
      const result = formatRupiah(15000);
      // Cocokkan format Rupiah (Intl.NumberFormat id-ID)
      // Karakter spasi non-breaking space (u00a0) kadang digunakan oleh browser
      expect(result.replace(/ /g, " ")).toMatch(/Rp\s?15\.000/);
    });

    it("should format numbers with decimals if provided", () => {
      const result = formatRupiah(15000.75);
      expect(result.replace(/ /g, " ")).toMatch(/Rp\s?15\.000,75/);
    });
  });

  describe("formatNumber", () => {
    it("should format number to Indonesian locale standard with 2 decimal places", () => {
      expect(formatNumber(15000)).toBe("15.000,00");
    });

    it("should round decimal numbers to 2 decimal places", () => {
      expect(formatNumber(15000.754)).toBe("15.000,75");
      expect(formatNumber(15000.756)).toBe("15.000,76");
    });
  });
});
