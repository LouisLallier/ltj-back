const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const videoRoutes = require("./routes/video.routes");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const db = require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const logger = require("morgan");
const cors = require("cors");

db.connect(process.env.MONGODB_URI);

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger(process.env.APP_ENV === "dev" ? "dev" : "short"));

app.use(cors());

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
// routes
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT${process.env.PORT}`);
});
