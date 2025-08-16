import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db.js";

export class Visit extends Model {
  declare id: number;
  declare userId: number;
  declare movieId: number;
  declare visitedAt: Date;
}

Visit.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: "user_id" },
    movieId: { type: DataTypes.INTEGER, allowNull: false, field: "movie_id" },
    visitedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "visited_at",
    },
  },
  {
    sequelize,
    modelName: "Visit",
    tableName: "visits",
    timestamps: false,
    underscored: true,
    indexes: [{ fields: ["movie_id"] }, { fields: ["user_id"] }],
  }
);
