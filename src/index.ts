import "dotenv/config";
import express from "express";
import models, { sequelize } from "./models";
import routes from "./routes";
import HttpException from "./utils/httpexception";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

app.get("*", function (req, res, next) {
  const error = new HttpException(
    301,
    `${req.ip} tried to access ${req.originalUrl}`
  );
  next(error);
});

app.use((error: HttpException, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect("/not-found");
  }

  return res.status(error.statusCode).json({ error: error.message });
});

app.listen(process.env.PORT, () =>
  console.log(`App is listening on port ${process.env.PORT}`)
);
