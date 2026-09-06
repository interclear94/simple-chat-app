import { Request, Response } from "express";

/*
  어떤 Route에도 매칭되지 않았을 때 실행됩니다.

  예를 들어 존재하지 않는 URL을 요청하면
  이 미들웨어가 실행됩니다.
*/
export const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(404).json({
    message: `존재하지 않는 API입니다: ${req.method} ${req.originalUrl}`,
  });
};
