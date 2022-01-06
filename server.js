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

/* -------------------------------------------------------------------------- */

app.get("/no-cors", (req, res) => {
  console.info("GET /no-cors");
  res.json({
    text: "You should not see this via a CORS request.",
  });
});

/* -------------------------------------------------------------------------- */

app.head("/simple-cors", cors(), (req, res) => {
  console.info("HEAD /simple-cors");
  res.sendStatus(204);
});
app.get("/simple-cors", cors(), (req, res) => {
  console.info("GET /simple-cors");
  res.json({
    text: "Simple CORS requests are working. [GET]",
  });
});
app.post("/simple-cors", cors(), (req, res) => {
  console.info("POST /simple-cors");
  res.json({
    text: "Simple CORS requests are working. [POST]",
  });
});

/* -------------------------------------------------------------------------- */

app.options("/complex-cors", cors());
app.delete("/complex-cors", cors(), (req, res) => {
  console.info("DELETE /complex-cors");
  res.json({
    text: "Complex CORS requests are working. [DELETE]",
  });
});

/* -------------------------------------------------------------------------- */

const issue2options = {
  origin: true,
  methods: ["POST"],
  credentials: true,
  maxAge: 3600,
};
app.options("/issue-2", cors(issue2options));
app.post("/issue-2", cors(issue2options), (req, res) => {
  console.info("POST /issue-2");
  res.json({
    text: "Issue #2 is fixed.",
  });
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
