import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

const port = process.env.PORT ?? 8080;
app.listen(port, () => console.log(`backend listening on :${port}`));

