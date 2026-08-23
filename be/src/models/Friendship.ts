import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database.js";

export class Friendship extends Model<
  InferAttributes<Friendship>,
  InferCreationAttributes<Friendship>
> {
  declare userId: bigint;
  declare friendId: bigint;
  declare createdAt: CreationOptional<Date>;
}

Friendship.init(
  {
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: "user_id",
    },

    friendId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: "friend_id",
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "friendships",
    timestamps: false,
  },
);
