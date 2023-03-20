import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index";
import chatGlobal from "./models/chatGlobal";
import path from "path";
import swaggerDocs from "./utils/swagger";
import log from "./utils/logger";
import mongoSanitize from 'express-mongo-sanitize'

// middleware
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// By default, $ and . characters are removed completely from user-supplied input in the following places:
// - req.body
// - req.params
// - req.headers
// - req.query

// To remove data using these defaults:
app.use(mongoSanitize());
// Cors
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes auth
app.use("/api/auth", routes.authRouter);
// Router user
app.use("/api", routes.userRouter);
// Router category
app.use("/api", routes.categoryRouter);
// Router question
app.use("/api", routes.questionRouter);
// Router course
app.use("/api", routes.courseRouter);

// config database
import "./config/database";

// socket io
io.on("connection", (socket: any) => {
  socket.on("sendDataClient", async function (data: any) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    if (data) {
      const rows = new chatGlobal({
        userId: data.userId,
        content: data.content.trim(),
        time: data.time,
        user: data.user,
      });

      await rows.save();
    }
    io.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });

  socket.on("disconnect", () => {
    log.info("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

// build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

// server listenning
const POST = process.env.PORT || 5000;
http.listen(POST, function () {
  log.info("listening on port ", POST);
  //add swagger docs
  swaggerDocs(app, Number(POST));
});
