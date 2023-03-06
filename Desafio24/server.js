import http from "http";

import { init } from "./db/mongodb.js";
import app from './app.js'

await init(); // Connect to database

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running in http://localhost:${process.env.PORT}/ from process ${process.pid}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Persistence type: ${process.env.PERSISTENCE_TYPE ? process.env.PERSISTENCE_TYPE : "memory"}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
