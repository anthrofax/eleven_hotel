import { FaStar, FaStarHalf } from "react-icons/fa";

function Rating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  const fullStarElements = Array(fullStars).fill(<FaStar />);

  let halfStarElement = null;

  if (decimalPart > 0) {
    halfStarElement = <FaStarHalf />;
  }

  return (
    <>
      {fullStarElements} {halfStarElement}
    </>
  );
}

export default Rating;
