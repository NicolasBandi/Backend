import http from "http";

import { init } from "./db/mongodb.js";
import app from './app.js'

await init(); //conecto a la base de datos

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(
    `Server running in http://localhost:${process.env.PORT}/ from process ${process.pid}`
  );
  console.log(`Environment: ${process.env.ENV}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
