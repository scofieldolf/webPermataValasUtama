import robots from "./robots";

describe("Robots Generator", () => {
  it("should generate robots configuration correctly", () => {
    const result = robots();

    // Pastikan userAgent diizinkan crawling
    expect(result.rules).toEqual({
      userAgent: "*",
      allow: "/",
    });

    // Pastikan sitemap URL menaut ke URL absolut domain yang valid
    expect(result.sitemap).toBe("https://permatavalas.co.id/sitemap.xml");
  });
});
