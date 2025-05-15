import { createConnection } from "typeorm";
import app from "./app";
import morgan from "morgan";
import { stream } from "./utils/logger.util";
export const LOG_FORMAT = ":method :url STATUS=:status";

export default class Server {
  start(port: number, callback: () => void) {
    createConnection()
      .then(() => {
        app.use(morgan(LOG_FORMAT, { stream }));
        app.listen(port, callback);
      })
      .catch((err) => console.error(err));
  }
}
