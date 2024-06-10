"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSeedDataBase = void 0;
const faker_1 = require("@faker-js/faker");
const db_1 = require("../db");
const Comment_1 = require("../../models/Comment");
const User_1 = require("../../models/User");
const Post_1 = require("../../models/Post");
const generateFakeComment = () => {
    const randomComment = new Comment_1.Comment();
    randomComment.comment = faker_1.faker.lorem.words();
    randomComment.url = faker_1.faker.internet.url();
    randomComment.user = new User_1.User();
    randomComment.user.id = faker_1.faker.number.int({ min: 1, max: 10 });
    randomComment.post = new Post_1.Post();
    randomComment.post.id = faker_1.faker.number.int({ min: 1, max: 4 });
    return randomComment;
};
const commentSeedDataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const fakeComments = Array.from({ length: 30 }, generateFakeComment);
        yield Comment_1.Comment.save(fakeComments);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
exports.commentSeedDataBase = commentSeedDataBase;
