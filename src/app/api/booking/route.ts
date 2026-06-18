import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_CONFIG } from "@/config/site";

// Inisialisasi Resend secara aman
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  "error-codes"?: string[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, telepon, valas, nominal, tipe, recaptchaToken } = body;

    // 1. Validasi Kolom Form
    if (!nama || !telepon || !valas || !nominal || !tipe) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Semua kolom wajib diisi (Nama, Telepon, Valas, Nominal, Tipe)",
          },
        },
        { status: 400 }
      );
    }

    // 2. Verifikasi Google reCAPTCHA v3 (server-side verification)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && recaptchaToken) {
      try {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
        const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
        const recaptchaJson = (await recaptchaRes.json()) as RecaptchaVerifyResponse;

        if (!recaptchaJson.success || (recaptchaJson.score !== undefined && recaptchaJson.score < 0.5)) {
          console.warn(`reCAPTCHA v3 mendeteksi aktivitas booking mencurigakan. Score: ${recaptchaJson.score}`);
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "BOT_DETECTED",
                message: "Aktivitas mencurigakan terdeteksi. Silakan coba kembali.",
              },
            },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("Gagal verifikasi reCAPTCHA:", err);
      }
    }

    // Buat nomor kode booking acak yang unik (PV-XXXXXX)
    const bookingCode = `PV-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // 3. Kirim Email Notifikasi Booking via Resend
    const recipientEmail = SITE_CONFIG.contact.email;
    const emailSubject = `[Booking Kurs Baru] ${bookingCode} - ${nama}`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #042C53; border-bottom: 2px solid #B8860B; padding-bottom: 10px; margin-bottom: 20px;">
          Reservasi / Booking Kurs Baru
        </h2>
        <div style="background-color: #F8F6F0; border-left: 4px solid #B8860B; padding: 12px 16px; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
          <span style="font-size: 11px; text-transform: uppercase; color: #777; font-weight: bold;">Kode Booking Resmi</span>
          <div style="font-size: 20px; font-weight: bold; color: #042C53; font-family: monospace;">${bookingCode}</div>
        </div>

        <p style="font-size: 14px; color: #555;">Berikut adalah detail reservasi kurs yang diajukan oleh calon nasabah:</p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; width: 140px; border-bottom: 1px solid #f5f5f5;">Nama Nasabah</td>
            <td style="padding: 8px 0; color: #555; border-bottom: 1px solid #f5f5f5;">: ${nama}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f5f5f5;">Nomor WhatsApp / Telp</td>
            <td style="padding: 8px 0; color: #555; border-bottom: 1px solid #f5f5f5;">
              : <a href="https://wa.me/${telepon.replace(/[^0-9]/g, "")}" style="color: #25D366; font-weight: bold; text-decoration: none;">
                ${telepon} (Chat WA)
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f5f5f5;">Tipe Transaksi</td>
            <td style="padding: 8px 0; font-weight: bold; color: ${tipe === "beli" ? "#0F6E56" : "#A32D2D"}; border-bottom: 1px solid #f5f5f5;">
              : ${tipe === "beli" ? "JUAL VALAS (Nasabah Jual ke Gerai)" : "BELI VALAS (Nasabah Beli dari Gerai)"}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f5f5f5;">Nominal Valas</td>
            <td style="padding: 8px 0; color: #555; font-weight: bold; font-family: monospace; border-bottom: 1px solid #f5f5f5;">
              : ${new Intl.NumberFormat("id-ID").format(parseFloat(nominal))} ${valas}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f5f5f5;">Waktu Pengajuan</td>
            <td style="padding: 8px 0; color: #555; border-bottom: 1px solid #f5f5f5;">: ${timestamp} WIB</td>
          </tr>
        </table>

        <div style="margin-top: 25px; padding: 12px; background-color: #f9f9f9; border-radius: 8px; font-size: 12px; color: #666; leading-line: 1.6;">
          <strong>Tindakan Teller Gerai:</strong>
          <ol style="margin: 6px 0 0 16px; padding: 0;">
            <li>Periksa ketersediaan stok fisik mata uang kertas asing (${valas}) di brankas gerai.</li>
            <li>Hubungi nasabah via WhatsApp atau Telepon ke nomor <span style="font-weight: bold; color: #042C53;">${telepon}</span> untuk konfirmasi jam kedatangan.</li>
            <li>Konfirmasi rate final dan kunci kurs di sistem teller lokal.</li>
          </ol>
        </div>

        <div style="margin-top: 30px; padding-top: 15px; border-t: 1px solid #eee; font-size: 11px; color: #999; text-align: center;">
          Email otomatis dari portal reservasi PT Permata Valas Utama.
        </div>
      </div>
    `;

    if (resend) {
      const emailResponse = await resend.emails.send({
        from: `Portal Booking Permata Valas <noreply@permatavalas.co.id>`,
        to: [recipientEmail],
        subject: emailSubject,
        html: emailHtml,
      });

      if (emailResponse.error) {
        throw new Error(`Resend Error: ${emailResponse.error.message}`);
      }
    } else {
      console.log(`=== MOCK BOOKING EMAIL SENT [${bookingCode}] ===`);
      console.log(`To: ${recipientEmail}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`HTML Body:\n${emailHtml}`);
      console.log("==================================================");
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          bookingCode,
          timestamp: new Date().toISOString(),
        },
        message: "Pengajuan booking berhasil dikirim.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Kesalahan internal di API Route booking:", err);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "BOOKING_PROCESS_FAILED",
          message: "Gagal memproses pengajuan booking Anda",
        },
      },
      { status: 500 }
    );
  }
}
