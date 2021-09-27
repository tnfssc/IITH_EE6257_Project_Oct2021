import express from "express";
import cors from "cors";
import { config as DotEnvConfig } from "dotenv";
if (__DEV__) DotEnvConfig(); // FORBIDDEN!!! USE OS ENV VARS BIT*H

const app = express();

app.use(cors());
app.get("/hello", async (_, res) => res.send({ hello: "world" }));

app.listen(process.env.PORT || 3000);
