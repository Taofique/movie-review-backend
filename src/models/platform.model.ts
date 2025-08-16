import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db.js";
import type { TPlatform } from "../types/platform.js";

interface PlatformCreationAttributes
  extends Optional<TPlatform, "id" | "createdAt" | "updatedAt"> {}

export class Platform
  extends Model<TPlatform, PlatformCreationAttributes>
  implements TPlatform
{
  declare id: number;
  declare name: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Platform.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
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
    modelName: "Platform",
    tableName: "platforms",
    timestamps: true,
    underscored: true,
  }
);
