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

    console.log(masaInap)

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
          toast.error("Payment Failed");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An error occured");
    }
  }

  if (error) throw new Error("Cannot fetch data");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (!room) return <LoadingSpinner />;

  return (
    <div>
      <HotelPhotoGallery photos={room.gambar} />

      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-2xl">
                {room.nama} ({room.dimensi})
              </h2>
              <div className="flex my-11">
                {room.fasilitas.map((amenity) => (
                  <div
                    key={amenity._key}
                    className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center"
                  >
                    <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                    <p className="text-xs md:text-base pt-3">
                      {amenity.fasilitas}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Description</h2>
                <p>{room.deskripsi}</p>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Offered Amenities</h2>
                <div className="grid grid-cols-2">
                  {room.fasilitas.map((fas) => (
                    <div
                      key={fas._key}
                      className="flex items-center md:my-0 my-1"
                    >
                      <i className={`fa-solid ${fas.icon}`}></i>
                      <p className="text-xs md:text-base ml-2">
                        {fas.fasilitas}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Safety And Hygiene</h2>
                <div className="grid grid-cols-2">
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <LiaFireExtinguisherSolid />
                    <p className="ml-2 md:text-base text-xs">
                      Fire Extinguishers
                    </p>
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

              <div className="shadow dark:shadow-white rounded-lg p-6">
                <div className="items-center mb-4">
                  <p className="md:text-lg font-semibold">Customer Reviews</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Reviews */}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
