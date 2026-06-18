import { getMockRates, fetchLatestRates } from "./kurs";

describe("Kurs Logic Module (kurs.ts)", () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // Inisialisasi mock fetch secara aman pada objek global
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  describe("getMockRates", () => {
    it("should generate a complete array of 15 currencies", () => {
      const rates = getMockRates();
      expect(rates.length).toBe(15);
      expect(rates.map((r) => r.kode)).toContain("USD");
      expect(rates.map((r) => r.kode)).toContain("SGD");
      expect(rates.map((r) => r.kode)).toContain("JPY");
    });

    it("should calculate buy rate lower than sell rate for every currency", () => {
      const rates = getMockRates();
      rates.forEach((rate) => {
        expect(rate.beli).toBeLessThan(rate.jual);
        expect(rate.beli).toBeGreaterThan(0);
        expect(rate.jual).toBeGreaterThan(0);
      });
    });

    it("should output valid trends and percentage updates", () => {
      const rates = getMockRates();
      rates.forEach((rate) => {
        expect(["up", "down", "flat"]).toContain(rate.tren);
        if (rate.tren === "up") {
          expect(rate.perubahan).toBeGreaterThan(0);
        } else if (rate.tren === "down") {
          expect(rate.perubahan).toBeLessThan(0);
        } else {
          expect(rate.perubahan).toBe(0);
        }
      });
    });
  });

  describe("fetchLatestRates", () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it("should fallback to mock rates if no API key is set in environment", async () => {
      // Pastikan API key dihapus dari env
      delete process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
      delete process.env.EXCHANGE_RATE_API_SECRET;

      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      const response = await fetchLatestRates();

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("ExchangeRate API Key tidak ditemukan")
      );
      expect(response.rates.length).toBe(15);
      expect(response.timestamp).toBeDefined();

      consoleWarnSpy.mockRestore();
    });

    it("should parse and transform external API response successfully", async () => {
      process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY = "dummy-api-key";

      const mockApiResponse = {
        result: "success",
        conversion_rates: {
          USD: 0.0000615, // 1 IDR = 0.0000615 USD -> 1 USD = ~16260 IDR
          SGD: 0.000083,  // 1 IDR = 0.000083 SGD -> 1 SGD = ~12048 IDR
          JPY: 0.0096,    // 1 IDR = 0.0096 JPY -> 100 JPY = ~10416 IDR
          KRW: 0.083,     // 1 IDR = 0.083 KRW -> 1000 KRW = ~12048 IDR
        },
      };

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockApiResponse),
      } as Response);

      const response = await fetchLatestRates();

      expect(fetchMock).toHaveBeenCalled();
      expect(response.rates.length).toBe(15);

      // Verifikasi rate USD hasil konversi
      const usdRate = response.rates.find((r) => r.kode === "USD");
      expect(usdRate).toBeDefined();
      expect(usdRate!.beli).toBeLessThan(usdRate!.jual);

      // Verifikasi perkalian JPY (per 100 unit)
      const jpyRate = response.rates.find((r) => r.kode === "JPY");
      expect(jpyRate).toBeDefined();
      expect(jpyRate!.beli).toBeGreaterThan(8000);
      expect(jpyRate!.beli).toBeLessThan(12000);
    });

    it("should fallback to mock rates when fetch API throws an error", async () => {
      process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY = "dummy-api-key";

      fetchMock.mockRejectedValue(new Error("Network connection timeout"));
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      const response = await fetchLatestRates();

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(response.rates.length).toBe(15);
      expect(response.rates.find((r) => r.kode === "USD")).toBeDefined();

      consoleErrorSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    it("should fallback to mock rates when API returns non-success result", async () => {
      process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY = "dummy-api-key";

      const mockApiFailure = {
        result: "error",
        "error-type": "invalid-key",
      };

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockApiFailure),
      } as Response);

      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      const response = await fetchLatestRates();

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(response.rates.length).toBe(15);

      consoleErrorSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });
  });

  describe("getHistoricalRates", () => {
    it("should return an array of 7 data points with valid values", () => {
      // @ts-ignore - abaikan error kompilasi sementara untuk TDD RED
      const { getHistoricalRates } = require("./kurs");
      const currentBeli = 16250;
      const currentJual = 16350;
      const history = getHistoricalRates("USD", currentBeli, currentJual);

      expect(history.length).toBe(7);
      history.forEach((point: any, idx: number) => {
        expect(point.hari).toBeDefined();
        expect(typeof point.hari).toBe("string");
        expect(point.beli).toBeGreaterThan(0);
        expect(point.jual).toBeGreaterThan(0);
        expect(point.beli).toBeLessThan(point.jual);

        // Hari ke-7 (index terakhir) harus sama dengan data saat ini
        if (idx === 6) {
          expect(point.beli).toBe(currentBeli);
          expect(point.jual).toBe(currentJual);
        }
      });
    });

    it("should handle rawBeli >= rawJual scenario by forcing buy rate lower than sell rate", () => {
      // @ts-ignore
      const { getHistoricalRates } = require("./kurs");
      const history = getHistoricalRates("USD", 18000, 17000); // currentBeli > currentJual

      history.forEach((point: any) => {
        expect(point.beli).toBeLessThan(point.jual);
      });
    });
  });
});
