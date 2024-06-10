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
exports.getPostLikes = exports.getUserLikes = exports.sendOrRemoveLike = void 0;
const handleError_1 = require("../utils/handleError");
const Like_1 = require("../models/Like");
const Post_1 = require("../models/Post");
const sendOrRemoveLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const postId = req.params.id;
        const findPost = yield Post_1.Post.find({ where: { id: parseInt(postId) } });
        if (findPost.length === 0) {
            throw new Error("Este post no existe");
        }
        const LikeOrDislike = yield Like_1.Like.find({
            where: {
                user: { id: userId },
                post: { id: parseInt(postId) }
            },
            relations: {
                user: true,
                post: true
            },
            select: {
                user: { nickname: true, favSubgenre: true }
            }
        });
        if (LikeOrDislike.length === 0) {
            const newCommentPost = yield Like_1.Like.create({
                user: { id: userId },
                post: { id: parseInt(postId) }
            }).save();
            const liked = yield Like_1.Like.find({
                where: {
                    user: { id: userId },
                    post: { id: parseInt(postId) }
                },
                relations: {
                    post: true,
                    user: true
                },
                select: {
                    user: { nickname: true, favSubgenre: true }
                }
            });
            res.status(201).json({
                success: true,
                message: 'Like',
                data: liked
            });
        }
        else {
            yield Like_1.Like.remove(LikeOrDislike);
            res.status(201).json({
                success: true,
                message: "Disliked",
                data: LikeOrDislike
            });
        }
    }
    catch (error) {
        if (error.message === "Este post no existe") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudo dar like", 500);
        console.log(error);
    }
});
exports.sendOrRemoveLike = sendOrRemoveLike;
const getUserLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const myComments = yield Like_1.Like.find({
            where: { user: { id: userId } },
            relations: {
                post: true,
                user: true
            },
            select: {
                post: { id: true, title: true, description: true }
            }
        });
        if (myComments.length > 0) {
            res.status(200).json({
                success: true,
                message: "Post que te han gustado cargados correctamente",
                data: myComments
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `Aun no has dado like a ningún post`
            });
        }
    }
    catch (error) {
        (0, handleError_1.handleError)(res, "No se pudieron traer los posts que te gustan", 500);
    }
});
exports.getUserLikes = getUserLikes;
const getPostLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const myPosts = yield Like_1.Like.find({
            where: { post: { id: parseInt(postId) } },
            relations: {
                user: true,
                post: true
            },
            select: {
                user: { id: true, nickname: true },
                post: { id: true }
            }
        });
        if (myPosts.length === 0) {
            res.status(200).json({
                success: true,
                message: "Aun no existen likes para este post",
                data: []
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `Likes a este post cargados`,
                data: myPosts
            });
        }
    }
    catch (error) {
        (0, handleError_1.handleError)(res, "No se pudieron traer los likes a este post", 500);
    }
});
exports.getPostLikes = getPostLikes;
