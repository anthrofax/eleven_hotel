import Image from "next/image";

function Description() {
  return (
    <section className="bg-white  min-h-[500px] flex flex-col items-center justify-center text-center py-10 px-5">
      <h1 className="text-center font-medium text-2xl sm:text-3xl tracking-widest">
        Tentang Perusahaan Kami
      </h1>
      <p className="mt-5 text-sm sm:text-base w-[80%] leading-8 text-justify sm:text-center mx-auto">
      Kami adalah Eleven Hotel, destinasi sempurna untuk kenyamanan dan kemewahan. Terletak di jantung kota, hotel kami menawarkan akomodasi yang elegan dan pelayanan kelas satu untuk memenuhi segala kebutuhan Anda. Kami berkomitmen untuk memberikan pengalaman menginap yang tak terlupakan dengan fasilitas lengkap, mulai dari kamar yang nyaman dan berdesain modern, hingga restoran mewah yang menyajikan kuliner terbaik. Baik Anda berkunjung untuk bisnis maupun liburan, tim kami yang profesional siap melayani Anda dengan kehangatan dan dedikasi. Nikmati momen istimewa bersama kami dan rasakan keindahan pelayanan yang dirancang khusus untuk Anda di Eleven Hotel. Bergabunglah dengan kami dan temukan pengalaman menginap yang luar biasa!
      </p>

      <ul className="py-16 px-10 flex flex-col sm:flex-row gap-10">
        <li className="">
          <div className="w-full aspect-video max-w-sm relative">
            <Image
              src="/images/about-us/who-are-we.png"
              alt="who is eleven hotel?"
              fill={true}
            />
          </div>
          <h3 className="text-lg font-medium tracking-widest mb-2 mt-3 text-left">
            SIAPA KAMI
          </h3>
          <p className="leading-7 text-xs sm:text-sm sm:leading-8 text-left">
            Kami adalah tim yang berdedikasi di Eleven Hotel, terdiri dari individu yang berbakat dan bersemangat dalam menciptakan pengalaman menginap yang istimewa bagi setiap tamu. Bergabunglah dengan kami dan temukan keajaiban di balik layanan kami di Eleven Hotel.
          </p>
        </li>
        <li className="">
          <div className="w-full aspect-video max-w-sm relative">
            <Image
              src="/images/about-us/our-mission.png"
              alt="Our Mission Image"
              fill={true}
            />
          </div>
          <h3 className="text-lg font-medium tracking-widest mb-2 mt-3 text-right sm:text-left">
            MISI KAMI
          </h3>
          <p className="text-right sm:text-left leading-7 text-xs sm:text-sm sm:leading-8">
            Misi kami adalah memastikan setiap tamu merasakan pengalaman menginap yang tak terlupakan melalui layanan kelas satu dan fasilitas berkualitas tinggi. Kami berkomitmen untuk menciptakan suasana yang nyaman dan mewah, sehingga setiap kunjungan menjadi momen istimewa.
          </p>
        </li>
        <li className="">
          <div className="w-full aspect-video max-w-sm relative">
            <Image
              src="/images/about-us/our-vision.png"
              alt="Out Vision IMage"
              fill={true}
            />
          </div>
          <h3 className="text-lg font-medium tracking-widest mb-2 mt-3 text-center sm:text-left">
            VISI KAMI
          </h3>
          <p className="text-center sm:text-left leading-7 text-xs sm:text-sm sm:leading-8">
            Visi kami adalah menciptakan lingkungan yang hangat dan ramah di Eleven Hotel, di mana setiap tamu merasa diterima dan dihargai. Kami bertekad untuk menjadi destinasi utama yang menawarkan pengalaman menginap yang istimewa dan tak terlupakan.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default Description;
