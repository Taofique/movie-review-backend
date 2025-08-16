import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db.js";
import type { TGenre } from "../types/genre.js";

interface GenreCreationAttributes
  extends Optional<TGenre, "id" | "createdAt" | "updatedAt"> {}

export class Genre
  extends Model<TGenre, GenreCreationAttributes>
  implements TGenre
{
  declare id: number;
  declare name: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
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
    modelName: "Genre",
    tableName: "genres",
    timestamps: true,
    underscored: true,
  }
);
