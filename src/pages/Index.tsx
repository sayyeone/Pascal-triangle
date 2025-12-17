import { useRef, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { PascalTriangleVisualizer } from "@/components/PascalTriangleVisualizer";
import { AlgorithmDemo } from "@/components/AlgorithmDemo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Triangle,
  Zap,
  Clock,
  Code2,
  ChevronDown,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const visualizationRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const [visualRows, setVisualRows] = useState(10);
  const [animationKey, setAnimationKey] = useState(0);

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      intro: introRef,
      visualization: visualizationRef,
      demo: demoRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={scrollToSection} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden section-gradient">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4" />
                Analisis Kompleksitas Algoritma
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Analisis Perbandingan{" "}
                <span className="gradient-text">Kompleksitas Algoritma</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                Algoritma Iteratif dan Rekursif dalam Menghitung Koefisien
                Binomial (Pascal's Triangle)
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => scrollToSection("demo")}
                >
                  Mulai Demo
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("intro")}
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>

            {/* Right: Animated Triangle Preview */}
            <div className="relative animate-fade-up stagger-2">
              <div className="glass-card rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Segitiga Pascal</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={3}
                      max={15}
                      value={visualRows}
                      onChange={(e) => setVisualRows(Number(e.target.value))}
                      className="w-20 h-8 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetAnimation}
                      className="h-8 w-8"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="overflow-auto max-h-[400px]">
                  <PascalTriangleVisualizer
                    key={animationKey}
                    rows={visualRows}
                    animated={true}
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg animate-float">
                Θ(n²)
              </div>
              <div className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold shadow-lg animate-float stagger-2">
                O(2ⁿ)
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection("intro")}
              className="animate-bounce"
            >
              <ChevronDown className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Pengenalan{" "}
                <span className="gradient-text">Pascal's Triangle</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Memahami struktur dan pola matematis yang mendasari segitiga
                pascal
              </p>
            </div>

            {/* Content Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6 space-y-4 animate-fade-up">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Triangle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Apa itu Segitiga Pascal?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pascal's Triangle atau Segitiga Pascal adalah sebuah pola
                  bilangan berbentuk segitiga yang sudah dikenal luas dalam
                  dunia matematika dan ilmu komputer. Pola ini pertama kali
                  dipopulerkan oleh Blaise Pascal, meskipun konsep serupa
                  sebenarnya sudah ditemukan jauh sebelumnya dalam peradaban
                  lain.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 space-y-4 animate-fade-up stagger-1">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Keunikan Segitiga Pascal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Keunikan Segitiga Pascal terletak pada kesederhanaan
                  aturannya, namun menghasilkan pola yang sangat kaya. Setiap
                  angka di dalam segitiga merupakan hasil penjumlahan dari dua
                  angka yang berada tepat di atasnya. Dari aturan sederhana ini,
                  muncul berbagai sifat matematika penting.
                </p>
              </div>
            </div>

            {/* Formula Card */}
            <div className="glass-card rounded-2xl p-8 animate-fade-up stagger-2">
              <h3 className="text-xl font-bold mb-4">
                Bagaimana Segitiga Pascal Dibentuk?
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Segitiga Pascal dibangun baris demi baris, dimulai dari baris
                  paling atas:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Baris pertama hanya berisi satu angka, yaitu 1.</li>
                  <li>
                    Baris kedua juga berisi dua angka, yang keduanya bernilai 1.
                  </li>
                  <li>
                    Mulai dari baris ketiga dan seterusnya, setiap angka di
                    tengah diperoleh dengan menjumlahkan dua angka dari baris
                    sebelumnya.
                  </li>
                </ul>

                <div className="bg-muted/50 rounded-xl p-6 mt-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Rumus umum:
                  </p>
                  <code className="text-xl font-mono font-bold text-primary">
                    C(n, k) = C(n − 1, k − 1) + C(n − 1, k)
                  </code>
                </div>
              </div>
            </div>

            {/* Approaches Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center">
                Pendekatan Perhitungan
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-primary animate-fade-up">
                  <div className="flex items-center gap-3 mb-4">
                    <Code2 className="w-6 h-6 text-primary" />
                    <h4 className="text-lg font-bold">
                      Iteratif (Bottom-Up)
                    </h4>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Pada metode ini, segitiga dibangun secara bertahap dari
                    baris paling atas hingga baris yang diinginkan. Setiap hasil
                    perhitungan disimpan dan digunakan kembali untuk membangun
                    baris berikutnya.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-mono font-bold">
                    <Clock className="w-4 h-4" />
                    Kompleksitas: Θ(n²)
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-accent animate-fade-up stagger-1">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-6 h-6 text-accent" />
                    <h4 className="text-lg font-bold">Rekursif (Top-Down)</h4>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Pada metode ini, nilai suatu elemen dihitung dengan memanggil
                    kembali fungsi untuk menghitung elemen-elemen sebelumnya,
                    sesuai dengan rumus C(n, k). Pendekatan ini lebih dekat
                    dengan definisi matematis.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-mono font-bold">
                    <Clock className="w-4 h-4" />
                    Kompleksitas: O(2ⁿ)
                  </div>
                </div>
              </div>
            </div>

            {/* Complexity Analysis */}
            <div className="glass-card rounded-2xl p-8 animate-fade-up">
              <h3 className="text-xl font-bold mb-4">
                Analisis Kompleksitas Waktu
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Pendekatan Iteratif:</strong>{" "}
                  Segitiga Pascal dibangun menggunakan dua perulangan bersarang.
                  Jika kita ingin membangun segitiga hingga baris ke-n, maka
                  jumlah operasi yang dilakukan sebanding dengan jumlah elemen
                  di dalam segitiga tersebut. Secara keseluruhan, kompleksitas
                  waktunya berada pada orde{" "}
                  <span className="font-mono font-bold text-primary">
                    Θ(n²)
                  </span>
                  .
                </p>
                <p>
                  <strong className="text-foreground">Pendekatan Rekursif:</strong>{" "}
                  Karena setiap pemanggilan fungsi akan memanggil dua fungsi
                  lainnya, maka jumlah pemanggilan fungsi akan bertambah secara
                  eksponensial. Untuk nilai n yang besar, pendekatan ini menjadi
                  sangat tidak efisien dengan kompleksitas{" "}
                  <span className="font-mono font-bold text-accent">
                    O(2ⁿ)
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visualization Section */}
      <section ref={visualizationRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Visualisasi <span className="gradient-text">Interaktif</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Amati bagaimana Segitiga Pascal dibentuk secara visual
              </p>
            </div>

            <div className="glass-card rounded-3xl p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold">Segitiga Pascal</h3>
                  <p className="text-sm text-muted-foreground">
                    Node hitam = nilai genap, Node putih = nilai ganjil
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Baris:</label>
                  <Input
                    type="number"
                    min={3}
                    max={15}
                    value={visualRows}
                    onChange={(e) => setVisualRows(Number(e.target.value))}
                    className="w-20"
                  />
                  <Button variant="outline" onClick={resetAnimation}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Ulang Animasi
                  </Button>
                </div>
              </div>

              <div className="overflow-auto max-h-[500px] flex justify-center">
                <PascalTriangleVisualizer
                  key={animationKey}
                  rows={visualRows}
                  animated={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section ref={demoRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Demo <span className="gradient-text">Perbandingan</span>{" "}
                Algoritma
              </h2>
              <p className="text-lg text-muted-foreground">
                Jalankan pengujian dan bandingkan performa algoritma iteratif
                vs rekursif
              </p>
            </div>

            <AlgorithmDemo />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Analisis Perbandingan Kompleksitas Algoritma Iteratif dan Rekursif
          </p>
          <p className="text-sm mt-1">Pascal's Triangle Calculator</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
