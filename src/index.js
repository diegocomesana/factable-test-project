import express from "express";
import { setContextMiddleware, applyController } from "./middlewares/context";
import mainController from "./main-controller";
import { RunMode } from "./types";

const IS_DEV = process.env.NODE_ENV !== RunMode.PROD;
const IS_TEST = process.env.NODE_ENV === RunMode.TEST;

const app = express();
const port = 3000;

const context = {
  execution: {
    run_mode: IS_TEST ? RunMode.TEST : IS_DEV ? RunMode.DEV : RunMode.PROD,
  },
};

app.use(setContextMiddleware(context));
app.get("/", applyController(mainController));

if (!IS_DEV) {
  // PROD ERROR HANDLER:
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      msg: "Disculpe, Ocurrió un error. Por favor, intente más tarde.",
    });
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
