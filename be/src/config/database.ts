import { Sequelize } from "sequelize";
import { env } from "../utils/env";

/*
  Sequelize 인스턴스를 생성합니다.

  이 객체 하나가 MySQL 연결 풀과
  Sequelize 모델 전체를 관리합니다.
*/
export const sequelize = new Sequelize(
  env.db.name,
  env.db.user,
  env.db.password,
  {
    host: env.db.host,
    port: env.db.port,
    dialect: "mysql",

    /*
      개발할 때 true로 설정하면
      Sequelize가 실행하는 SQL을 콘솔에 출력합니다.

      SQL을 공부하는 단계라면 true로 바꿔보는 것도 좋습니다.
    */
    logging: false,

    /*
      데이터베이스 시간 처리 기준입니다.
    */
    timezone: "+09:00",

    /*
      연결 풀 설정입니다.

      여러 요청이 들어와도 매번 새로운 DB 연결을 만들지 않고
      일정 개수의 연결을 재사용합니다.
    */
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    /*
      모델의 createdAt을 created_at으로,
      updatedAt을 updated_at으로 변환합니다.
    */
    define: {
      underscored: true,
    },
  },
);

/**
 * MySQL 연결을 확인하고 필요한 테이블을 생성합니다.
 */
export async function connectDatabase(): Promise<void> {
  /*
    authenticate는 MySQL 연결 정보가 올바른지 확인합니다.

    다음 내용을 확인합니다.

    - MySQL 서버가 실행 중인지
    - DB 주소가 올바른지
    - DB 이름이 존재하는지
    - 사용자 이름과 비밀번호가 올바른지
  */
  await sequelize.authenticate();

  console.log("MySQL connection established.");

  /*
    sync는 Sequelize 모델을 기반으로 테이블을 생성합니다.

    테이블이 없으면 생성합니다.

    주의할 점:
    운영 환경에서는 sync 대신 migration을 사용하는 것이 좋습니다.
    현재는 초기 개발 단계이므로 사용합니다.
  */
  await sequelize.sync();

  console.log("Database models synchronized.");
}

/**
 * 애플리케이션 종료 전에 DB 연결을 닫습니다.
 */
export async function closeDatabase(): Promise<void> {
  await sequelize.close();

  console.log("MySQL connection closed.");
}
