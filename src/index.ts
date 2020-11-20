import "dotenv/config";
import express from "express";
import { Request, Response, NextFunction } from "express";
import models, { sequelize } from "./models";
import routes from "./routes";
import HttpException from "./utils/httpexception";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

app.get("*", function (req: Request, res: Response, next: NextFunction) {
  const error = new HttpException(
    301,
    `${req.ip} tried to access ${req.originalUrl}`
  );
  next(error);
});

app.use(
  (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    if (!error.statusCode) error.statusCode = 500;

    if (error.statusCode === 301) {
      return res.status(301).redirect("/not-found");
    }

    return res.status(error.statusCode).json({ error: error.message });
  }
);

app.listen(process.env.PORT, () =>
  console.log(`App is listening on port ${process.env.PORT}`)
);
