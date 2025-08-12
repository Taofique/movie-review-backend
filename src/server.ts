// import express from "express";
// import { Request, Response } from "express";
// import indexRouter from "./routes/index.routes.js";
// import { logger } from "./middleware/logger.js";
// const app = express();
// const port = 8080;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from es6, express is running");
// });

// app.use(logger);

// app.use("/", indexRouter);

// app.listen(port, () => {
//   console.log(`App is running on http://localhost:${port}`);
// });

import express from "express";
import { logger } from "./middleware/logger.js";
import { connectToDB } from "./utils/db.js";
import { sequelize } from "./utils/db.js";
import "./models/index.js";
// Mounting routes
import movieRoutes from "./routes/movie.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(logger);

app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);

app.listen(port, async () => {
  console.log(`App is running on http://localhost:${port}`);
  await connectToDB();
});

sequelize.sync({ alter: true }).then(() => {
  console.log("All models were synced successfully");
});
