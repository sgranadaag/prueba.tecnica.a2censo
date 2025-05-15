import express from "express";
import { resolve } from "path";
import { createExpressServer } from "routing-controllers";

const app: express.Application = createExpressServer({
  defaultErrorHandler: false,
  classTransformer: true,
  validation: {
    validationError: {
      target: false,
    },
  },
  controllers: [resolve(__dirname, "./controllers/**/*{.ts,.js}")],
  middlewares: [resolve(__dirname, "./middlewares/**/*{.ts,.js}")],
});

export default app;
