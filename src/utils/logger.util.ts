import { TransformableInfo } from "logform";
import { createLogger, format, transports } from "winston";
import path from "path";

const { combine, timestamp, prettyPrint, align, printf } = format;

const logger = createLogger({
  format: combine(
    // colorize(),
    timestamp(),
    prettyPrint(),
    align(),
    printf(({ message, level }: TransformableInfo) =>
      `[${level}]: ${String(message).trim()}`.replace(/\n$/, "")
    )
  ),
  exitOnError: false,
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
    new transports.Console(),
  ],
});

const getLogType = (message: any) => {
  const status = Number(message.split("=")[1]);
  if (status < 400 || isNaN(status)) {
    return "info";
  }
  return "error";
};

export const stream = {
  write: (message: string) => {
    const type = getLogType(message);

    logger.log({ level: type, message });
  },
};

export default logger;
