import React from "react";
import { SITE_CONFIG } from "@/config/site";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Halo%20Permata%20Valas%20Utama%2C%20saya%20ingin%20bertanya%20mengenai%20kurs%20hari%20ini.`;

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Hubungi kami di WhatsApp"
      >
        {/* Custom SVG logo WhatsApp */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          className="ml-0.5"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.018-5.08-2.871-6.936C16.353 1.983 13.9 .965 12.01.965c-5.405 0-9.81 4.402-9.814 9.805a9.712 9.712 0 0 0 1.492 5.147l-.98 3.58 3.684-.966zm11.573-6.85c-.3-.15-1.771-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.033-.518-1.87-1.002-2.593-1.638-.553-.487-.944-1.066-1.127-1.38-.183-.31-.02-.477.13-.627.137-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52-.172-.007-.368-.009-.567-.009-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.115 4.526.715.31 1.273.495 1.708.633.718.228 1.37.196 1.885.12.574-.085 1.771-.725 2.021-1.425.25-.7.25-1.3 0-1.425-.075-.15-.275-.225-.575-.375z" />
        </svg>
      </a>
    </div>
  );
}
