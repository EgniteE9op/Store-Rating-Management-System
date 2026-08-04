function RatingStars({ rating = 0 }) {

  const roundedRating = Math.round(Number(rating));

  return (
    <div className="flex items-center gap-2">

      <div className="text-yellow-400 text-xl">

        {[1, 2, 3, 4, 5].map((star) => (

          <span key={star}>
            {star <= roundedRating ? "★" : "☆"}
          </span>

        ))}

      </div>

      <span className="text-gray-600 font-semibold">
        {Number(rating).toFixed(1)} / 5
      </span>

    </div>
  );
}

export default RatingStars;