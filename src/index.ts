import dotenv from "dotenv";
import Server from "./server";
import logger from "./utils/logger.util";
dotenv.config();

const server = new Server();

server.start(3020, async () => {
  logger.info(`Servidor corriendo en el puerto 3020`);
});
