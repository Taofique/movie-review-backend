// import {
//   DataTypes,
//   Model,
//   InferAttributes,
//   InferCreationAttributes,
//   CreationOptional,
// } from "sequelize";
// import { sequelize } from "../utils/db.js";
// import { CreateContextOptions } from "vm";

// export class User extends Model<
//   InferAttributes<User>,
//   InferCreationAttributes<User>
// > {
//   declare id: CreationOptional<number>;
//   declare username: string;
//   declare email: string;
//   declare password: string;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "User",
//     tableName: "users",
//     timestamps: true,
//   }
// );

import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../utils/db.js";
import type { TUser, TUserCreateInput } from "../types/user.js";

export class User extends Model<TUser, TUserCreateInput> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);
