// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";
// import { sequelize } from "../utils/db.js";

// export class Movie extends Model<
//   InferAttributes<Movie>,
//   InferCreationAttributes<Movie>
// > {
//   declare id: CreationOptional<number>;
//   declare title: string;
//   declare genre: string;
//   declare year: number;
// }

// Movie.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     genre: {
//       type: DataTypes.STRING,
//     },
//     year: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   {
//     sequelize,
//     modelName: "Movie",
//     tableName: "movies",
//     timestamps: true,
//   }
// );

// models/movie.model.ts
// models/movieModel.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db.js";
import type { TMovie, TMovieCreateInput } from "../types/movie.js";

// 1. CreationAttributes makes id, createdAt, updatedAt optional during creation
interface MovieCreationAttributes
  extends Optional<TMovie, "id" | "createdAt" | "updatedAt"> {}
// 2. Define model class with declared properties and proper typing
export class Movie extends Model<TMovie, TMovieCreateInput> implements TMovie {
  declare id: number;
  declare title: string;
  declare genre: string;
  declare releaseYear: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// 3. Initialize model
Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "release_year",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "movies",
    timestamps: true,
    underscored: true, // ensures DB columns use snake_case
  }
);
