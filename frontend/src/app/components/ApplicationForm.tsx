import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, Send, CheckCircle2, X } from "lucide-react";
import type { Lang, L10n } from "./careerData";

// TODO: isi dengan URL endpoint backend yang menerima multipart/form-data.
// Kalau kosong, pengiriman hanya disimulasikan (tidak ada data yang benar-benar terkirim).
const APPLY_ENDPOINT = "";
const MAX_MB = 5;
const EASE = [0.16, 1, 0.3, 1] as const;

const T = {
  name: { id: "Nama", en: "Name", zh: "姓名" },
  email: { id: "Email", en: "Email", zh: "邮箱" },
  cv: { id: "CV", en: "CV", zh: "简历" },
  upload: { id: "Unggah File", en: "Upload File", zh: "上传文件" },
  drag: { id: "atau tarik dan lepas di sini", en: "or drag and drop here", zh: "或拖放文件到此处" },
  phone: { id: "Nomor Telepon", en: "Phone Number", zh: "电话号码" },
  location: { id: "Lokasi Kerja yang Diinginkan", en: "Desired Working Location", zh: "期望工作地点" },
  linkedin: { id: "Profil LinkedIn", en: "LinkedIn Profile", zh: "LinkedIn 主页" },
  start: { id: "Kapan kamu bisa mulai?", en: "When can you start?", zh: "最早入职时间" },
  authorized: {
    id: "Apakah kamu berhak bekerja di negara lokasi yang kamu inginkan?",
    en: "Are you authorised to work in the country where you would like to be located?",
    zh: "你是否有权在期望工作的国家工作？",
  },
  yes: { id: "Ya", en: "Yes", zh: "是" },
  no: { id: "Tidak", en: "No", zh: "否" },
  access: {
    id: "Kami berkomitmen menghadirkan proses wawancara yang inklusif. Kalau ada penyesuaian yang kamu butuhkan, beri tahu kami!",
    en: "We're committed to an inclusive interview experience. If there's anything we can do to support you, please let us know!",
    zh: "我们致力于提供包容的面试体验。如需任何协助，请告诉我们！",
  },
  extra: {
    id: "Ada hal lain yang ingin kamu sampaikan, misalnya motivasi melamar? (opsional)",
    en: "Please share anything else you want us to know, such as your motivation to apply (optional)",
    zh: "还有什么想告诉我们的吗，例如申请动机？（选填）",
  },
  type: { id: "Ketik di sini...", en: "Type here...", zh: "请输入…" },
  submit: { id: "Kirim Lamaran", en: "Submit Application", zh: "提交申请" },
  sending: { id: "Mengirim...", en: "Sending...", zh: "提交中…" },
  required: { id: "Wajib diisi", en: "Required", zh: "必填" },
  badEmail: { id: "Format email tidak valid", en: "Invalid email address", zh: "邮箱格式不正确" },
  cvRequired: { id: "Unggah CV kamu", en: "Please upload your CV", zh: "请上传简历" },
  cvType: { id: "Format harus PDF, DOC, atau DOCX", en: "PDF, DOC or DOCX only", zh: "仅支持 PDF、DOC、DOCX" },
  cvSize: { id: `Ukuran maksimal ${MAX_MB} MB`, en: `Max ${MAX_MB} MB`, zh: `最大 ${MAX_MB} MB` },
  failed: { id: "Gagal mengirim. Coba lagi.", en: "Failed to send. Please try again.", zh: "提交失败，请重试。" },
  doneTitle: { id: "Lamaran terkirim", en: "Application sent", zh: "申请已提交" },
  doneBody: {
    id: "Terima kasih sudah melamar. Kami akan menghubungi kamu kalau profilmu cocok.",
    en: "Thanks for applying. We'll get in touch if your profile is a good fit.",
    zh: "感谢你的申请。如果你的背景合适，我们会与你联系。",
  },
} satisfies Record<string, L10n<string>>;

const INPUT =
  "w-full rounded-lg border border-[#3a1d13]/15 bg-white px-4 py-3 text-[15px] text-[#3a1d13] placeholder:text-[#3a1d13]/35 focus:outline-none focus:border-[#3a1d13]/50 transition-colors";

type Values = {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  startDate: string;
  authorized: "" | "yes" | "no";
  access: string;
  extra: string;
};

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  startDate: "",
  authorized: "",
  access: "",
  extra: "",
};

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[14px] font-medium mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}

