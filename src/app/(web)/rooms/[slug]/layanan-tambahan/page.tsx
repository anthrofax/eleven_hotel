"use client";

import LoadingSpinner from "@/app/(web)/loading";
import LayananTambahan from "@/components/LayananTambahan/layanan-tambahan";
import { useBookingContext } from "@/context/booking-context";
import { getLayananTambahan } from "@/libs/apis";
import LayananTambahanType from "@/models/layananTambahan";
import { useEffect } from "react";
import useSWR from "swr";

function Page() {
  const { slug } = useBookingContext();

  const {
    data: layananTambahan,
    error,
    isLoading,
  } = useSWR("/rooms/layanan-tambahan", getLayananTambahan);

  if (isLoading || !layananTambahan) return <LoadingSpinner />;

  return (
    <div className="py-3">
      <div className="w-[90%] mx-auto container bg-tertiary-superLight py-5 px-3 rounded-xl">
        <h1 className="text-center font-semibold text-2xl mb-3">
          Layanan Tambahan
        </h1>

        <div className="flex flex-col">
          {layananTambahan.map((layanan: LayananTambahanType) => (
            <LayananTambahan
              deskripsi={layanan.deskripsi}
              nama={layanan.nama}
              harga={layanan.harga}
              gambar={layanan.gambar}
              key={layanan.nama}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
