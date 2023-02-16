import { Application } from "../deps.ts";
import { router } from "./routers/index.ts"
import { notFound } from "./handlers/index.ts";

const app = new Application();

app.use(router.routes());

app.use(router.allowedMethods())
   .use(notFound);

console.log("server listening on http://localhost:8080");

await app.listen({ port: 8080 });
