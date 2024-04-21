export type Booking = {
  _id: string;
  kamarHotel: {
    _id: string;
    nama: string;
    slug: { current: string };
    harga: number;
  };
  tanggalCheckin: string;
  tanggalCheckout: string;
  masaInap: number;
  jumlahOrangDewasa: number;
  jumlahAnak: number;
  hargaTotal: number;
  diskon: number;
};
