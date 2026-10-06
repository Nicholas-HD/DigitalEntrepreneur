import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("i18nextLng") || "id";

i18n
  .use(initReactI18next)
  .init({
    lng: savedLanguage,
    fallbackLng: "id",
    interpolation: { escapeValue: false },
    resources: {
      id: {
        translation: {
          login: "Masuk",
          register: "Buat Akun",
          copyright: "Hak Cipta Dilindungi",
          forbidden_title: "Akses Ditolak",
          forbidden_desc: "Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.",
          notfound_title: "Halaman Tidak Ditemukan",
          notfound_desc: "Maaf, halaman yang Anda cari tidak ada atau salah alamat.",
          back_home: "Kembali ke Beranda",
          hero: {
            welcome: "Selamat Datang di GBI Taman Mahkota",
            join_btn: "Bergabung Sekarang"
          },
          home: {
            services_title: "Pelayanan Kami",
            feat1_title: "Komunitas",
            feat1_desc: "Bertumbuh bersama dalam iman dan kasih",
            feat2_title: "Firman Tuhan",
            feat2_desc: "Pendalaman Alkitab dan pengajaran rohani",
            feat3_title: "Ibadah",
            feat3_desc: "Jadwal ibadah rutin dan event khusus",
            cta_title: "Mulai Perjalanan Iman Anda",
            cta_desc: "Daftar sekarang dan jadilah bagian dari keluarga GBI"
          },
          auth: {
            login_subtitle: "Silakan masuk ke akun GBI Taman Mahkota Anda",
            reg_subtitle: "Lengkapi data untuk bergabung sebagai jemaat digital",
            // ✅ KUNCI BARU BAHASA INDONESIA
            identifier: "Email / No. WhatsApp / Username",
            placeholder_identifier: "Masukkan Email, No. WA, atau Username",
            placeholder_name: "Nama lengkap Anda",
            full_name: "Nama Lengkap",
            remember_me: "Ingat Saya",
            forgot_password: "Lupa Sandi?",
            no_account: "Belum punya akun?",
            have_account: "Sudah punya akun?",
            back_home_link: "← Kembali ke beranda",
            password: "Kata Sandi",
            hide_password: "Sembunyikan kata sandi",
            show_password: "Tampilkan kata sandi"
          },
          reset: {
            title: "Email Terkirim!",
            subtitle: "Periksa Email Anda",
            desc: "Kami telah mengirimkan link reset password ke email Anda.",
            spam_note: "Tidak menemukan email? Cek folder spam.",
            note: "Catatan: Link hanya berlaku 24 jam.",
            back_login: "Kembali ke Login",
            resend: "Kirim Ulang Email",
            help: "Butuh bantuan?"
          },
          change: {
            title: "Ganti Password",
            subtitle: "Perbarui password akun Anda",
            current: "Password Saat Ini",
            new: "Password Baru",
            confirm: "Konfirmasi Password Baru",
            note: "Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka",
            btn: "Ganti Password"
          }
        }
      },
      en: {
        translation: {
          login: "Login",
          register: "Create Account",
          copyright: "All Rights Reserved",
          forbidden_title: "Access Denied",
          forbidden_desc: "Sorry, you don't have permission to access this page.",
          notfound_title: "Page Not Found",
          notfound_desc: "Sorry, the page you are looking for does not exist.",
          back_home: "Back to Home",
          hero: {
            welcome: "Welcome to GBI Taman Mahkota",
            join_btn: "Join Now"
          },
          home: {
            services_title: "Our Services",
            feat1_title: "Community",
            feat1_desc: "Growing together in faith and love",
            feat2_title: "Word of God",
            feat2_desc: "Bible study and spiritual teaching",
            feat3_title: "Worship",
            feat3_desc: "Regular service schedule and special events",
            cta_title: "Start Your Faith Journey",
            cta_desc: "Register now and become part of the GBI family"
          },
          auth: {
            login_subtitle: "Please sign in to your GBI Taman Mahkota account",
            reg_subtitle: "Complete your details to join as a digital member",
            // ✅ KUNCI BARU BAHASA INGGRIS
            identifier: "Email / WhatsApp Number / Username",
            placeholder_identifier: "Enter Email, WA number, or Username",
            placeholder_name: "Your full name",
            full_name: "Full Name",
            remember_me: "Remember Me",
            forgot_password: "Forgot Password?",
            no_account: "Don't have an account?",
            have_account: "Already have an account?",
            back_home_link: "← Back to home",
            password: "Password",
            hide_password: "Hide password",
            show_password: "Show password"
          },
          reset: {
            title: "Email Sent!",
            subtitle: "Check Your Email",
            desc: "We have sent a password reset link to your email address.",
            spam_note: "Can't find the email? Check your spam folder.",
            note: "Note: Link is valid for 24 hours.",
            back_login: "Back to Login",
            resend: "Resend Email",
            help: "Need help?"
          },
          change: {
            title: "Change Password",
            subtitle: "Update your account password",
            current: "Current Password",
            new: "New Password",
            confirm: "Confirm New Password",
            note: "Password must be at least 8 characters and contain uppercase, lowercase, and numbers",
            btn: "Change Password"
          }
        }
      },
      zh: {
        translation: {
          login: "登录",
          register: "创建账户",
          copyright: "版权所有",
          forbidden_title: "访问被拒绝",
          forbidden_desc: "抱歉，您没有权限访问此页面。",
          notfound_title: "页面未找到",
          notfound_desc: "抱歉，您访问的页面不存在或已被移动。",
          back_home: "回到首页",
          hero: {
            welcome: "欢迎来到 GBI Taman Mahkota",
            join_btn: "立即加入"
          },
          home: {
            services_title: "我们的服务",
            feat1_title: "社区",
            feat1_desc: "在信仰与爱中共同成长",
            feat2_title: "神的话语",
            feat2_desc: "查经与属灵教导",
            feat3_title: "崇拜",
            feat3_desc: "常规崇拜安排与特别活动",
            cta_title: "开启您的信仰之旅",
            cta_desc: "立即注册，成为 GBI 大家庭的一员"
          },
          auth: {
            login_subtitle: "请登录您的 GBI Taman Mahkota 帐户",
            reg_subtitle: "填写完整信息以加入成为数字化心意群体",
            // ✅ KUNCI BARU BAHASA MANDARIN
            identifier: "电子邮箱 / WhatsApp 号码 / 用户名",
            placeholder_identifier: "请输入电子邮箱、WA号码或用户名",
            placeholder_name: "您的全名",
            full_name: "全名",
            remember_me: "记住我",
            forgot_password: "忘记密码？",
            no_account: "还没有账号？",
            have_account: "已经有账号了？",
            back_home_link: "← 回到首页",
            password: "密码",
            hide_password: "隐藏密码",
            show_password: "显示密码"
          },
          reset: {
            title: "邮件已发送！",
            subtitle: "请检查您的邮箱",
            desc: "我们已向您的电子邮箱发送了重置密码链接。",
            spam_note: "找不到邮件？请检查垃圾邮件文件夹。",
            note: "注意：链接有效时间为 24 小时。",
            back_login: "回到登录页",
            resend: "重新发送邮件",
            help: "需要帮助？"
          },
          change: {
            title: "修改密码",
            subtitle: "更新您的账户密码",
            current: "当前密码",
            new: "新密码",
            confirm: "确认新密码",
            note: "密码必须至少 8 个字符，并包含大写字母、小写字母 and 数字",
            btn: "修改密码"
          }
        }
      }
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem("i18nextLng", lng);
  window.location.reload(); 
});

export default i18n;