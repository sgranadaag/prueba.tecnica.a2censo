import { TransformableInfo } from "logform";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint, colorize, align, printf } = format;

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp(),
    prettyPrint(),
    align(),
    printf(({ message, level }: TransformableInfo) => `[${level}]: ${message}`)
  ),
  exitOnError: false,
});

logger.add(new transports.Console());

export default logger;
