"use client";

import HotelPhotoGallery from "@/components/HotelPhotoGallery/hotel-photo-gallery";
import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import BookRoomCTA from "@/components/BookRoomCTA/book-room-cta";
import { useState } from "react";
import toast from "react-hot-toast";
import { getStripe } from "@/libs/stripe";
import axios from "axios";
import RoomReview from "@/components/RoomReview/room-review";

function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [jumlahOrangDewasa, setJumlahOrangDewasa] = useState<number>(1);
  const [jumlahAnak, setJumlahAnak] = useState<number>(0);

  const {
    data: room,
    error,
    isLoading,
  } = useSWR("/api/room", getRoom.bind(null, slug));

  function hitungMasaInap(): number {
    if (!checkinDate || !checkoutDate) return 0;

    const selisihWaktu = checkoutDate.getTime() - checkinDate.getTime();
    const masaInap = Math.ceil(selisihWaktu / (24 * 60 * 60 * 1000));

    return masaInap;
  }

  function hitungMinimumTanggalCheckout() {
    if (!checkinDate) return null;

    const nextDay = new Date(checkinDate);
    nextDay.setDate(nextDay.getDate() + 1);

    return nextDay;
  }

  async function bookingKamar() {
    if (!checkinDate || !checkoutDate)
      return toast.error(
        "Mohon isi tanggal Check-in & Check-out terlebih dahulu"
      );

    if (checkinDate > checkoutDate)
      return toast.error("Mohon isi tanggal Check-in yang valid");

    const masaInap = hitungMasaInap();

    const slugKamar = room?.slug.current;

    // Implement Stripe
    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        jumlahOrangDewasa,
        jumlahAnak,
        masaInap,
        slugKamar,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Pembayaran gagal");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Terdapat kesalahan.");
    }
  }

  if (error) throw new Error("Terdapat kesalahan saat fetch data");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Data kamar tidak ditemukan");

  if (!room) return <LoadingSpinner />;

  return (
    <div className="px-3 md:px-10 flex flex-col gap-10">
      <HotelPhotoGallery photos={room.gambar} className="md:hidden" />

      <div className="gap-5 hidden md:flex">
        <HotelPhotoGallery photos={room.gambar} />

        <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow w-[40%]">
          <BookRoomCTA
            diskon={room.diskon}
            harga={room.harga}
            catatanPelanggan={room.catatanPelanggan}
            checkinDate={checkinDate}
            setCheckinDate={setCheckinDate}
            checkoutDate={checkoutDate}
            setCheckoutDate={setCheckoutDate}
            hitungMinimumTanggalCheckout={hitungMinimumTanggalCheckout}
            jumlahOrangDewasa={jumlahOrangDewasa}
            jumlahAnak={jumlahAnak}
            setAdults={setJumlahOrangDewasa}
            setNoOfChildren={setJumlahAnak}
            isBooked={room.isBooked}
            bookingKamar={bookingKamar}
            hitungMasaInap={hitungMasaInap}
            nama={room.nama}
          />
        </div>
      </div>

      <div>
        <h3 className="text-secondary text-3xl font-semibold mb-5">
          {room.nama}
        </h3>

        <p>{room.deskripsi}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center w-3/4">
        <div className="mb-11">
          <h2 className="font-semibold text-2xl mb-2 text-secondary">
            Fasilitas yang Ditawarkan
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {room.fasilitas.map((fas) => (
              <div key={fas._key} className="flex items-center md:my-0 my-1">
                <i className={`fa-solid ${fas.icon}`}></i>
                <p className="text-xs md:text-base ml-2">{fas.fasilitas}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-11">
          <h2 className="font-semibold text-2xl mb-2 text-secondary">
            Keamanan & Higienis
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center my-1 md:my-0">
              <MdOutlineCleaningServices />
              <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
            </div>
            <div className="flex items-center my-1 md:my-0">
              <LiaFireExtinguisherSolid />
              <p className="ml-2 md:text-base text-xs">Fire Extinguishers</p>
            </div>
            <div className="flex items-center my-1 md:my-0">
              <AiOutlineMedicineBox />
              <p className="ml-2 md:text-base text-xs">
                Disinfections and Sterilizations
              </p>
            </div>
            <div className="flex items-center my-1 md:my-0">
              <GiSmokeBomb />
              <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow dark:shadow-white rounded-lg p-6">
        <div className="items-center mb-4">
          <p className="md:text-2xl font-semibold text-secondary">
            Ulasan Pelaggan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RoomReview idKamar={room._id} />
        </div>
      </div>

      <div className="md:hidden md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white top-10 h-fit overflow-hidden">
        <BookRoomCTA
          diskon={room.diskon}
          harga={room.harga}
          catatanPelanggan={room.catatanPelanggan}
          checkinDate={checkinDate}
          setCheckinDate={setCheckinDate}
          checkoutDate={checkoutDate}
          setCheckoutDate={setCheckoutDate}
          hitungMinimumTanggalCheckout={hitungMinimumTanggalCheckout}
          jumlahOrangDewasa={jumlahOrangDewasa}
          jumlahAnak={jumlahAnak}
          setAdults={setJumlahOrangDewasa}
          setNoOfChildren={setJumlahAnak}
          isBooked={room.isBooked}
          bookingKamar={bookingKamar}
          hitungMasaInap={hitungMasaInap}
          nama={room.nama}
        />
      </div>
    </div>
  );
}

export default Page;
