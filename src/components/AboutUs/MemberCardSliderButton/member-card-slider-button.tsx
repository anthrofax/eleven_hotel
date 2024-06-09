import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

type Props = {
  containerStyles?: string;
  btnStyles?: string;
  iconsStyles?: string;
};

function MemberCardSliderButton({
  containerStyles,
  btnStyles,
  iconsStyles,
}: Props) {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button className={btnStyles}>
        <PiCaretLeftBold
          className={iconsStyles}
          onClick={() => swiper.slidePrev()}
        />
      </button>
      <button className={btnStyles}>
        <PiCaretRightBold
          className={iconsStyles}
          onClick={() => swiper.slideNext()}
        />
      </button>
    </div>
  );
}

export default MemberCardSliderButton;
