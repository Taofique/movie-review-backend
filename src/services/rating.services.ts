import { Review } from "../models/review.model.js";
import { Movie } from "../models/movie.model.js";
import { fn, col } from "sequelize";

// define a custom type just for this query result
type RatingAggregate = {
  avg: number | null;
  count: number | null;
};

export async function recalcMovieRating(movieId: number) {
  const row = (await Review.findOne({
    attributes: [
      [fn("AVG", col("rating")), "avg"],
      [fn("COUNT", col("id")), "count"],
    ],
    where: { movieId },
    raw: true,
  })) as unknown as RatingAggregate;

  const avg = Number(row?.avg ?? 0);
  const count = Number(row?.count ?? 0);

  await Movie.update(
    { avgRating: avg, reviewCount: count },
    { where: { id: movieId } }
  );
}
