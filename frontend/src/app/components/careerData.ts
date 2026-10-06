// Email tujuan lamaran. TODO: ganti dengan email HRD yang asli.
export const APPLY_EMAIL = "hr@contoh.com";

export type Lang = "id" | "en" | "zh";
export type L10n<T> = Record<Lang, T>;

// Ambil kode bahasa dari i18n (mis. "en-US" -> "en"), default Indonesia
export function pickLang(code?: string): Lang {
  const c = code?.split("-")[0];
  return c === "en" || c === "zh" ? c : "id";
}

// ===== Teks antarmuka halaman karir =====
const UI_TEXT = {
  listTitle: { id: "Lowongan Terbuka", en: "Open Roles", zh: "开放职位" },
  listSubtitle: {
    id: "",
    en: "",
    zh: "",
  },
  noJobs: { id: "Belum ada lowongan saat ini.", en: "No open roles right now.", zh: "目前暂无开放职位。" },
  back: { id: "Semua lowongan", en: "All roles", zh: "全部职位" },
  notFound: { id: "Lowongan tidak ditemukan.", en: "Role not found.", zh: "未找到该职位。" },
  backToList: { id: "Kembali ke semua lowongan", en: "Back to all roles", zh: "返回全部职位" },
  location: { id: "Lokasi", en: "Location", zh: "地点" },
  employmentType: { id: "Tipe Pekerjaan", en: "Employment Type", zh: "工作类型" },
  locationType: { id: "Tipe Lokasi", en: "Location Type", zh: "办公方式" },
  department: { id: "Departemen", en: "Department", zh: "部门" },
  compensation: { id: "Kompensasi", en: "Compensation", zh: "薪酬" },
  tabOverview: { id: "Ringkasan", en: "Overview", zh: "概览" },
  tabApplication: { id: "Cara Melamar", en: "Application", zh: "申请方式" },
  aboutRole: { id: "Tentang Peran", en: "About The Role", zh: "关于职位" },
  lookingFor: { id: "Yang Kami Cari", en: "What We're Looking For", zh: "我们期待的你" },
  apply: { id: "Lamar Posisi Ini", en: "Apply for this Role", zh: "申请此职位" },
  applyIntro: {
    id: "Kirim CV dan portofolio kamu lewat email. Tombol di bawah akan membuka email dengan subjek yang sudah terisi.",
    en: "Send your CV and portfolio by email. The button below opens an email with the subject already filled in.",
    zh: "请通过邮件发送你的简历和作品集。点击下方按钮会打开已填好主题的邮件。",
  },
  applySubject: { id: "Lamaran", en: "Application", zh: "应聘" },
} satisfies Record<string, L10n<string>>;

export type UIKey = keyof typeof UI_TEXT;
export const ui = (key: UIKey, lang: Lang): string => UI_TEXT[key][lang];

// ===== Istilah umum (dipakai lintas lowongan) =====
export const DEPARTMENTS: Record<string, L10n<string>> = {
  tech: { id: "Teknologi", en: "Technology", zh: "技术" },
  design: { id: "Desain", en: "Design", zh: "设计" },
  ops: { id: "Operasional", en: "Operations", zh: "运营" },
};

const TERMS: Record<string, L10n<string>> = {
  indonesia: { id: "Indonesia", en: "Indonesia", zh: "印度尼西亚" },
  fullTime: { id: "Full time", en: "Full time", zh: "全职" },
  contract: { id: "Kontrak", en: "Contract", zh: "合同制" },
  hybrid: { id: "Hybrid", en: "Hybrid", zh: "混合办公" },
  remote: { id: "Remote", en: "Remote", zh: "远程" },
  onsite: { id: "On-site", en: "On-site", zh: "现场办公" },
};
export const term = (key: string, lang: Lang): string => TERMS[key]?.[lang] ?? key;
export const deptName = (key: string, lang: Lang): string => DEPARTMENTS[key]?.[lang] ?? key;

