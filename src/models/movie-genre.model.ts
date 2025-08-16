import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db.js";

export class MovieGenre extends Model {}

MovieGenre.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "movie_id",
      primaryKey: true,
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "genre_id",
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "MovieGenre",
    tableName: "movie_genres",
    timestamps: false,
    underscored: true,
    indexes: [{ unique: true, fields: ["movie_id", "genre_id"] }],
  }
);