export default function ApplicationForm({
  lang,
  jobSlug,
  jobTitle,
}: {
  lang: Lang;
  jobSlug: string;
  jobTitle: string;
}) {
  const t = (k: keyof typeof T) => T[k][lang];
  const [v, setV] = useState<Values>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  function pickFile(f?: File | null) {
    if (!f) return;
    const okType = /\.(pdf|docx?)$/i.test(f.name);
    if (!okType) return setErrors((p) => ({ ...p, cv: t("cvType") }));
    if (f.size > MAX_MB * 1024 * 1024) return setErrors((p) => ({ ...p, cv: t("cvSize") }));
    setFile(f);
    setErrors((p) => ({ ...p, cv: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    (["name", "phone", "location", "linkedin"] as const).forEach((k) => {
      if (!v[k].trim()) e[k] = t("required");
    });
    if (!v.email.trim()) e.email = t("required");
    else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = t("badEmail");
    if (!file) e.cv = t("cvRequired");
    if (!v.authorized) e.authorized = t("required");
    return e;
  }

  async function onSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    try {
      if (APPLY_ENDPOINT) {
        const fd = new FormData();
        Object.entries(v).forEach(([k, val]) => fd.append(k, val));
        fd.append("cv", file as File);
        fd.append("jobSlug", jobSlug);
        fd.append("jobTitle", jobTitle);
        const res = await fetch(APPLY_ENDPOINT, { method: "POST", body: fd });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        console.warn("APPLY_ENDPOINT belum diisi: pengiriman hanya simulasi.");
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="mt-10 flex flex-col items-center text-center gap-3 py-10"
      >
        <CheckCircle2 className="w-10 h-10 text-[#3a1d13]/70" />
        <h3 className="text-xl font-light">{t("doneTitle")}</h3>
        <p className="text-[15px] text-[#3a1d13]/60 max-w-sm">{t("doneBody")}</p>
      </motion.div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <Field label={t("name")} required error={errors.name}>
        <input className={INPUT} placeholder={t("type")} value={v.name} onChange={set("name")} />
      </Field>

      <Field label={t("email")} required error={errors.email}>
        <input
          type="email"
          className={INPUT}
          placeholder="hello@example.com"
          value={v.email}
          onChange={set("email")}
        />
      </Field>

      <Field label={t("cv")} required error={errors.cv}>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pickFile(e.dataTransfer.files?.[0]);
          }}
          className={`rounded-lg border border-dashed px-4 py-8 flex flex-wrap items-center justify-center gap-3 text-[14px] transition-colors ${
            dragging ? "border-[#3a1d13] bg-[#3a1d13]/[0.04]" : "border-[#3a1d13]/20"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => pickFile(e.target.files?.[0])}
          />
          {file ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#3a1d13]/[0.06] pl-4 pr-2 py-1.5">
              <Paperclip className="w-4 h-4" />
              <span className="max-w-[220px] truncate">{file.name}</span>
              <button
                type="button"
                aria-label="Remove file"
                onClick={() => setFile(null)}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#3a1d13]/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ) : (
            <>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-[#3a1d13]/30 px-4 py-2 text-[#3a1d13]/70 hover:bg-[#3a1d13] hover:border-[#3a1d13] hover:text-white transition-colors cursor-pointer"
              >
                <Paperclip className="w-4 h-4" />
                {t("upload")}
              </button>
              <span className="text-[#3a1d13]/50">{t("drag")}</span>
            </>
          )}
        </div>
      </Field>

      <Field label={t("phone")} required error={errors.phone}>
        <input
          type="tel"
          className={INPUT}
          placeholder="+62 812-3456-7890"
          value={v.phone}
          onChange={set("phone")}
        />
      </Field>

      <Field label={t("location")} required error={errors.location}>
        <input className={INPUT} placeholder={t("type")} value={v.location} onChange={set("location")} />
      </Field>

      <Field label={t("linkedin")} required error={errors.linkedin}>
        <input
          type="url"
          className={INPUT}
          placeholder="https://linkedin.com/in/..."
          value={v.linkedin}
          onChange={set("linkedin")}
        />
      </Field>

      <Field label={t("start")}>
        <input type="date" className={INPUT} value={v.startDate} onChange={set("startDate")} />
      </Field>

      <Field label={t("authorized")} required error={errors.authorized}>
        <div className="inline-flex rounded-lg border border-[#3a1d13]/15 overflow-hidden">
          {(["yes", "no"] as const).map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setV((p) => ({ ...p, authorized: o }))}
              className={`px-7 py-2.5 text-[14px] cursor-pointer transition-colors ${
                v.authorized === o ? "bg-[#3a1d13] text-white" : "hover:bg-[#3a1d13]/[0.05]"
              } ${o === "yes" ? "border-r border-[#3a1d13]/15" : ""}`}
            >
              {t(o)}
            </button>
          ))}
        </div>
      </Field>

      <Field label={t("access")}>
        <textarea rows={4} className={INPUT} placeholder={t("type")} value={v.access} onChange={set("access")} />
      </Field>

      <Field label={t("extra")}>
        <textarea rows={4} className={INPUT} placeholder={t("type")} value={v.extra} onChange={set("extra")} />
      </Field>

      {status === "error" && <p className="text-[13px] text-red-500">{t("failed")}</p>}

      <button
        type="button"
        onClick={onSubmit}
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#9c8579] hover:bg-[#8a7266] disabled:opacity-70 text-white text-[15px] font-medium py-4 transition-colors cursor-pointer"
      >
        {status === "sending" ? t("sending") : t("submit")}
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}