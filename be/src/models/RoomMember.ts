import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database.js";

export class RoomMember extends Model<
  InferAttributes<RoomMember>,
  InferCreationAttributes<RoomMember>
> {
  declare roomId: number;
  declare userId: number;
  declare joinedAt: CreationOptional<Date>;
  declare leftAt: CreationOptional<Date | null>;
}

RoomMember.init(
  {
    roomId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: "room_id",
    },

    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: "user_id",
    },

    joinedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "joined_at",
    },

    leftAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: "left_at",
    },
  },
  {
    sequelize,
    tableName: "room_members",
    timestamps: false,
    underscored: true,
  },
);
