import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../config/database.js";

export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<bigint>;
  declare roomId: bigint;
  declare senderId: bigint;
  declare body: string;
  declare createdAt: CreationOptional<Date>;
}

Message.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    roomId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "room_id",
    },

    senderId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "sender_id",
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "messages",
    timestamps: false,
  },
);
