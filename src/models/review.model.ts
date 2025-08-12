// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
//   ForeignKey,
// } from "sequelize";
// import { sequelize } from "../utils/db.js";
// import { User } from "./user.model.js";
// import { Movie } from "./movie.model.js";

// export class Review extends Model<
//   InferAttributes<Review>,
//   InferCreationAttributes<Review>
// > {
//   declare id: CreationOptional<number>;
//   declare rating: number;
//   declare comment: string;
//   declare userId: ForeignKey<number>;
//   declare movieId: ForeignKey<number>;
// }

// Review.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     comment: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     rating: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       field: "user_id",
//     },
//     movieId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       field: "movie_id", // matching database column error fix.
//     },
//   },
//   {
//     sequelize,
//     modelName: "Review",
//     tableName: "reviews",
//     timestamps: true,
//   }
// );

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db.js";
import type { TReview, TReviewCreateInput } from "../types/review.js";

// Optional: tell Sequelize that `id` is auto-generated, so it's optional when creating
interface ReviewCreationAttributes
  extends Optional<TReview, "id" | "createdAt" | "updatedAt"> {}

export class Review
  extends Model<TReview, ReviewCreationAttributes>
  implements TReview
{
  declare id: number;
  declare content: string;
  declare rating: number;
  declare userId: number;
  declare movieId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "movie_id",
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
    modelName: "Review",
    tableName: "reviews",
    timestamps: true,
    underscored: true,
  }
);
