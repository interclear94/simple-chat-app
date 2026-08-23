import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    // 데이터베이스 서버 주소
    host: process.env.DB_HOST!,

    // MySQL 기본 포트
    port: Number(process.env.DB_PORT),

    // 사용할 데이터베이스 종류
    dialect: "mysql",

    // SQL 실행 로그를 콘솔에 출력할지 여부
    // 개발 중에는 true로 설정하면 실행 SQL을 확인할 수 있습니다.
    logging: false,

    // 날짜를 한국 시간 기준으로 처리
    timezone: "+09:00",

    define: {
      /*
        underscored: true를 설정하면

        JavaScript:
        createdAt

        데이터베이스:
        created_at

        형태로 자동 변환할 수 있습니다.
      */
      underscored: true,
    },
  },
);

export default sequelize;
