import { createConnection } from "typeorm";
import app from "./app";
import morgan from "morgan";
import logger from "./utils/logger.util";

const LOG_FORMAT = ":method :url :status - :response-time ms";

export default class Server {
  start(port: number, callback: () => void) {
    createConnection()
      .then(() => {
        app.use(
          morgan(LOG_FORMAT, {
            stream: {
              write: (message: string) => {
                logger.info(message);
              },
            },
          })
        );
        app.listen(port, callback);
      })
      .catch((err) => console.error(err));
  }
}
