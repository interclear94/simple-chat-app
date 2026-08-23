import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

/*
  ChatRoom 모델

  실제 채팅방 자체의 정보를 저장합니다.

  방에 누가 들어와 있는지는 이 모델에 저장하지 않습니다.
  그 정보는 RoomMember가 담당합니다.
*/
export const ChatRoom = sequelize.define(
  "ChatRoom",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    roomType: {
      type: DataTypes.ENUM("DIRECT", "GROUP"),
      allowNull: false,
      defaultValue: "DIRECT",
      field: "room_type",
    },

    createdBy: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "created_by",
    },
  },
  {
    tableName: "chat_rooms",

    /*
      ChatRoom은 createdAt, updatedAt을 사용합니다.
      Sequelize가 두 컬럼을 자동으로 관리합니다.
    */
    timestamps: true,
  },
);

/*
  Message 모델

  메시지 한 건을 저장합니다.

  하나의 메시지는 다음 정보를 가집니다.

  - 어느 방의 메시지인지
  - 누가 보냈는지
  - 메시지 내용
  - 언제 보냈는지
*/
export const Message = sequelize.define(
  "Message",
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
    tableName: "messages",
    timestamps: false,
  },
);
