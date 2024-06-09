import { CreateBookingDto, Room } from "@/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import axios from "axios";
import { Booking } from "@/models/booking";
import { CreateReviewDto, Ulasan, UpdateReviewDto } from "@/models/ulasan";
import LayananTambahan from "@/models/layananTambahan";

export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
    { cache: "no-cache" }
  );

  return result;
}

export async function getRooms() {
  const result = await sanityClient.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    { cache: "no-cache" }
  );

  return result;
}

export async function getRoom(slug: string) {
  const result = await sanityClient.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: "no-cache" }
  );

  return result;
}

export async function createBooking({
  jumlahOrangDewasa,
  tanggalCheckin,
  tanggalCheckout,
  jumlahAnak,
  diskon,
  kamarHotel,
  masaInap,
  hargaTotal,
  user,
  keranjangLayananTambahan,
}: CreateBookingDto) {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "booking",
          user: { _type: "reference", _ref: user },
          kamarHotel: { _type: "reference", _ref: kamarHotel },
          tanggalCheckin,
          tanggalCheckout,
          masaInap,
          jumlahOrangDewasa,
          jumlahAnak,
          hargaTotal,
          diskon,
          keranjangLayananTambahan,
        },
      },
    ],
  };

  console.log(mutation);

  const { data } = await axios.post(
    `https://5x9vlanc.api.sanity.io/v2021-10-21/data/mutate/production`,
    mutation,
    {
      headers: {
        Authorization: `Bearer sksNCn7NhvvhhNm9vpvaMeg3g4yipp20J9vLVQwvzp7eQdkqINsNdOPrHx77AMLsvOgD4wTTORlXoO8tSu0ENeCvMYtGGBprceJl8qgkd9gIZF7m1WRHeacPKCqj914cSy4II523T3jggL1rAbThkEoHqTk59PcusQRW7mHMBpff4vCFfbZV`,
      },
    }
  );

  console.log("Create data =>" + data);
  console.log(process.env.SANITY_STUDIO_TOKENS);

  return data;
}

export const updateHotelRoom = async (hotelRoomId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: hotelRoomId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://5x9vlanc.api.sanity.io/v2021-10-21/data/mutate/production`,
    mutation,
    {
      headers: {
        Authorization: `Bearer sksNCn7NhvvhhNm9vpvaMeg3g4yipp20J9vLVQwvzp7eQdkqINsNdOPrHx77AMLsvOgD4wTTORlXoO8tSu0ENeCvMYtGGBprceJl8qgkd9gIZF7m1WRHeacPKCqj914cSy4II523T3jggL1rAbThkEoHqTk59PcusQRW7mHMBpff4vCFfbZV`,
      },
    }
  );

  console.log("Update data =>" + data);

  return data;
};

export async function getUserBookings(userId: string) {
  const result = await sanityClient.fetch<Booking[]>(
    queries.getUserBookingsQuery,
    {
      userId,
    },
    { cache: "no-cache" }
  );

  return result;
}

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: "no-cache" }
  );

  return result;
}

export async function cekApakahUlasanTelahAdaSebelumnya(
  userId: string,
  hotelRoomId: string
): Promise<null | { _id: string }> {
  const query = `*[_type == 'ulasan' && user._ref == $userId && kamarHotel._ref == $hotelRoomId][0] {
    _id
  }`;

  const params = {
    userId,
    hotelRoomId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
}

export const updateReview = async ({
  reviewId,
  reviewText,
  ratingPengguna,
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            teks: reviewText,
            ratingPengguna,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKENS}`,
      },
    }
  );

  return data;
};

export const createReview = async ({
  idKamar,
  reviewText,
  userId,
  ratingPengguna,
}: CreateReviewDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "ulasan",
          user: {
            _type: "reference",
            _ref: userId,
          },
          kamarHotel: {
            _type: "reference",
            _ref: idKamar,
          },
          ratingPengguna,
          teks: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKENS}`,
      },
    }
  );

  return data;
};

export async function getRoomReviews(roomId: string) {
  const result = await sanityClient.fetch<Ulasan[]>(
    queries.getRoomReviewsQuery,
    {
      roomId,
    },
    { cache: "no-store" }
  );

  return result;
}

export async function getLayananTambahan() {
  const result = await sanityClient.fetch<LayananTambahan[]>(
    queries.getLayananTambahan,
    {},
    { cache: "no-cache" }
  );

  return result;
}
