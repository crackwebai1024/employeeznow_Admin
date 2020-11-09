import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
// route files
import authEmployeeRoutes from "./routes/auth/employee.routes";
import authEmployerRoutes from "./routes/auth/employer.routes";
import authCommonRoutes from "./routes/auth/common.routes";
import crudEmployeeRoutes from "./routes/crud/employee.routes";
import crudEmployerRoutes from "./routes/crud/employer.routes";
import mailSendRoutes from "./routes/mail/mail.routes";
import paymentRoutes from "./routes/payment/payment.routes";
import searchEmployeeRoutes from "./routes/search/search.routes";

const CURRENT_WORKING_DIR = process.cwd();

const app = express();
const upload = multer();
// Morgan (logger)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(upload.single("content"));
app.use(express.static("public"));

// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors({ origin: "*" }));

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// mount routes
// auth routes before signin
app.use("/api/search", searchEmployeeRoutes);
app.use("/api/auth/employee", authEmployeeRoutes);
app.use("/api/auth/employer", authEmployerRoutes);
app.use("/api/auth/common", authCommonRoutes);

// data organization routes after signin
app.use("/api/crud/employee", crudEmployeeRoutes);
app.use("/api/crud/employer", crudEmployerRoutes);

//send mail to employee and employer
app.use("/api/mail", mailSendRoutes);

//employer pay for interest employee routes
app.use("/api/payment", paymentRoutes);

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log("error ==> ", err);
  }
});

export default app;
