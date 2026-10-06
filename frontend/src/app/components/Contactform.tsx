// Letakkan di: frontend/src/app/components/ContactForm.tsx
import React, { useState } from "react";

// Form kontak (ukuran asli Nectar)
export default function ContactForm() {
  const [hasWebsite, setHasWebsite] = useState<"sudah" | "belum" | "">("");

  const labelCls = "block text-[#262626] mb-[9px] leading-[14px]";
  const labelStyle = { fontSize: "12px" } as const;
  const inputCls =
    "w-full h-[40px] rounded-full bg-white border border-[#D4D4D4] px-4 text-[#262626] placeholder:text-[#A3A3A3] outline-none focus:border-[#6B6B6B] focus:bg-white transition-colors";
  const inputStyle = { fontSize: "14px" } as const;
  const req = <span className="text-red-500">*</span>;

  return (
    <form
      className="w-full"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: sambungkan ke endpoint backend kamu
      }}
    >
      <div className="space-y-[21px]">
        <div>
          <label className={labelCls} style={labelStyle}>Nama Lengkap :{req}</label>
          <input type="text" required className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Email :{req}</label>
          <input type="email" required placeholder="alamat e-mail bisnis" className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Nomor handphone (WhatsApp) :{req}</label>
          <input type="tel" required placeholder="081......." className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Nama Perusahaan/Bisnis :{req}</label>
          <input type="text" required placeholder="PT. ....." className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Jabatan :</label>
          <input type="text" placeholder="Owner, Direktur, Manager, IT, dll...." className={inputCls} style={inputStyle} />
        </div>

        <div>
          <label className={labelCls} style={labelStyle}>
            Sudah Ada Website<span className="text-red-500">*</span>
          </label>
          <div className="pl-[5px] space-y-[7px]">
            {(["sudah", "belum"] as const).map((v) => (
              <label
                key={v}
                className="flex items-center gap-[6px] h-5 cursor-pointer text-[#262626]"
                style={{ fontSize: "12.5px", lineHeight: "1" }}
              >
                <input
                  type="radio"
                  name="website"
                  checked={hasWebsite === v}
                  onChange={() => setHasWebsite(v)}
                  style={{ width: "13px", height: "13px", margin: 0, accentColor: "#2B2B2B" }}
                />
                {v === "sudah" ? "Sudah" : "Belum"}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={`${labelCls} whitespace-nowrap`} style={labelStyle}>
            Alamat Website : (Jika sudah memiliki Website)
          </label>
          <input type="text" placeholder="www......." className={inputCls} style={inputStyle} />
        </div>

        <div>
          <label className={labelCls} style={labelStyle}>Apa Masalah Websitemu? :{req}</label>
          <textarea
            required
            placeholder="Kami membutuhkan bantuan dalam..."
            className="w-full h-[66px] rounded-[18px] bg-white border border-[#D4D4D4] px-4 py-2 text-[#262626] placeholder:text-[#A3A3A3] outline-none focus:border-[#6B6B6B] focus:bg-white transition-colors resize-y overflow-hidden"
            style={{ fontSize: "14px", lineHeight: "1.4" }}
          />
        </div>

        {/* Placeholder reCAPTCHA (ganti dengan widget asli + site key kamu) */}
        <div className="flex h-[60px] w-[257px] max-w-full shadow-[0_0_5px_rgba(0,0,0,0.35)] rounded-[2px] overflow-hidden">
          <div
            className="bg-[#1A73E8] text-white font-bold flex items-center flex-1 px-4"
            style={{ fontSize: "12px" }}
          >
            protected by reCAPTCHA
          </div>
          <div className="w-[71px] bg-[#F9F9F9] flex items-center justify-center">
            <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 8a24 24 0 0 1 20.8 12L44 25l18 4V8l-6 6.5A32 32 0 0 0 32 0z" fill="#1C3AA9" />
              <path d="M12 20.2A24 24 0 0 1 32 8V0A32 32 0 0 0 4.2 16z" fill="#4285F4" />
              <path d="M52.8 44A24 24 0 0 1 32 56v8a32 32 0 0 0 27.8-16z" fill="#ABABAB" />
              <path d="M12 44a24 24 0 0 1-4-12H0a32 32 0 0 0 4.2 16z" fill="#B8B8B8" />
            </svg>
          </div>
        </div>

        <div className="pt-[14px]">
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-gradient-to-br from-[#7C7C7C] to-[#3F3F3F] hover:from-[#6E6E6E] hover:to-[#303030] shadow-[0_3px_8px_rgba(0,0,0,0.18)] transition-colors text-white font-bold w-[114px] h-[38px]"
            style={{ fontSize: "12.5px" }}
          >
            HUBUNGI
          </button>
        </div>
      </div>
    </form>
  );
}