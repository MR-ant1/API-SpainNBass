
import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Users1714418032255 } from "./migrations//1714418032255-users";
import { News1714470644500 } from "./migrations/1714470644500-news";
import { Posts1714473716991 } from "./migrations/1714473716991-posts";
import { Comments1714474226210 } from "./migrations/1714474226210-comments";



export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "test",
    entities: [],
    migrations: [Users1714418032255, News1714470644500, Posts1714473716991, Comments1714474226210],
    synchronize: false,
    logging: false,
})