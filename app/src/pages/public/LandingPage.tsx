import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ModeToggle } from "@/components/mode-toggle";

export default function LandingPage() {
  var document = window.document;
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <>
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
        <div className="container px-4 md:px-8 flex h-24 items-center ">
          <div className="mr-4 flex items-center justify-between w-full space-x-2 ">
            {/* desktop */}
            <div className="mr-6 flex items-center space-x-2">
              <Logo />
            </div>
            <nav className="md:items-center md:justify-start md:space-x-2 md:text-sm md:font-medium hidden md:flex">
              <Button
                variant={"link"}
                onClick={() => {
                  const fiturElement = document.getElementById("fitur");
                  if (fiturElement) {
                    fiturElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Fitur
              </Button>
              <Button
                variant={"link"}
                onClick={() => {
                  const caraKerjaElement = document.getElementById("cara-kerja");
                  if (caraKerjaElement) {
                    caraKerjaElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Cara Kerja
              </Button>
              <Button
                variant={"link"}
                onClick={() => {
                  const testimoniElement = document.getElementById("testimoni");
                  if (testimoniElement) {
                    testimoniElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Testimoni
              </Button>

              <Button variant={'default'} size={"lg"} onClick={() => {
                window.location.href = "/auth/login";
              }}>
                <span>Login</span>
              </Button>
            </nav>
            {/* mobile */}
            <nav className="flex items-center space-x-2 md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Icon icon="ci:hamburger-md" width="20" className="cursor-pointer text-black dark:text-white" />
                </SheetTrigger>
                <SheetContent side="right" className="pr-0 sm:max-w-xs">
                  <div className="px-4 pt-4 pb-2">
                    <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center space-x-2">
                      <Logo withText />
                    </NavLink>
                  </div>
                  <ScrollArea className="h-full w-full flex flex-col items-center justify-start gap-2 px-4 py-2">
                    <Button variant={"link"} className="w-fit text-left" onClick={() => {
                      const fiturElement = document.getElementById("fitur");
                      if (fiturElement) {
                        fiturElement.scrollIntoView({ behavior: "smooth" });
                      }
                      setOpen(false);
                    }}>
                      Fitur
                    </Button>
                    <Button variant={"link"} className="w-fit text-left" onClick={() => {
                      const caraKerjaElement = document.getElementById("cara-kerja");
                      if (caraKerjaElement) {
                        caraKerjaElement.scrollIntoView({ behavior: "smooth" });
                      }
                      setOpen(false);
                    }
                    }>
                      Cara Kerja
                    </Button>
                    <Button variant={"link"} className="w-fit text-left" onClick={() => {
                      const testimoniElement = document.getElementById("testimoni");
                      if (testimoniElement) {
                        testimoniElement.scrollIntoView({ behavior: "smooth" });
                      }
                      setOpen(false);
                    }}>
                      Testimoni
                    </Button>
                    <Button variant={"link"} className="w-fit text-center bg-primary text-white dark:bg-primary-foreground" onClick={() => {
                      window.location.href = "/auth/login";
                      setOpen(false);
                    }}>
                      Login
                    </Button>
                    <ModeToggle />
                  </ScrollArea>

                  {/* Toggle theme */}


                  {/* User login/logout area */}
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </header>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/10 to-white z-0"
        ></div>
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20 z-0"
        ></div>

        <div
          className="container mx-auto px-6 relative z-10 text-center animate-fade-in"
        >
          <h1
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight"
          >
            Temukan <span className="text-primary">Tempat Tersembunyi</span><br />Yang
            Menenangkan
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Hidden Gem membantumu menemukan tempat-tempat indah yang jarang
            diketahui orang. Sempurna untuk refreshing atau bekerja.
          </p>
          <button
            className="bg-primary mx-auto hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center"
            onClick={() => {
              window.location.href = "/app";
            }}
          >
            Eksplor Tempat <Icon icon="mdi:arrow-right" className="ml-2" />
          </button>
        </div>
      </section>


      <section id="fitur" className="py-20 bg-white mx-auto">
        <div className="container px-6 my-12 md:my-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Kenapa Memilih Hidden Gem?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Kami menghadirkan pengalaman berbeda dalam menemukan tempat-tempat
              istimewa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div
              className="bg-secondary p-8 rounded-xl hover:shadow-md transition-all duration-300 animate-slide-up"
            >
              <div
                className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary"
              >
                <Icon icon={'mdi:map-marker'} fontSize={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Tempat Unik</h3>
              <p className="text-gray-600">
                Lokasi tersembunyi yang tidak akan kamu temukan di platform lain
              </p>
            </div>
            <div
              className="bg-secondary p-8 rounded-xl hover:shadow-md transition-all duration-300 animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div
                className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary"
              >
                <Icon icon={'mdi:wifi'} fontSize={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Work From Cafe</h3>
              <p className="text-gray-600">
                Kafe dengan suasana tenang dan WiFi cepat untuk produktivitas
              </p>
            </div>
            <div
              className="bg-secondary p-8 rounded-xl hover:shadow-md transition-all duration-300 animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div
                className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary"
              >
                <Icon icon={'mdi:heart'} fontSize={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Personalized</h3>
              <p className="text-gray-600">
                Rekomendasi berdasarkan preferensi dan lokasimu
              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="cara-kerja" className="py-20 bg-gray-50 mx-auto">
        <div className="container px-6 my-12 md:my-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Bagaimana Cara Kerjanya?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Hanya dengan beberapa langkah sederhana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center">
              <div
                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold animate-bounce"
              >
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pilih Lokasimu</h3>
              <p className="text-gray-600">
                Masukkan lokasi atau biarkan kami mendeteksi posisimu
              </p>
            </div>


            <div className="text-center">
              <div
                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold animate-bounce"
                style={{ animationDelay: '0.2s' }}
              >
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Tentukan Kebutuhan
              </h3>
              <p className="text-gray-600">Pilih kategori yang kamu cari</p>
            </div>


            <div className="text-center">
              <div
                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold animate-bounce"
                style={{ animationDelay: '0.4s' }}
              >
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Temukan Hidden Gem
              </h3>
              <p className="text-gray-600">Dapatkan rekomendasi tempat terbaik</p>
            </div>
          </div>
        </div>
      </section>
      <section id="testimoni" className="py-20 bg-white mx-auto">
        <div className="container px-6 my-12 md:my-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Testimoni dari pengguna yang telah menemukan tempat favorit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div
              className="bg-secondary p-8 rounded-xl border border-gray-200 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Alvio Adji Januar</h4>
                  <p className="text-gray-500 text-sm">Backend Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Hidden Gem membantu saya menemukan kafe kecil yang tenang untuk
                menulis."
              </p>
              <div className="mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>


            <div
              className="bg-secondary p-8 rounded-xl border border-gray-200 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Fajar Nur Hidayat</h4>
                  <p className="text-gray-500 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Hidden Gem memberikan rekomendasi yang tepat sesuai kebutuhan
                saya."
              </p>
              <div className="mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>


            <div
              className="bg-secondary p-8 rounded-xl border border-gray-200 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/63.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Hanif Mukkorobbin</h4>
                  <p className="text-gray-500 text-sm">Mahasiswa</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Saya menemukan tempat camping yang indah dan sepi melalui Hidden
                Gem."
              </p>
              <div className="mt-4 text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Menemukan Hidden Gem?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan orang yang telah menemukan tempat favorit
            mereka
          </p>
          <button
            className="bg-white text-primary font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Eksplor Sekarang <i className="fas fa-map-marker-alt ml-2"></i>
          </button>
        </div>
      </section>


      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-start justify-between gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                >
                  <Logo width={20} height={20} withText={false} />
                </div>
                <span className="text-xl font-bold">Hidden Gem</span>
              </div>
              <p className="text-gray-400">
                Temukan tempat-tempat tersembunyi yang indah di sekitarmu
              </p>
            </div>


            <div>
              <h3 className="text-lg font-bold mb-4">Kontak</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Icon icon="mdi:gmail" className="mr-2" />
                  <span className="text-gray-400">kelompok7agile.d3pjjit@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <Icon icon="mdi:whatsapp" className="mr-2" />
                  <span className="text-gray-400">+62 564 098 8663</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2025 Hidden Gem. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}