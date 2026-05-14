import React from "react";
import { Star } from "lucide-react";

function StarRating({ rating, size = 14 }) {
  return (
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(rating) ? "star-filled" : "star-empty"} />
      ))}
    </span>
  );
}

export default StarRating;
