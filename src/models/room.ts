type CoverImage = {
  url: string;
};

export type Image = {
  _key: string;
  url: string;
};

type Amenity = {
  _key: string;
  amenity: string;
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
