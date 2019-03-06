import express from "express";

const port = process.env.PORT || 8888;
const app = express();

// Bootstrap express
import expressConfig from "./config/express";
expressConfig(app);

app.listen(port);
logger.info("Application started on port " + port);

export default app;