// ===== Data lowongan =====
export type Job = {
  slug: string;
  department: string; // kunci di DEPARTMENTS
  location: string; // kunci di TERMS
  employmentType: string; // kunci di TERMS
  locationType: string; // kunci di TERMS
  compensation?: L10n<string>; // opsional, kosongkan kalau tidak mau ditampilkan
  title: L10n<string>;
  intro: L10n<string[]>;
  responsibilities: L10n<string[]>;
  requirements: L10n<string[]>;
};

// DATA CONTOH: ganti dengan lowongan yang asli.
export const JOBS: Job[] = [
  {
    slug: "frontend-developer",
    department: "tech",
    location: "indonesia",
    employmentType: "fullTime",
    locationType: "hybrid",
    title: { id: "Frontend Developer", en: "Frontend Developer", zh: "前端开发工程师" },
    intro: {
      id: [
        "Kami membangun website dan aplikasi web untuk berbagai klien, dari company profile sampai sistem internal.",
        "Kamu akan bergabung dengan tim kecil yang bekerja cepat dan peduli sama detail.",
      ],
      en: [
        "We build websites and web apps for a wide range of clients, from company profiles to internal systems.",
        "You will join a small team that moves fast and cares about the details.",
      ],
      zh: ["我们为各类客户打造网站和网页应用，从企业官网到内部系统。", "你将加入一个节奏快、注重细节的小团队。"],
    },
    responsibilities: {
      id: [
        "Membangun antarmuka web yang responsif dengan React dan TypeScript.",
        "Menerjemahkan desain dari tim UI/UX menjadi komponen yang rapi dan reusable.",
        "Berkolaborasi dengan backend developer untuk integrasi API.",
        "Menjaga performa dan aksesibilitas di setiap halaman.",
      ],
      en: [
        "Build responsive web interfaces with React and TypeScript.",
        "Turn designs from the UI/UX team into clean, reusable components.",
        "Work with backend developers on API integration.",
        "Keep every page fast and accessible.",
      ],
      zh: [
        "使用 React 和 TypeScript 构建响应式界面。",
        "将 UI/UX 团队的设计转化为整洁、可复用的组件。",
        "与后端开发人员协作完成 API 对接。",
        "保证每个页面的性能与可访问性。",
      ],
    },
    requirements: {
      id: [
        "Pengalaman dengan React dan Tailwind CSS.",
        "Paham dasar Git dan alur kerja tim.",
        "Terbiasa membaca desain dari Figma.",
        "Portofolio atau proyek pribadi jadi nilai plus.",
      ],
      en: [
        "Experience with React and Tailwind CSS.",
        "Understanding of Git basics and team workflows.",
        "Comfortable reading designs from Figma.",
        "A portfolio or personal projects is a plus.",
      ],
      zh: [
        "有 React 和 Tailwind CSS 使用经验。",
        "了解 Git 基础和团队协作流程。",
        "习惯阅读 Figma 设计稿。",
        "有作品集或个人项目者优先。",
      ],
    },
  },
  {
    slug: "backend-developer",
    department: "tech",
    location: "indonesia",
    employmentType: "fullTime",
    locationType: "hybrid",
    title: { id: "Backend Developer", en: "Backend Developer", zh: "后端开发工程师" },
    intro: {
      id: ["Kamu akan merancang dan merawat API serta database yang jadi tulang punggung produk klien kami."],
      en: ["You will design and maintain the APIs and databases that power our clients' products."],
      zh: ["你将设计并维护支撑客户产品的 API 与数据库。"],
    },
    responsibilities: {
      id: [
        "Membangun dan merawat REST API.",
        "Merancang skema database yang efisien.",
        "Menulis kode yang bersih, teruji, dan terdokumentasi.",
      ],
      en: [
        "Build and maintain REST APIs.",
        "Design efficient database schemas.",
        "Write clean, tested, well-documented code.",
      ],
      zh: ["构建并维护 REST API。", "设计高效的数据库结构。", "编写整洁、经过测试且有文档的代码。"],
    },
    requirements: {
      id: [
        "Pengalaman dengan salah satu framework backend (Django, Laravel, Node.js, dll).",
        "Paham SQL dan dasar keamanan aplikasi web.",
      ],
      en: [
        "Experience with a backend framework (Django, Laravel, Node.js, etc.).",
        "Understanding of SQL and web application security basics.",
      ],
      zh: ["有任意后端框架（Django、Laravel、Node.js 等）的使用经验。", "了解 SQL 和 Web 应用安全基础。"],
    },
  },
  {
    slug: "ui-ux-designer",
    department: "design",
    location: "indonesia",
    employmentType: "fullTime",
    locationType: "remote",
    title: { id: "UI/UX Designer", en: "UI/UX Designer", zh: "UI/UX 设计师" },
    intro: {
      id: ["Kamu akan merancang pengalaman digital yang enak dipakai dan kuat secara visual."],
      en: ["You will craft digital experiences that are a joy to use and visually strong."],
      zh: ["你将打造好用且视觉出众的数字体验。"],
    },
    responsibilities: {
      id: [
        "Membuat wireframe, prototype, dan desain akhir di Figma.",
        "Menyusun design system yang konsisten untuk tiap proyek.",
        "Bekerja langsung dengan developer sampai hasilnya rilis.",
      ],
      en: [
        "Create wireframes, prototypes, and final designs in Figma.",
        "Build consistent design systems for each project.",
        "Work directly with developers until the product ships.",
      ],
      zh: [
        "在 Figma 中制作线框图、原型和最终设计。",
        "为每个项目搭建统一的设计系统。",
        "与开发人员紧密合作直至产品上线。",
      ],
    },
    requirements: {
      id: ["Mahir Figma.", "Portofolio yang menunjukkan proses berpikir, bukan cuma tampilan akhir."],
      en: ["Strong Figma skills.", "A portfolio that shows your thinking process, not just final visuals."],
      zh: ["精通 Figma。", "作品集能体现思考过程，而不只是最终视觉。"],
    },
  },
  {
    slug: "project-coordinator",
    department: "ops",
    location: "indonesia",
    employmentType: "contract",
    locationType: "onsite",
    title: { id: "Project Coordinator", en: "Project Coordinator", zh: "项目协调员" },
    intro: {
      id: ["Kamu akan memastikan setiap proyek berjalan sesuai jadwal dan komunikasi dengan klien tetap lancar."],
      en: ["You will make sure every project stays on schedule and client communication stays smooth."],
      zh: ["你将确保每个项目按时推进，并保持与客户的沟通顺畅。"],
    },
    responsibilities: {
      id: [
        "Menyusun jadwal dan memantau progres proyek.",
        "Menjadi penghubung antara klien dan tim internal.",
        "Menyiapkan laporan progres berkala.",
      ],
      en: [
        "Plan schedules and track project progress.",
        "Act as the bridge between clients and the internal team.",
        "Prepare regular progress reports.",
      ],
      zh: ["制定进度计划并跟踪项目进展。", "担任客户与内部团队之间的桥梁。", "定期准备进度报告。"],
    },
    requirements: {
      id: ["Komunikasi yang baik dan terstruktur.", "Pengalaman dasar dengan tools manajemen proyek."],
      en: ["Clear, structured communication.", "Basic experience with project management tools."],
      zh: ["沟通清晰、条理分明。", "具备项目管理工具的基础使用经验。"],
    },
  },
];

export function groupByDepartment(jobs: Job[]) {
  const map = new Map<string, Job[]>();
  jobs.forEach((j) => {
    map.set(j.department, [...(map.get(j.department) ?? []), j]);
  });
  return Array.from(map, ([department, items]) => ({ department, items }));
}