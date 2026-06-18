import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_CONFIG } from "@/config/site";

// Inisialisasi Resend secara aman (berikan mock fallback jika key tidak disetel)
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, email, telepon, pesan, recaptchaToken } = body;

    // 1. Validasi Form Fields
    if (!nama || !email || !telepon || !pesan) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Semua kolom wajib diisi (Nama, Email, Telepon, Pesan)",
          },
        },
        { status: 400 }
      );
    }

    // 2. Verifikasi Google reCAPTCHA v3
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && recaptchaToken) {
      try {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
        const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
        const recaptchaJson = (await recaptchaRes.json()) as RecaptchaVerifyResponse;

        if (!recaptchaJson.success || (recaptchaJson.score !== undefined && recaptchaJson.score < 0.5)) {
          console.warn(`reCAPTCHA v3 mendeteksi aktivitas mencurigakan. Score: ${recaptchaJson.score}`);
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "BOT_DETECTED",
                message: "Aktivitas bot terdeteksi. Silakan coba kembali.",
              },
            },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("Gagal melakukan verifikasi reCAPTCHA:", err);
        // Tetap lanjutkan transaksi jika server reCAPTCHA down agar tidak memblokir nasabah asli
      }
    } else if (!recaptchaToken) {
      console.warn("reCAPTCHA Token tidak diterima di API Route contact. Melewati verifikasi.");
    }

    // 3. Kirim Email Notifikasi via Resend
    const recipientEmail = SITE_CONFIG.contact.email;
    const emailSubject = `[Pesan Baru Web] dari ${nama} - Permata Valas Utama`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #042C53; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">Pesan Baru Hubungi Kami</h2>
        <p style="font-size: 14px; color: #555;">Telah masuk pesan baru dari website PT Permata Valas Utama dengan rincian berikut:</p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; width: 120px;">Nama Pengirim</td>
            <td style="padding: 8px 0; color: #555;">: ${nama}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Nomor Telepon</td>
            <td style="padding: 8px 0; color: #555;">: ${telepon}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Alamat Email</td>
            <td style="padding: 8px 0; color: #555;">: <a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Isi Pesan</td>
            <td style="padding: 8px 0; color: #555; line-height: 1.6;">: ${pesan.replace(/\n/g, "<br />")}</td>
          </tr>
        </table>

        <div style="margin-top: 30px; padding-top: 15px; border-t: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
          Pesan ini dikirim otomatis oleh sistem web PT Permata Valas Utama.
        </div>
      </div>
    `;

    if (resend) {
      const emailResponse = await resend.emails.send({
        from: `Sistem Web Permata Valas <noreply@permatavalas.co.id>`, // Ganti domain setelah domain live terverifikasi di Resend
        to: [recipientEmail],
        subject: emailSubject,
        html: emailHtml,
        replyTo: email,
      });

      if (emailResponse.error) {
        throw new Error(`Resend Error: ${emailResponse.error.message}`);
      }
    } else {
      console.log("=== MOCK EMAIL SENT ===");
      console.log(`To: ${recipientEmail}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`HTML Body:\n${emailHtml}`);
      console.log("========================");
    }

    return NextResponse.json(
      { success: true, message: "Pesan Anda berhasil dikirim.", timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (err) {
    console.error("Kesalahan internal di API Route contact:", err);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "CONTACT_PROCESS_FAILED",
          message: "Gagal memproses dan mengirim pesan Anda",
        },
      },
      { status: 500 }
    );
  }
}
