"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const httpexception_1 = __importDefault(require("./utils/httpexception"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/session", routes_1.default.session);
app.use("/users", routes_1.default.user);
app.use("/messages", routes_1.default.message);
app.get("*", function (req, res, next) {
    const error = new httpexception_1.default(301, `${req.ip} tried to access ${req.originalUrl}`);
    next(error);
});
//# sourceMappingURL=index.js.map