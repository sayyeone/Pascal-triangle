## Tentang Proyek

Pascal's Triangle Explorer adalah aplikasi web edukatif yang membantu memahami konsep Segitiga Pascal secara visual dan interaktif. Aplikasi ini menampilkan dua pendekatan algoritma berbeda (iteratif dan rekursif) lengkap dengan visualisasi proses perhitungan dan analisis kompleksitas waktu.

Cocok digunakan sebagai media pembelajaran untuk mata kuliah Algoritma dan Struktur Data, Matematika Diskrit, atau Pemrograman Lanjut.

## Fitur Utama

**Dua Metode Perhitungan** - Metode iteratif (bottom-up) yang efisien untuk nilai besar, dan metode rekursif (top-down) yang lebih intuitif mengikuti definisi matematis.

**Visualisasi Interaktif** - Tampilan setengah segitiga dengan sifat simetri, animasi smooth, dan interface responsif yang mudah digunakan.

**Analisis Algoritma** - Penjelasan kompleksitas waktu dengan visualisasi step-by-step proses perhitungan untuk pemahaman lebih dalam.

## Teknologi

Dibangun dengan **Vite**, **TypeScript**, **React**, **Tailwind CSS**, dan **shadcn/ui** untuk performa optimal dan developer experience yang lancar.

## Memulai

### Instalasi Lokal

```bash
# Clone repository
git clone https://github.com/sayyeone/pascal-triangle-explorer.git
cd pascal-triangle-explorer

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build Production

```bash
npm run build
```

## Algoritma

### Metode Iteratif
Membangun segitiga baris per baris dari atas ke bawah. Setiap elemen adalah penjumlahan dua elemen di atasnya. Kompleksitas waktu O(n²), efisien dan stabil untuk nilai besar.

### Metode Rekursif
Menggunakan definisi koefisien binomial C(n,k) = C(n-1,k-1) + C(n-1,k). Lebih intuitif namun kompleksitas waktu O(2ⁿ) membuat performa lebih rendah untuk nilai besar.

## Deployment

**Via Lovable**: Buka project → **Share** → **Publish**

**Custom Domain**: Project → Settings → Domains → Connect Domain. [Dokumentasi](https://docs.lovable.dev/features/custom-domain)

**Alternatif**: Deploy ke Vercel, Netlify, atau GitHub Pages

## Kontribusi

Kontribusi sangat diterima! Fork repository, buat perubahan, dan submit Pull Request. Untuk bug atau ide fitur baru, buat issue di GitHub.

## Lisensi

Dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT)

---

<p align="center">
  made with ❤️ by sayyeone<br>
</p>
