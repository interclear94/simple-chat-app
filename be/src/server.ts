import app from "./app";
import { closeDatabase, connectDatabase } from "./config/database";
import { env } from "./utils/env";

/*
  모델을 Sequelize에 등록합니다.
*/
import "./models";

async function startServer(): Promise<void> {
  try {
    /*
      Express 서버를 열기 전에
      먼저 DB에 연결합니다.
    */
    await connectDatabase();

    const server = app.listen(env.port, () => {
      console.log(`Server is running at http://localhost:${env.port}`);
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT received.");

      server.close(async () => {
        await closeDatabase();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start server.");
    console.error(error);

    process.exit(1);
  }
}

startServer();
