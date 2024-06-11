import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import LayananTambahan from "@/models/layananTambahan";
import { useState } from "react";
import Image from "next/image";
import { Rupiah } from "@/helper/formatCurrency";
import LayananTambahanSliderButton from "../LayananTambahanSliderButton/layanan-tambahan-slider-button";
import { useBookingContext } from "@/context/booking-context";
import toast from "react-hot-toast";
import "swiper/css";

function LayananTambahanMobileSlider({
  daftarLayananTambahan,
}: {
  daftarLayananTambahan: LayananTambahan[];
}) {
  const [curLayananTambahan, setCurLayananTambahan] = useState(
    daftarLayananTambahan[0]
  );
  const { bookingCart, setBookingCart } = useBookingContext();

  const layananTambahan = {
    nama: curLayananTambahan.nama,
    gambar: curLayananTambahan.gambar,
    harga: curLayananTambahan.harga,
    deskripsi: curLayananTambahan.deskripsi,
    _id: curLayananTambahan._id,
    oneQuantityService: curLayananTambahan.oneQuantityService,
  };
  const itemInCart = bookingCart.find(
    (item) => item.layananTambahan._id === curLayananTambahan._id
  );

  function handleIncItem() {
    if (itemInCart)
      if (itemInCart.qty <= 1 && !curLayananTambahan.oneQuantityService) {
        return toast.error("Layanan ini hanya dapat diisi dengan 1 kuantitas");
      }

    setBookingCart((cart) => {
      if (!itemInCart) {
        return [
          ...cart,
          {
            layananTambahan,
            qty: 1,
          },
        ];
      }

      return [
        ...cart.filter(
          (item) => item.layananTambahan._id !== curLayananTambahan._id
        ),
        {
          layananTambahan,
          qty: itemInCart.qty + 1,
        },
      ];
    });
  }

  function handleDecItem() {
    if (!itemInCart)
      return toast.error("Anda belum menambahkan item ini ke keranjang");

    setBookingCart((cart) => {
      if (itemInCart.qty === 1) {
        return cart.filter(
          (item) => item.layananTambahan._id !== curLayananTambahan._id
        );
      }

      return [
        {
          layananTambahan,
          qty: itemInCart.qty - 1,
        },
        ...cart.filter(
          (item) => item.layananTambahan._id !== curLayananTambahan._id
        ),
      ];
    });
  }

  function handleSlideChange(swiper: any) {
    // Mendapatkan slide index saat ini
    const currentIndex = swiper.activeIndex;
    console.log(currentIndex);

    // Memperbarui state layanan tambahan berdasarkan slide index saat ini
    setCurLayananTambahan(daftarLayananTambahan[currentIndex]);
  }

  return (
    <div className="w-full container mx-auto min-[1280px]:hidden flex justify-center items-center relative">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        className="xl:h-[520px] mb-12 static w-[90%] max-w-[28rem]"
        onSlideChange={handleSlideChange}
      >
        {daftarLayananTambahan.map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="h-fit  flex justify-center items-center transition-all cursor-pointer">
                <div className="w-[85%] max-w-[17rem] bg-tertiary-light dark:bg-tertiary-dark h-full text-black dark:text-white rounded-lg pb-3">
                  <div className="relative bg-white h-[16rem] overflow-hidden rounded-t-lg">
                    <Image
                      src={curLayananTambahan.gambar}
                      fill
                      alt="Gambar Layanan Tambahan"
                      className="scale-110"
                    />
                  </div>

                  <div className="text-center flex flex-col items-center justify-center gap-3 mt-3">
                    <h1 className="text-xl font-semibold">
                      {curLayananTambahan.nama}
                    </h1>
                    <p className="w-[80%] text-justify">
                      {curLayananTambahan.deskripsi.slice(0, 100)}{" "}
                      {curLayananTambahan.deskripsi.length > 100 && "..."}
                    </p>
                  </div>

                  <div className="w-full grid grid-cols-4 mt-5 px-3 items-center">
                    <h3 className="text-base font-medium col-span-3">
                      Harga: {Rupiah.format(curLayananTambahan.harga)}
                    </h3>

                    <div className="col-span-1">
                      <div className="flex gap-1 bg-tertiary-dark dark:bg-tertiary-light py-1 px-0.5 rounded-lg items-center justify-center">
                        <button
                          className="aspect-auto w-[25%] transition-all hover:bg-primary/50 rounded-full group flex items-center justify-center"
                          onClick={handleDecItem}
                        >
                          <TiMinus className="group-hover:text-white transition-all text-white dark:text-black text-sm" />
                        </button>
                        <span className="bg-primary text-white rounded-full p-1 flex items-center justify-center">
                          {bookingCart.find(
                            (item) =>
                              item.layananTambahan._id ===
                              curLayananTambahan._id
                          )?.qty || 0}
                        </span>
                        <button
                          className="aspect-auto w-[25%] transition-all hover:bg-primary/50 rounded-full group flex items-center justify-center"
                          onClick={handleIncItem}
                        >
                          <FaPlus className="group-hover:text-white transition-all text-white dark:text-black text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <hr className="border-2 border-secondary rounded-full mb-5 w-[90%] mx-auto my-3" />

                  <h3 className="mx-auto text-center text-xl font-semibold">
                    Total/Item:{" "}
                    {Rupiah.format(
                      itemInCart
                        ? itemInCart?.layananTambahan.harga * itemInCart?.qty
                        : 0
                    )}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <LayananTambahanSliderButton
          containerStyles="flex gap-2 absolute right-1/2 translate-x-1/2 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 justify-between xl:w-max xl:justify-none w-[95%] min-[460px]:w-[90%] px-1/2 "
          btnStyles="bg-tertiary-light dark:bg-tertiary-dark hover:bg-primary text-primary dark:text-white hover:text-white rounded-full text-[22px] w-[44px] aspect-square flex justify-center items-center transition-all opacity-50 hover:opacity-100"
        />
      </Swiper>
    </div>
  );
}

export default LayananTambahanMobileSlider;
