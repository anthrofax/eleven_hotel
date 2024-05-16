import Image from "next/image";

function Description() {
  return (
    <section className="bg-white  min-h-[500px] flex flex-col items-center justify-center text-center py-10 px-5">
      <h1 className="text-center font-medium text-2xl sm:text-3xl tracking-widest">
        Tentang Perusahaan Kami
      </h1>
      <p className="mt-5 text-sm sm:text-base w-[80%] leading-8 text-justify sm:text-center mx-auto">
        Kami adalah Volunteeria, sebuah platform yang dipenuhi dengan semangat
        untuk memberikan perubahan positif. Misi kami adalah menghubungkan
        orang-orang yang ingin memberikan kembali dengan proyek-proyek yang
        membutuhkan bantuan mereka. Kami percaya bahwa setiap tindakan baik,
        sekecil apapun, memiliki kekuatan untuk merubah dunia. Dengan
        Volunteeria, Anda dapat menjelajahi berbagai kesempatan sukarela yang
        cocok dengan minat dan keterampilan Anda. Kami menyediakan alat yang
        memudahkan Anda untuk terlibat dalam aksi sosial, membangun komunitas
        yang lebih baik, dan memberikan dampak positif dalam hidup orang lain.
        Bersama-sama, mari kita menjadi bagian dari perubahan yang kita
        inginkan. Bergabunglah dengan kami di Volunteeria dan mari berbuat baik
        bersama-sama!
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
            Kami adalah komunitas sukarelawan yang bersemangat dan peduli.
            Dengan beragam latar belakang dan keahlian, kami bersatu dalam tekad
            untuk memberikan dampak positif dalam masyarakat. Bergabunglah
            dengan kami dan kenali lebih dekat siapa kami di Volunteeria.
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
            Misi kami adalah menginspirasi dan memfasilitasi aksi sukarela yang
            bermakna. Kami berkomitmen untuk menghubungkan para sukarelawan
            dengan proyek-proyek yang sesuai dengan minat dan keterampilan
            mereka, sehingga bersama-sama kita dapat mencapai perubahan positif.
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
            Visi kami adalah menciptakan dunia yang dipenuhi dengan aksi-aksi
            sukarela yang membawa perubahan positif. Kami bermimpi tentang
            masyarakat yang saling peduli dan berbagi, di mana setiap tindakan
            baik memiliki dampak jauh lebih besar.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default Description;
