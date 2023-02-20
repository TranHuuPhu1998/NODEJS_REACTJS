import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index";
import chatGlobal from "./models/chatGlobal";
import path from "path";

const mongoose = require("mongoose");
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/server/swagger.css"), 'utf8');

// middleware
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);


app.use(express.json());
// let express to use this
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
app.use(express.urlencoded({ extended: false }));
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

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: any) => {
    if (err) throw err;
    console.log("Connected to mongosedb");
  }
);

// socket io
io.on("connection", (socket: any) => {
  socket.on("sendDataClient", async function (data: any) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    console.log(data);
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
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

// server listenning
const POST = process.env.PORT || 5000;
http.listen(POST, function () {
  console.log("listening on port ", POST);
});
