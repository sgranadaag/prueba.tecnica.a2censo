import fs from "fs";
import path from "path";
import { Get, JsonController } from "routing-controllers";

@JsonController("/logs")
export default class LogsController {
  @Get("/")
  async searchLabelById() {
    const logPath = path.join(__dirname, "../logs", "error.log");

    const data = await fs.promises.readFile(logPath, "utf8");
    return { logs: data };
  }
}
