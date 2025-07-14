const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const env = require("./config/env");
const initWebRoutes = require("./routes");
const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");
const Router = express.Router();
import socket from './socket';

const app = express();

const hostname = env.LOCAL_APP_HOST;
const port = env.LOCAL_APP_PORT;
const build_mode = env.BUILD_MODE;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  Headers: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Content-Type",
    "Authorization",
  ],
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions))










initWebRoutes(app);


socket();
app.use(Router)



app.use(errorHandlingMiddleware);



if (build_mode === "dev") {
  app.listen(port, hostname, () => {
    console.log(`Hello Trong Hieu Dev, I am running at ${hostname}:${port}/`);
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(`Hello Trong Hieu Prod, I am running at ${hostname}:${port}/`);
  });
}
