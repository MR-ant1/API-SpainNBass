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
exports.latestSeedDataBase = void 0;
const faker_1 = require("@faker-js/faker");
const db_1 = require("../db");
const Latest_1 = require("../../models/Latest");
const User_1 = require("../../models/User");
const generateFakeLatest = () => {
    const randomLatest = new Latest_1.Latest();
    randomLatest.title = faker_1.faker.person.lastName();
    randomLatest.description = faker_1.faker.lorem.text();
    randomLatest.picUrl = faker_1.faker.internet.url();
    randomLatest.user = new User_1.User();
    randomLatest.user.id = faker_1.faker.number.int({ min: 1, max: 2 });
    return randomLatest;
};
const latestSeedDataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const fakeLatests = Array.from({ length: 12 }, generateFakeLatest);
        yield Latest_1.Latest.save(fakeLatests);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
exports.latestSeedDataBase = latestSeedDataBase;
