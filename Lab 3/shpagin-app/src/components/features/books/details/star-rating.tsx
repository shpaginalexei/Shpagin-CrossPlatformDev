import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  totalReviews?: number;
  showNumber?: boolean;
}

export function StarRating({
  rating,
  totalReviews,
  showNumber = true,
}: StarRatingProps) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className={`size-6 text-yellow-500`} />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt key={i} className={`size-6 text-yellow-500`} />,
        );
      } else {
        stars.push(
          <FaRegStar key={i} className={`text-muted-foreground size-6`} />,
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">{renderStars()}</div>
      {showNumber && (
        <span className="text-muted-foreground text-sm">
          {rating.toFixed(2)}
          {totalReviews !== undefined && ` (${totalReviews})`}
        </span>
      )}
    </div>
  );
}
