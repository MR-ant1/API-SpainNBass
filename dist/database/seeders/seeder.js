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
const usersSeeders_1 = require("./usersSeeders");
const latestsSeeders_1 = require("./latestsSeeders");
const postSeeders_1 = require("./postSeeders");
const commentsSeeders_1 = require("./commentsSeeders");
const launchSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, usersSeeders_1.userSeedDataBase)();
    console.log("user seed done");
    yield (0, latestsSeeders_1.latestSeedDataBase)();
    console.log("latest seed done");
    yield (0, postSeeders_1.postSeedDataBase)();
    console.log("post seed done");
    yield (0, commentsSeeders_1.commentSeedDataBase)();
    console.log("comments seed done");
});
launchSeeder();
