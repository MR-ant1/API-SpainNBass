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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSeedDataBase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const faker_1 = require("@faker-js/faker");
const db_1 = require("../db");
const User_1 = require("../../models/User");
const generateFakeUser = () => {
    const randomUser = new User_1.User();
    randomUser.nickname = faker_1.faker.person.lastName();
    randomUser.favSubgenre = "Club dnb";
    randomUser.preference = "dnb Lover";
    randomUser.turntable = faker_1.faker.lorem.words();
    randomUser.email = faker_1.faker.internet.email();
    randomUser.password = bcrypt_1.default.hashSync("aA123456", 5);
    return randomUser;
};
const userSeedDataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const userSuperAdmin = new User_1.User();
        userSuperAdmin.nickname = "super_admin";
        userSuperAdmin.favSubgenre = "RaggaJungle";
        userSuperAdmin.preference = "DJ";
        userSuperAdmin.turntable = "pioneer xdj rx2";
        userSuperAdmin.email = "superadmin@superadmin.com";
        userSuperAdmin.password = bcrypt_1.default.hashSync("aA123456", 5);
        userSuperAdmin.role = "super_admin";
        yield userSuperAdmin.save();
        const userAdmin = new User_1.User();
        userAdmin.nickname = "admin";
        userAdmin.favSubgenre = "RaggaJungle";
        userAdmin.preference = "DJ";
        userAdmin.turntable = "pioneer xdj rx";
        userAdmin.email = "admin@admin.com";
        userAdmin.password = bcrypt_1.default.hashSync("aA123456", 5);
        userAdmin.role = "admin";
        yield userAdmin.save();
        const fakeUsers = Array.from({ length: 10 }, generateFakeUser);
        yield User_1.User.save(fakeUsers);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
exports.userSeedDataBase = userSeedDataBase;
