import { Pool } from "pg";
import config from "../configuration";

const connectionString = config.testDB;

const client = new Pool({
    connectionString
});

client.connect();

export default client;
