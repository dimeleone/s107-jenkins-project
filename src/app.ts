import express from "express";
import MongoDbConnection from "./config/mongodb";
import PostgresDbConnection from "./config/postgresdb";
import router from "./router";

const app = express();

MongoDbConnection.connect();
PostgresDbConnection.connect();

app.use(express.json());

app.use("/api", router);

export default app;
