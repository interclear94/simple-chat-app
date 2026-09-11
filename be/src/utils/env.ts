import "dotenv/config";

/*
  환경 변수는 process.env에서 가져옵니다.

  하지만 process.env의 값은 항상 string 또는 undefined입니다.

  따라서 서버를 실행하기 전에 필요한 환경 변수가 있는지
  확인하는 함수를 만들어두는 것이 좋습니다.
*/

/**
 * 필수 환경 변수를 가져옵니다.
 *
 * 값이 없으면 서버 실행을 중단합니다.
 */
function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} 환경 변수가 설정되지 않았습니다.`);
  }

  return value;
}

/**
 * 숫자 타입의 환경 변수를 가져옵니다.
 */
function getNumberEnv(name: string, defaultValue: number): number {
  const value = process.env[name];

  /*
    값이 없으면 기본값을 사용합니다.
  */
  if (!value) {
    return defaultValue;
  }

  const numberValue = Number(value);

  /*
    "abc"처럼 숫자로 변환할 수 없는 값이 들어오면
    서버 실행을 중단합니다.
  */
  if (Number.isNaN(numberValue)) {
    throw new Error(`${name}은 숫자여야 합니다.`);
  }

  return numberValue;
}

/*
  애플리케이션 전체에서 사용할 환경 변수 객체입니다.

  다른 파일에서 process.env를 직접 사용하지 않고
  env 객체를 사용하는 것이 좋습니다.

  잘못된 환경 변수 문제를 앱 시작 시점에 발견할 수 있기 때문입니다.
*/
export const env = {
  port: getNumberEnv("PORT", 3000),

  db: {
    host: getRequiredEnv("DB_HOST") as string,
    port: getNumberEnv("DB_PORT", 3306),
    name: getRequiredEnv("DB_NAME") as string,
    user: getRequiredEnv("DB_USER") as string,

    /*
      비밀번호가 빈 문자열인 로컬 환경도 있을 수 있으므로
      getRequiredEnv를 사용하지 않습니다.
    */
    password: process.env.DB_PASSWORD as string,
  },

  jwt_access_secret: getRequiredEnv("JWT_ACCESS_SECRET"),
  jwt_refresh_secret: getRequiredEnv("JWT_REFRESH_SECRET"),
};
