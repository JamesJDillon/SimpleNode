import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import routes from "./routes/index";

const startServer = () => {
  console.log('Initialising the server...');
  const server = express();
  dotenv.config();

  server.set('env', process.env.NODE_ENV);
  server.set('hostname', process.env.HOSTNAME);
  server.set('port', process.env.PORT);

  server.use(cors());
  server.use(helmet());
  server.use(express.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(morgan('tiny'));
  server.use(express.urlencoded({
    extended: true,
  }));

  server.use(routes);

  server.listen(
    process.env.PORT,
    () => console.log(`⚡ Listening on port ${process.env.PORT}`),
  );
};

startServer();
