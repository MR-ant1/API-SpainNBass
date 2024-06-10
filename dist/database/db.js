"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const _1714418032255_users_1 = require("./migrations//1714418032255-users");
const _1714470644500_latests_1 = require("./migrations/1714470644500-latests");
const _1714473716991_posts_1 = require("./migrations/1714473716991-posts");
const _1714474226210_comments_1 = require("./migrations/1714474226210-comments");
const _1714484844036_likes_1 = require("./migrations/1714484844036-likes");
const User_1 = require("../models/User");
const Latest_1 = require("../models/Latest");
const Post_1 = require("../models/Post");
const Comment_1 = require("../models/Comment");
const Like_1 = require("../models/Like");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "test",
    entities: [User_1.User, Latest_1.Latest, Post_1.Post, Comment_1.Comment, Like_1.Like],
    migrations: [_1714418032255_users_1.Users1714418032255, _1714470644500_latests_1.Latests1714470644500, _1714473716991_posts_1.Posts1714473716991, _1714474226210_comments_1.Comments1714474226210, _1714484844036_likes_1.Likes1714484844036],
    synchronize: false,
    logging: false,
});
