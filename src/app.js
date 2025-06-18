import { connectDB } from "./config/db.config.js";
import cors from "cors";
import express from "express";
import usersRouter from "./routes/users.router.js";
import memberWorkspaceRouter from "./routes/memberWorkspace.router.js";
import channelRouter from "./routes/channel.router.js";
import productsRouter from './routes/product.routes.js'
import workspace_router from "./routes/workspaces.route.js";
import { ENVIRONMENT } from "../enviroment.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Server is running</h1>");
});

app.get("/ping", (request, response) => {
  response.send("<h1>Server is running</h1>");
});

app.use("/api/users", usersRouter);
app.use("/api/workspaces", workspace_router);
app.use("/api/products", productsRouter);
app.use("/api/members", memberWorkspaceRouter);
app.use("/api/channels", channelRouter);

app.listen(ENVIRONMENT.PORT, () => {
  console.log(
    `La aplicacion se esta escuchando en http://localhost:${ENVIRONMENT.PORT}`
  );
});
