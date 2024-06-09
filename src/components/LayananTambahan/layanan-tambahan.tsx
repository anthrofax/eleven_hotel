import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import LayananTambahanType from "@/models/layananTambahan";
import { Rupiah } from "@/helper/formatCurrency";
import { useBookingContext } from "@/context/booking-context";
import toast from "react-hot-toast";

function LayananTambahan({
  nama,
  gambar,
  harga,
  deskripsi,
  _id,
  oneQuantityService,
}: LayananTambahanType) {
  const { bookingCart, setBookingCart } = useBookingContext();
  const layananTambahan = {
    nama,
    gambar,
    harga,
    deskripsi,
    _id,
    oneQuantityService,
  };
  const itemInCart = bookingCart.find(
    (item) => item.layananTambahan._id === _id
  );

  function handleIncItem() {
    if (itemInCart)
      if (itemInCart.qty <= 1 && !oneQuantityService) {
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
        ...cart.filter((item) => item.layananTambahan._id !== _id),
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
        return cart.filter((item) => item.layananTambahan._id !== _id);
      }

      return [
        {
          layananTambahan,
          qty: itemInCart.qty - 1,
        },
        ...cart.filter((item) => item.layananTambahan._id !== _id),
      ];
    });
  }

  return (
    <div className="bg-tertiary-light dark:bg-tertiary-dark grid grid-cols-4 p-3 rounded-xl h-80 gap-3">
      <div className="col-span-1 relative aspect-square rounded-xl overflow-hidden h-[90%] place-self-center">
        <Image src={gambar} fill alt="food image" />
      </div>

      <div className="col-span-3 flex flex-col py-3 px-5">
        <div className="flex justify-between w-full text-2xl font-bold">
          <h3>{nama}</h3>
          <h3>{Rupiah.format(harga)}</h3>
        </div>

        <div className="mt-5">{deskripsi}</div>

        <div className="flex mt-7 justify-end">
          <div className="bg-tertiary-superLight dark:bg-tertiary-light px-7 py-3 rounded-xl w-fit flex flex-col gap-1 dark:text-black">
            <div className="flex gap-3 justify-end items-center">
              <label htmlFor="">Jumlah</label>

              <div className="flex gap-3 bg-tertiary-dark dark:bg-tertiary-superLight py-1 px-2 rounded-lg items-center">
                <button
                  className="aspect-auto w-[25%] transition-all hover:bg-primary/50 p-1 rounded-full group flex items-center justify-center"
                  onClick={handleDecItem}
                >
                  <TiMinus className="group-hover:text-white transition-all text-white dark:text-black" />
                </button>
                <span className="bg-primary text-white rounded-full py-1 px-3 flex items-center justify-center">
                  {bookingCart.find((item) => item.layananTambahan._id === _id)
                    ?.qty || 0}
                </span>
                <button
                  className="aspect-auto w-[25%] transition-all hover:bg-primary/50 p-1 rounded-full group flex items-center justify-center"
                  onClick={handleIncItem}
                >
                  <FaPlus className="group-hover:text-white transition-all text-white dark:text-black" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-end mt-3">
              {` Total: ${Rupiah.format(itemInCart ? itemInCart?.layananTambahan.harga * itemInCart?.qty : 0)}`}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayananTambahan;
