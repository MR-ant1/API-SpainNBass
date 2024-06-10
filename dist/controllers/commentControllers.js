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
exports.deleteOthersComment = exports.deleteMyComment = exports.createComment = exports.getPostComments = void 0;
const Comment_1 = require("../models/Comment");
const handleError_1 = require("../utils/handleError");
const Post_1 = require("../models/Post");
const getPostComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const findPost = yield Post_1.Post.findOne({ where: { id: parseInt(postId) } });
        if (!findPost) {
            throw new Error("Este post no existe");
        }
        const comments = yield Comment_1.Comment.find({
            where: {
                post: { id: parseInt(postId) }
            },
            relations: {
                user: true
            }
        });
        if (comments.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Comentarios cargaron correctamente',
                data: comments
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Este post aun no tiene comentarios',
                data: []
            });
        }
    }
    catch (error) {
        if (error.message === "Este post no existe") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        (0, handleError_1.handleError)(res, "No se pudieron cargar los comentarios", 500);
        console.log(error);
    }
});
exports.getPostComments = getPostComments;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, url } = req.body;
        const userId = req.tokenData.userId;
        const postId = req.params.id;
        if (!comment || comment.length < 3) {
            throw new Error("Tu comentario debe contener mínimo 3 caracteres");
        }
        if (comment.length > 1000) {
            throw new Error("Tu comentario es superior al límite de 1000 caracteres");
        }
        if (url && url.length > 250 || url && url.length < 3) {
            throw new Error("El enlace debe tener entre 3 y 250 caracteres");
        }
        const findPost = yield Post_1.Post.findOne({ where: { id: parseInt(postId) } });
        if (!findPost) {
            throw new Error("Este post no existe");
        }
        const newComment = yield Comment_1.Comment.create({
            comment: comment,
            url: url,
            user: { id: userId },
            post: { id: parseInt(postId) },
        }).save();
        const commentData = yield Comment_1.Comment.find({
            where: { id: newComment.id },
            select: {
                id: true,
                comment: true,
                url: true,
                createdAt: true,
                user: { id: true, nickname: true }
            }
        });
        res.status(201).json({
            success: true,
            message: `Comentario publicado correctamente`,
            data: commentData
        });
    }
    catch (error) {
        if (error.message === "Tu comentario es superior al límite de 1000 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "Tu comentario debe contener mínimo 3 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "El enlace debe tener entre 3 y 250 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "Este post no existe") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudo crear tu comentario", 500);
        console.log(error);
    }
});
exports.createComment = createComment;
const deleteMyComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const commentId = req.params.id;
        const findComment = yield Comment_1.Comment.find({ where: { id: parseInt(commentId) } });
        if (findComment.length === 0) {
            throw new Error("Este comentario no existe");
        }
        const commentDeleted = yield Comment_1.Comment.findOne({
            where: {
                id: parseInt(commentId),
                user: { id: userId }
            },
            relations: {
                user: true
            },
            select: {
                id: true,
                user: { id: true }
            }
        });
        if ((commentDeleted === null || commentDeleted === void 0 ? void 0 : commentDeleted.user.id) !== userId) {
            throw new Error("No puedes borrar el comentario de otro usuario");
        }
        else {
            yield Comment_1.Comment.remove(commentDeleted);
            res.status(200).json({
                success: true,
                message: "Se ha borrado tu comentario correctamente"
            });
        }
    }
    catch (error) {
        if (error.message === "No puedes borrar el comentario de otro usuario") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Este comentario no existe") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudo eliminar tu comentario", 500);
    }
});
exports.deleteMyComment = deleteMyComment;
const deleteOthersComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.id;
        const findComment = yield Comment_1.Comment.find({ where: { id: parseInt(commentId) } });
        if (findComment.length === 0) {
            throw new Error("Este comentario no existe");
        }
        const commentDeleted = yield Comment_1.Comment.find({
            where: {
                id: parseInt(commentId)
            },
            relations: {
                user: true
            },
            select: {
                id: true,
                user: { id: true }
            }
        });
        yield Comment_1.Comment.remove(commentDeleted);
        res.status(200).json({
            success: true,
            message: "Se ha borrado el comentario correctamente"
        });
    }
    catch (error) {
        if (error.message === "Este comentario no existe") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudo eliminar tu comentario", 500);
    }
});
exports.deleteOthersComment = deleteOthersComment;
