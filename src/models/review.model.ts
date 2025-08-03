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

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db.js";
import type { TReview, TReviewCreateInput } from "../types/review.js";

export class Review extends Model<TReview, TReviewCreateInput> {}

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
