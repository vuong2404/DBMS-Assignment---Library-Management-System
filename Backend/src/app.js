let express = require("express");
let cors = require("cors");
let bodyParse = require("body-parser");
let http = require("http")
let { env } = require("./config");
const loader = require("./loaders");
const router = require('./routes')

const startServer = async () => {
  try {
    let app = express();
    app.use(bodyParse());
    let server = http.Server(app);

    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    )

    loader.load()

    app.use("/api", router)

    server.listen(process.env.PORT || 3003, () => {
      console.log("Connect to port", env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();