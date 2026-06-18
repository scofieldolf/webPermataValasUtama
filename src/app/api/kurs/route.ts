import { NextResponse } from "next/server";
import { fetchLatestRates } from "@/lib/kurs";

// Jadikan API Route ini di-revalidate setiap 5 menit (300 detik)
export const revalidate = 300;

export async function GET() {
  try {
    const data = await fetchLatestRates();
    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=59",
        },
      }
    );
  } catch (err) {
    console.error("Kesalahan internal di API kurs Route:", err);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "KURS_FETCH_FAILED",
          message: "Gagal menarik data kurs terupdate",
        },
      },
      { status: 500 }
    );
  }
}
