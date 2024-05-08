
import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Users1714418032255 } from "./migrations//1714418032255-users";
import { Latests1714470644500 } from "./migrations/1714470644500-latests";
import { Posts1714473716991 } from "./migrations/1714473716991-posts";
import { Comments1714474226210 } from "./migrations/1714474226210-comments";
import { Likes1714484844036 } from "./migrations/1714484844036-likes";
import { User } from "../models/User";
import { Latest } from "../models/Latest";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { Like } from "../models/Like";



export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "test",
    entities: [User, Latest, Post, Comment, Like],
    migrations: [Users1714418032255, Latests1714470644500, Posts1714473716991, Comments1714474226210, Likes1714484844036],
    synchronize: false,
    logging: false,
})