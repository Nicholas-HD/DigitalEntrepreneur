# ⛪ Church Management System — Backend v1

Backend service untuk sistem manajemen gereja berbasis Django + Django REST Framework.  
Dokumentasi ini menjadi referensi utama untuk setup, menjalankan server, migrasi database, dan testing API.

---

# 📚 Tech Stack

- Python
- Django
- Django REST Framework
- Docker & Docker Compose / Codebase
- PostgreSQL
- Swagger / OpenAPI
- Frontend (edit mau pakai apa)
---

# ⚙️ Prerequisites

Pastikan environment sudah memiliki:

- Docker
- Docker Compose
- Git
- GitHub Codespaces 

---

---

# 🚀 Installation Guide

# 🔹 Option 1 — Docker Setup 

## 1. Clone Repository

```bash
# note pastikan akun sudah terdaftar jadi collaborator
git clone https://github.com/howard-howard/church-project
cd backend
```

---

## 2. Pull Latest Changes

```bash
git pull origin main
```

---

## 3. Build Docker Environment

Gunakan `--no-cache` untuk memastikan dependency dibangun ulang.

```bash
docker-compose build --no-cache
```

---

## 4. Start Container

```bash
docker-compose up -d
```

Cek apakah container berjalan:

```bash
docker ps
```

---

# 🗄️ Database Migration

```bash
# jalankan ini diterminal lain tapi tetap di folder yang sama (atas backend)
# supaya ada kesamaan skema database semua collaborator, isi data bisa beda tapi strukturnya tetap sama 
docker-compose exec backend python manage.py migrate
```

---

# 👤 Create Superuser

```bash
# rubah pass, username, email sesuka hati, ini untuk masuk ke menu admin 
docker-compose exec -e DJANGO_SUPERUSER_PASSWORD=admin backend python manage.py createsuperuser --username Bobby --email admin@church.com --noinput
```

---

# 🔹 Option 2 — Local / Codespaces Setup

## 1. Pull Latest Changes

```bash
git pull origin main
```

---

## 2. Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Database Migration

```bash
python manage.py migrate
```

---

## 5. Create Superuser

```bash
python manage.py createsuperuser --username Bobby --email admin@church.com
```

Password akan diminta secara interaktif.

---

# ▶️ Running Development Server

## Docker

```bash
docker-compose up -d
```

## Local

```bash
python manage.py runserver
```

Default server:

```text
http://localhost:8000
```

---

# 📖 API Documentation

| Service | URL | Description |
|---|---|---|
| Swagger UI | `http://localhost:8000/api/docs/` | Dokumentasi utama & API testing |
| Django Admin | `http://localhost:8000/admin/` | Dashboard administrasi |

---

# 🔐 Authentication

Saat testing endpoint menggunakan Swagger:

1. Klik tombol **Authorize**
2. Masukkan token dengan format:

```text
Token <your_token>
```

Contoh:

```text
Token 123456789abcdef
```

---

# 📤 File Upload

Untuk upload gambar/foto:

- Gunakan endpoint dengan tipe:

```text
multipart/form-data
```

- Swagger akan otomatis menampilkan tombol **Choose File**

---

# ❌ Delete User Policy

Endpoint DELETE user membutuhkan body berikut:

```json
{
  "current_password": "your_password"
}
```

Hal ini digunakan sebagai validasi keamanan sebelum akun dihapus.

---

# 👨‍💻 Development Workflow

## Backend Team

- Membuat dan maintain API endpoint
- Mengupdate dokumentasi endpoint
- Menyimpan dokumentasi/output API ke shared drive [https://docs.google.com/spreadsheets/d/1EJzRegI4FqdAyZUFSr4NYeQsO1epB2SwPhFMG7TeMvg/edit?usp=sharing]

## Frontend Team

- Menggunakan endpoint dari gdrive dengan status:

```
{
  "success"
}
```

- Mengimplementasikan UI berdasarkan kontrak API

---

# 🔄 Git Workflow Rules

## Sebelum Commit

Pastikan:

- Server berjalan tanpa error
- Migration tidak bermasalah
- Endpoint sudah dites
- Tidak ada failing import/module

---

## Sebelum Push

WAJIB menjalankan:

### Docker

```bash
docker-compose up
```

### Local

```bash
python manage.py runserver
```

Jangan melakukan:

```bash
git push
```

jika project masih error.

---

# 🛠️ Common Commands

## Stop Container

```bash
docker-compose down
```

---

## Rebuild Container

```bash
docker-compose build --no-cache
```

---

## View Logs

```bash
docker-compose logs -f
```

---

## Access Django Shell

```bash
docker-compose exec backend python manage.py shell
```

---

# 🚨 Troubleshooting

## Module Not Found

Install ulang dependency:

```bash
pip install -r requirements.txt
```

---

## Migration Error

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Docker Container Not Running

Cek log:

```bash
docker-compose logs
```

---

# 🔧 Environment Variables

```env
sementara begini dulu kalau sudah deploy nanti dibuat menjadi tidak terlihat di github (semua collaborator tetap pakai versi yang sama)
```

---

# 📌 Contribution Rules

- Gunakan naming convention yang konsisten
- Pisahkan logic per app/module
- Hindari hardcoded value
- Gunakan serializer validation
- Pastikan endpoint memiliki permission yang jelas

---

# 📚 Additional Resources

- Django Documentation  
  https://docs.djangoproject.com/

- Django REST Framework  
  https://www.django-rest-framework.org/

- Swagger OpenAPI  
  https://swagger.io/specification/

- Docker Documentation  
  https://docs.docker.com/

---
