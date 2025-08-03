import { User } from "./user.model.js";
import { Movie } from "./movie.model.js";
import { Review } from "./review.model.js";

// Associations

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Movie.hasMany(Review, { foreignKey: "movieId" });
Review.belongsTo(Movie, { foreignKey: "movieId" });

export { User, Movie, Review };
