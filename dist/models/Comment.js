"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Post_1 = require("./Post");
let Comment = class Comment extends typeorm_1.BaseEntity {
};
exports.Comment = Comment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "comment" }),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "url" }),
    __metadata("design:type", String)
], Comment.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", select: true }),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", select: true }),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.comments),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_1.Post, (post) => post.comments),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", Post_1.Post)
], Comment.prototype, "post", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)('comments')
], Comment);
