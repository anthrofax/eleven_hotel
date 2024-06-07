"use client";

import LoadingSpinner from "@/app/(web)/loading";
import LayananTambahan from "@/components/LayananTambahan/layanan-tambahan";
import { useBookingContext } from "@/context/booking-context";
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
    setHargaLayananTambahan,
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

    const totalBiayaLayananTambahan = bookingCart.reduce((acc, curValue) => {
      return acc + curValue.harga * curValue.qty;
    }, 0);

    setHargaLayananTambahan(totalBiayaLayananTambahan);
    setBookingStage("payment");
    router.push(`/rooms/${slug}`);
  }

  useEffect(
    function () {
      if (!dataJumlahOrangDewasa || !checkinDate || !checkoutDate) {
        router.back();
      }
    },
    [dataJumlahOrangDewasa, checkinDate, checkoutDate]
  );

  if (isLoading || !layananTambahan) return <LoadingSpinner />;

  return (
    <div className="py-3">
      <div className="w-[90%] mx-auto container bg-tertiary-superLight p-5 rounded-xl">
        <h1 className="text-center font-semibold text-2xl mb-3">
          Layanan Tambahan
        </h1>

        <hr className="border-2 border-secondary rounded-full mb-5 w-3/4 mx-auto" />

        <div className="flex flex-col gap-5">
          {layananTambahan.map((layanan: LayananTambahanType) => (
            <LayananTambahan
              deskripsi={layanan.deskripsi}
              nama={layanan.nama}
              harga={layanan.harga}
              gambar={layanan.gambar}
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
    </div>
  );
}

export default Page;
