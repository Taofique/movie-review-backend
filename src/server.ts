import express from "express";
import { Request, Response } from "express";
// import indexRouter from "./routes/index.routes.js";
// import { logger } from "./middleware/logger.js";
const app = express();
const port = 8080;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from es6, express is running");
// });

// app.use(logger);

// app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
