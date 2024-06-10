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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Latest_1 = require("./Latest");
const Post_1 = require("./Post");
const Comment_1 = require("./Comment");
const Like_1 = require("../models/Like");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "nickname" }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "fav_subgenre", enum: ["RaggaJungle", "Club dnb", "Liquid dnb", "NeuroFunk", "Rollers", "Jump Up"],
        default: "'Club dnb'"
    }),
    __metadata("design:type", String)
], User.prototype, "favSubgenre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "preference", enum: ["dnb Lover", "DJ", "Producer", "DJ/Producer"],
        default: "'dnb Lover'"
    }),
    __metadata("design:type", String)
], User.prototype, "preference", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "turntable" }),
    __metadata("design:type", String)
], User.prototype, "turntable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "password_hash", select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "role", select: false }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", select: true }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "updated_at", select: true }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Latest_1.Latest, (latests) => latests.user),
    __metadata("design:type", Latest_1.Latest)
], User.prototype, "latests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (comments) => comments.user),
    __metadata("design:type", Comment_1.Comment)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Post_1.Post, (posts) => posts.owner),
    __metadata("design:type", Post_1.Post)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Like_1.Like, (likes) => likes.user),
    __metadata("design:type", Like_1.Like
    //     @ManyToMany(() => Post)
    //     @JoinTable({
    //         name: 'likes',
    //         joinColumn: {
    //             name: 'user_id',
    //             referencedColumnName: 'id'
    //         },
    //         inverseJoinColumn: {
    //             name: 'post_id',
    //             referencedColumnName: 'id'
    //         }
    //     })
    //     likes!: User[]
    )
], User.prototype, "likes", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
