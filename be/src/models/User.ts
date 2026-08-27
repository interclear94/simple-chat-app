import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../config/database.js";

/*
  User 모델 클래스입니다.

  InferAttributes<User>는 User 클래스에 선언된 필드를 기반으로
  Sequelize의 타입을 자동으로 만들어줍니다.

  InferCreationAttributes<User>는
  User.create()를 호출할 때 필요한 필드 타입을 만들어줍니다.
*/
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  /*
    CreationOptional은 생성 시 입력하지 않아도 되는 필드입니다.

    id는 데이터베이스가 자동으로 생성합니다.
  */
  declare id: CreationOptional<number>;

  declare email: string;
  declare nickname: string;

  declare passwordHash: string;
  /*
    timestamps: true를 사용하면
    Sequelize가 아래 두 필드를 자동으로 관리합니다.
  */
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

/*
  User 클래스와 users 테이블의 컬럼을 연결합니다.
*/
User.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
      validate: {
        /*
          Sequelize 레벨에서도 이메일 형식을 검사합니다.
        */
        isEmail: true,
      },
    },

    nickname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "닉네임은 비어 있을 수 없습니다.",
        },
      },
    },

    passwordHash: {
      /*
    bcrypt로 해시된 비밀번호를 저장합니다.

    평문:
    "12345678"

    저장되는 값 예:
    "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"

    bcrypt 해시값은 일반적인 문자열이므로 STRING으로 저장합니다.
  */
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,

    /*
      Sequelize 모델 이름입니다.
    */
    modelName: "User",

    /*
      실제 MySQL 테이블 이름입니다.
    */
    tableName: "users",

    /*
      created_at, updated_at 컬럼을 자동으로 관리합니다.
    */
    timestamps: true,

    /*
      createdAt -> created_at
      updatedAt -> updated_at
    */
    underscored: true,
  },
);
