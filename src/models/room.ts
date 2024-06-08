import { CartItemType } from "./cartItem";

type CoverImage = {
  url: string;
};

export type Image = {
  _key: string;
  url: string;
};

type Amenity = {
  _key: string;
  fasilitas: string;
  icon: string;
};

type Slug = {
  _type: string;
  current: string;
};

export type Room = {
  _id: string;
  coverGambar: CoverImage;
  deskripsi: string;
  dimensi: string;
  diskon: number;
  gambar: Image[];
  isBooked: boolean;
  isFeatured: boolean;
  nama: string;
  jumlahKasur: number;
  fasilitas: Amenity[];
  harga: number;
  slug: Slug;
  catatanPelanggan: string;
  type: string;
};

export type CreateBookingDto = {
  user: string;
  kamarHotel: string;
  tanggalCheckin: string;
  tanggalCheckout: string;
  masaInap: number;
  jumlahOrangDewasa: number;
  jumlahAnak: number;
  hargaTotal: number;
  diskon: number;
  bookingCart: CartItemType[]
};