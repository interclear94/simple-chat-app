import express from "express";
import cors from "cors";
import router from "./routes/index";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import morgan from "morgan";

const app = express();

/*
  프론트엔드와 백엔드가 서로 다른 포트에서 실행될 때
  CORS 설정이 필요합니다.

  개발 환경 예시:

  프론트엔드: http://localhost:5173
  백엔드: http://localhost:3000
*/
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

/*
  JSON 요청 body를 파싱합니다.

  예:

  POST /api/users
  Content-Type: application/json

  {
    "email": "test@test.com",
    "nickname": "홍길동"
  }
*/
app.use(express.json());

/**
 * 로그 (morgan)
 */
app.use(morgan("dev"));

/*
  URL encoded 형식의 body도 처리합니다.
*/
app.use(express.urlencoded({ extended: true }));

/*
  라우터를 연결합니다.
*/
app.use(router);

/*
  위의 Route 중 어디에도 매칭되지 않으면
  404 미들웨어가 실행됩니다.
*/
app.use(notFoundMiddleware);

/*
  반드시 Route와 404 미들웨어 뒤에 등록해야 합니다.

  앞에 등록하면 Route에서 발생한 오류를
  제대로 잡지 못할 수 있습니다.
*/
app.use(errorMiddleware);

export default app;
