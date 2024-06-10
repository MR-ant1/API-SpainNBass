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
exports.postSeedDataBase = void 0;
const faker_1 = require("@faker-js/faker");
const db_1 = require("../db");
const Post_1 = require("../../models/Post");
const User_1 = require("../../models/User");
const generateFakePost = () => {
    const randomPost = new Post_1.Post();
    randomPost.title = faker_1.faker.lorem.words();
    randomPost.description = faker_1.faker.lorem.text();
    randomPost.topic = "Club dnb";
    randomPost.picUrl = faker_1.faker.internet.url();
    randomPost.owner = new User_1.User();
    randomPost.owner.id = faker_1.faker.number.int({ min: 1, max: 10 });
    return randomPost;
};
const postSeedDataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const postSecondTopic = new Post_1.Post();
        postSecondTopic.title = faker_1.faker.lorem.words();
        postSecondTopic.description = faker_1.faker.lorem.text();
        postSecondTopic.topic = "RaggaJungle";
        postSecondTopic.picUrl = faker_1.faker.internet.url();
        postSecondTopic.owner = new User_1.User();
        postSecondTopic.owner.id = faker_1.faker.number.int({ min: 1, max: 10 });
        yield postSecondTopic.save();
        const postThirdTopic = new Post_1.Post();
        postThirdTopic.title = faker_1.faker.lorem.words();
        postThirdTopic.description = faker_1.faker.lorem.text();
        postThirdTopic.topic = "Liquid dnb";
        postThirdTopic.picUrl = faker_1.faker.internet.url();
        postThirdTopic.owner = new User_1.User();
        postThirdTopic.owner.id = faker_1.faker.number.int({ min: 1, max: 10 });
        yield postThirdTopic.save();
        const postFourthTopic = new Post_1.Post();
        postFourthTopic.title = faker_1.faker.lorem.words();
        postFourthTopic.description = faker_1.faker.lorem.text();
        postFourthTopic.topic = "Rollers";
        postFourthTopic.picUrl = faker_1.faker.internet.url();
        postFourthTopic.owner = new User_1.User();
        postFourthTopic.owner.id = faker_1.faker.number.int({ min: 1, max: 10 });
        yield postFourthTopic.save();
        const postFifthTopic = new Post_1.Post();
        postFifthTopic.title = faker_1.faker.lorem.words();
        postFifthTopic.description = faker_1.faker.lorem.text();
        postFifthTopic.topic = "Jump Up";
        postFifthTopic.picUrl = faker_1.faker.internet.url();
        postFifthTopic.owner = new User_1.User();
        postFifthTopic.owner.id = faker_1.faker.number.int({ min: 1, max: 10 });
        yield postFifthTopic.save();
        const postSixthTopic = new Post_1.Post();
        postSixthTopic.title = faker_1.faker.lorem.words();
        postSixthTopic.description = faker_1.faker.lorem.text();
        postSixthTopic.topic = "NeuroFunk";
        postSixthTopic.picUrl = faker_1.faker.internet.url();
        postSixthTopic.owner = new User_1.User();
        postSixthTopic.owner.id = faker_1.faker.number.int({ min: 1, max: 10 });
        yield postSixthTopic.save();
        const postSeventhTopic = new Post_1.Post();
        postSeventhTopic.title = faker_1.faker.lorem.words();
        postSeventhTopic.description = faker_1.faker.lorem.text();
        postSeventhTopic.topic = "memes";
        postSeventhTopic.picUrl = faker_1.faker.internet.url();
        postSeventhTopic.owner = new User_1.User();
        postSeventhTopic.owner.id = faker_1.faker.number.int({ min: 1, max: 10 });
        yield postSeventhTopic.save();
        const fakePosts = Array.from({ length: 20 }, generateFakePost);
        yield Post_1.Post.save(fakePosts);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
exports.postSeedDataBase = postSeedDataBase;
