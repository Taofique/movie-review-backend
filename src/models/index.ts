// import { User } from "./user.model.js";
// import { Movie } from "./movie.model.js";
// import { Review } from "./review.model.js";

// // Associations

// User.hasMany(Review, { foreignKey: "userId" });
// Review.belongsTo(User, { foreignKey: "userId" });

// Movie.hasMany(Review, { foreignKey: "movieId" });
// Review.belongsTo(Movie, { foreignKey: "movieId" });

// export { User, Movie, Review };

import { User } from "./user.model.js";
import { Movie } from "./movie.model.js";
import { Review } from "./review.model.js";
import { Genre } from "./genre.model.js";
import { Platform } from "./platform.model.js";
import { MovieGenre } from "./movie-genre.model.js";
import { MoviePlatform } from "./movie-platform.model.js";
import { Visit } from "./visit.model.js";

// 1) Movie ⇄ User (creator)
User.hasMany(Movie, { foreignKey: "createdBy", as: "createdMovies" });
Movie.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

// 2) Review ⇄ User/Movie
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Movie.hasMany(Review, { foreignKey: "movieId" });
Review.belongsTo(Movie, { foreignKey: "movieId" });

// 3) Movie ⇄ Genre (many-to-many)
Movie.belongsToMany(Genre, {
  through: MovieGenre,
  foreignKey: "movieId",
  otherKey: "genreId",
  as: "genres",
});
Genre.belongsToMany(Movie, {
  through: MovieGenre,
  foreignKey: "genreId",
  otherKey: "movieId",
  as: "movies",
});

// 4) Movie ⇄ Platform (many-to-many)
Movie.belongsToMany(Platform, {
  through: MoviePlatform,
  foreignKey: "movieId",
  otherKey: "platformId",
  as: "platforms",
});
Platform.belongsToMany(Movie, {
  through: MoviePlatform,
  foreignKey: "platformId",
  otherKey: "movieId",
  as: "movies",
});

// 5) Visits
User.hasMany(Visit, { foreignKey: "userId" });
Movie.hasMany(Visit, { foreignKey: "movieId" });
Visit.belongsTo(User, { foreignKey: "userId" });
Visit.belongsTo(Movie, { foreignKey: "movieId" });

export {
  User,
  Movie,
  Review,
  Genre,
  Platform,
  MovieGenre,
  MoviePlatform,
  Visit,
};
