import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db.js";
import type { TMovie } from "../types/movie.js";
import type { TGenre } from "../types/genre.js";
import type { TPlatform } from "../types/platform.js";

interface MovieCreationAttributes
  extends Optional<
    TMovie,
    "id" | "avgRating" | "reviewCount" | "createdAt" | "updatedAt"
  > {}

export class Movie
  extends Model<TMovie, MovieCreationAttributes>
  implements TMovie
{
  declare id: number;
  declare title: string;
  declare releaseYear: number;
  declare description: string | null;
  declare imageUrl: string | null;
  declare publisher: string | null;
  declare createdBy: number;
  declare avgRating: number;
  declare reviewCount: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Association mixins for TypeScript
  declare setGenres: (ids: number[]) => Promise<void>;
  declare setPlatforms: (ids: number[]) => Promise<void>;

  // THESE ARE THE FIX FOR TS ERROR:
  declare genres?: TGenre[]; // optional, because may not be loaded
  declare platforms?: TPlatform[]; // optional, because may not be loaded
}

Movie.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "release_year",
    },
    description: { type: DataTypes.TEXT, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    publisher: { type: DataTypes.STRING(100), allowNull: true },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "created_by",
    },
    avgRating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      field: "avg_rating",
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "review_count",
    },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: "updated_at" },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "movies",
    timestamps: true,
    underscored: true,
  }
);
