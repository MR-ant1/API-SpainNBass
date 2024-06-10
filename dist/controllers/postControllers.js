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
exports.deleteOtherUserPost = exports.deleteMyPost = exports.updatePostTopic = exports.updateMyPost = exports.createPost = exports.getMyPosts = exports.getGenrePosts = void 0;
const handleError_1 = require("../utils/handleError");
const Post_1 = require("../models/Post");
const getGenrePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = req.params.topic;
        const posts = yield Post_1.Post.find({
            where: { topic: topic },
            relations: { owner: true },
            select: {
                id: true,
                title: true,
                description: true,
                topic: true,
                picUrl: true,
                createdAt: true,
                updatedAt: true
            }
        });
        const sortedPosts = posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        if (posts.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Aun no hay posts en esta categoría",
            });
        }
        switch (topic) {
            case "RaggaJungle":
            case "Club dnb":
            case "Liquid dnb":
            case "NeuroFunk":
            case "Rollers":
            case "Jump Up":
            case "memes":
                {
                    res.status(200).json({
                        success: true,
                        message: `Posts de ${topic} recuperados correctamente`,
                        data: sortedPosts
                    });
                }
        }
    }
    catch (error) {
        if (error.message === "Categoría inexistente")
            (0, handleError_1.handleError)(res, "No se pudo recuperar posts", 500);
    }
});
exports.getGenrePosts = getGenrePosts;
const getMyPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const myPosts = yield Post_1.Post.find({
            where: { owner: { id: userId } },
            relations: {
                owner: true
            },
            select: {
                id: true,
                title: true,
                description: true,
                topic: true,
                picUrl: true,
                owner: { id: true, nickname: true },
                createdAt: true,
                updatedAt: true
            }
        });
        if (myPosts.length === 0) {
            res.status(200).json({
                success: true,
                message: "Aun no existen post creados por ti",
                data: []
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `Tus posts han sido cargados correctamente`,
                data: myPosts
            });
        }
    }
    catch (error) {
        if (error.message === "Esta categoría no existe") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudieron traer tus posts", 500);
    }
});
exports.getMyPosts = getMyPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, picUrl, topic } = req.body;
        const userId = req.tokenData.userId;
        if (title && title.length > 250) {
            throw new Error("Tu titulo no puede tener mas de 250 caracteres");
        }
        if (picUrl && picUrl.length > 250) {
            throw new Error("Tu enlace es demasiado largo");
        }
        if (description.length > 1000) {
            throw new Error("Tu descripción es superior al límite de 1000 caracteres");
        }
        if (!description) {
            throw new Error("La descripción es obligatoria");
        }
        const newPost = yield Post_1.Post.create({
            title: title,
            description: description,
            picUrl: picUrl,
            topic: topic,
            owner: { id: userId }
        }).save();
        //     const createdPost = await Post.find({where: {
        //         id: newPost.id
        //     },
        // relations:{
        //     owner: true
        // }})
        res.status(201).json({
            success: true,
            message: `Post publicado correctamente`,
            data: newPost
        });
    }
    catch (error) {
        if (error.message === "Tu titulo no puede tener mas de 250 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "La descripción es obligatoria") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Tu enlace es demasiado largo") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Tu descripción es superior al límite de 1000 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Categoría incorrecta") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        (0, handleError_1.handleError)(res, "No se pudo crear tu Post", 500);
    }
});
exports.createPost = createPost;
const updateMyPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const { title, description, picUrl } = req.body;
        const postId = req.params.id;
        if (title && title.length > 250) {
            throw new Error("Tu titulo no puede tener mas de 250 caracteres");
        }
        if (picUrl && picUrl.length > 250) {
            throw new Error("Tu enlace supera los 250 caracteres permitidos");
        }
        if (description.length > 1000) {
            throw new Error("Tu descripción es superior al límite de 1000 caracteres");
        }
        const findPost = yield Post_1.Post.find({
            where: {
                id: parseInt(postId)
            }
        });
        if (findPost.length === 0) {
            throw new Error("Este post no existe");
        }
        const authPost = yield Post_1.Post.find({
            where: {
                id: parseInt(postId),
                owner: { id: userId }
            },
            relations: {
                owner: true
            }
        });
        if (authPost.length === 0) {
            throw new Error("No puedes editar este post");
        }
        else {
            const postUpdated = yield Post_1.Post.update({
                id: parseInt(postId),
                owner: { id: userId }
            }, {
                title: title,
                description: description,
                picUrl: picUrl
            });
            const responseData = yield Post_1.Post.find({
                where: {
                    id: parseInt(postId),
                }
            });
            res.status(200).json({
                success: true,
                message: "Post actualizado correctamente",
                data: responseData
            });
        }
    }
    catch (error) {
        if (error.message === "Tu titulo no puede tener mas de 250 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Tu enlace supera los 250 caracteres permitidos") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Tu descripción es superior al límite de 1000 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Este post no existe") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "No puedes editar este post") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudo editar tu Post", 500);
    }
});
exports.updateMyPost = updateMyPost;
const updatePostTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const topic = req.body.topic;
        const findPost = yield Post_1.Post.find({
            where: {
                id: parseInt(postId)
            }
        });
        if (findPost.length === 0) {
            throw new Error("Este post no existe");
        }
        const topicUpdated = yield Post_1.Post.update({ id: parseInt(postId) }, {
            topic: topic
        });
        res.status(200).json({
            success: true,
            message: "Categoría actualizada correctamente"
        });
    }
    catch (error) {
        if (error.message === "Este post no existe") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        (0, handleError_1.handleError)(res, "No se pudo editar el topic", 500);
    }
});
exports.updatePostTopic = updatePostTopic;
const deleteMyPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const postId = req.params.id;
        const findPost = yield Post_1.Post.find({ where: { id: parseInt(postId) } });
        if (findPost.length === 0) {
            throw new Error("Este post no existe");
        }
        const postDeleted = yield Post_1.Post.findOne({
            where: {
                id: parseInt(postId),
                owner: { id: userId }
            },
            relations: {
                owner: true
            },
            select: {
                id: true,
                owner: { id: true }
            }
        });
        if ((postDeleted === null || postDeleted === void 0 ? void 0 : postDeleted.owner.id) !== userId) {
            throw new Error("No puedes borrar el post de otro usuario");
        }
        else {
            yield Post_1.Post.remove(postDeleted);
            res.status(200).json({
                success: true,
                message: "Se ha borrado tu post correctamente"
            });
        }
    }
    catch (error) {
        if (error.message === "No puedes borrar el post de otro usuario") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Este post no existe") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        (0, handleError_1.handleError)(res, "No se pudo eliminar tu post", 500);
    }
});
exports.deleteMyPost = deleteMyPost;
const deleteOtherUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const findPost = yield Post_1.Post.find({
            where: { id: parseInt(postId) }
        });
        if (findPost.length === 0) {
            throw new Error("Este post no existe");
        }
        yield Post_1.Post.remove(findPost);
        res.status(200).json({
            success: true,
            message: "Se ha borrado el post correctamente",
            data: findPost
        });
    }
    catch (error) {
        if (error.message === "Este post no existe") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        (0, handleError_1.handleError)(res, "No se pudo eliminar el post", 500);
    }
});
exports.deleteOtherUserPost = deleteOtherUserPost;
