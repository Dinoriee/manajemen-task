# Aplikasi Manajemen Task

Project ini adalah aplikasi manajemen tugas sederhana yang dibuat menggunakan Next.js, TypeScript, dan Prisma ORM sebagai pra projek magang.

Cara Install & Setup

Ikuti langkah-langkah berikut untuk menjalankan project di lokal:

### 1. Clone Repository
Buka terminal dan jalankan perintah:
```bash
git clone [https://github.com/username-anda/nama-repo.git](https://github.com/username-anda/nama-repo.git)
cd nama-repo
```

### 2. Install Dependencies
Install semua library yang dibutuhkan:
```bash
npm install
# atau
yarn install
```

### 3. Setup Environment Variables (.env)
Project ini membutuhkan variabel environment untuk koneksi database.
1. Buat file baru bernama `.env` di root folder project.
2. Isi file tersebut dengan format berikut:

```env
# Ganti url di bawah sesuai dengan database lokal Anda
DATABASE_URL="mysql://root:password@localhost:3306/nama_database"
```
*(Catatan: Sesuaikan `DATABASE_URL` dengan database yang Anda pakai, apakah MySQL, PostgreSQL, atau SQLite).*

### 4. Setup Database (Prisma)
Sinkronkan skema Prisma dengan database lokal Anda:

```bash
# Generate Prisma Client (Wajib agar TypeScript mengenali tipe data)
npx prisma generate

# Push skema ke database (Membuat tabel otomatis)
npx prisma db push
```

### 5. Jalankan Server Development
Setelah database siap, jalankan server:

```bash
npm run dev
```Cara Install & Setup (Installation)

Ikuti langkah-langkah berikut untuk menjalankan project di lokal:

### 1. Clone Repository
Buka terminal dan jalankan perintah:
```bash
git clone [https://github.com/username-anda/nama-repo.git](https://github.com/username-anda/nama-repo.git)
cd nama-repo
```
