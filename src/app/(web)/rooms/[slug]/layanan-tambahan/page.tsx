"use client";

import LoadingSpinner from "@/app/(web)/loading";
import LayananTambahan from "@/components/LayananTambahan/layanan-tambahan";
import LayananTambahanMobileSlider from "@/components/LayananTambahanMobileSlider/layanan-tambahan-mobile-slider";
import { useBookingContext } from "@/context/booking-context";
import { Rupiah } from "@/helper/formatCurrency";
import { getLayananTambahan } from "@/libs/apis";
import LayananTambahanType from "@/models/layananTambahan";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

function Page() {
  const { slug } = useParams();
  const {
    setBookingStage,
    bookingCart,
    dataJumlahOrangDewasa,
    checkinDate,
    checkoutDate,
  } = useBookingContext();
  const router = useRouter();

  const {
    data: layananTambahan,
    error,
    isLoading,
  } = useSWR("/rooms/layanan-tambahan", getLayananTambahan);

  function handleNextStep() {
    if (bookingCart.length === 0)
      return toast.error(
        "Anda belum menambahkan layanan apapun. Silahkan tambahkan terlebih dahulu"
      );

    setBookingStage("payment");
    router.push(`/rooms/${slug}`);
  }

  useEffect(
    function () {
      if (!dataJumlahOrangDewasa || !checkinDate || !checkoutDate) {
        // toast.error('Mohon untuk mengisi data booking terlebih dahulu')
        router.push(`/rooms/${slug}`);
      }
    },
    [dataJumlahOrangDewasa, checkinDate, checkoutDate, router, slug]
  );

  if (isLoading || !layananTambahan) return <LoadingSpinner />;

  return (
    <div className="py-3 relative">
      <div className="w-[90%] mx-auto container bg-tertiary-superLight dark:bg-tertiary-light py-5 md:p-5 rounded-xl">
        <h1 className="text-center font-semibold text-2xl mb-3">
          Layanan Tambahan
        </h1>

        <hr className="border-2 border-secondary rounded-full mb-5 w-3/4 mx-auto" />

        <LayananTambahanMobileSlider daftarLayananTambahan={layananTambahan} />

        <div className="min-[1280px]:flex flex-col gap-5 hidden">
          {layananTambahan.map((layanan: LayananTambahanType) => (
            <LayananTambahan
              deskripsi={layanan.deskripsi}
              nama={layanan.nama}
              harga={layanan.harga}
              gambar={layanan.gambar}
              oneQuantityService={layanan.oneQuantityService}
              key={layanan._id}
              _id={layanan._id}
            />
          ))}
        </div>

        <hr className="border-2 border-secondary rounded-full m-8 w-[90%] mx-auto" />

        <div className="mt-3 flex justify-end pr-3">
          <button className="btn-primary" onClick={handleNextStep}>
            Next Step!
          </button>
        </div>
      </div>

      {bookingCart.length > 0 && (
        <div className="fixed bg-tertiary-superLight dark:bg-tertiary-light text-black left-0 right-0 bottom-0 h-16 rounded-t-xl flex justify-between items-center px-5 text-base md:text-lg z-20 gap-3">
          <h3>Total Item: {bookingCart.length} layanan</h3>

          <h3 className="font-semibold text-end">
            Total Harga:{" "}
            {Rupiah.format(
              bookingCart.reduce((acc, curValue) => {
                return acc + curValue.layananTambahan.harga * curValue.qty;
              }, 0)
            )}
          </h3>
        </div>
      )}
    </div>
  );
}

export default Page;
