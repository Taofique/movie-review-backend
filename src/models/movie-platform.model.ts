import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db.js";

export class MoviePlatform extends Model {}

MoviePlatform.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "movie_id",
      primaryKey: true,
    },
    platformId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "platform_id",
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "MoviePlatform",
    tableName: "movie_platforms",
    timestamps: false,
    underscored: true,
    indexes: [{ unique: true, fields: ["movie_id", "platform_id"] }],
  }
);
