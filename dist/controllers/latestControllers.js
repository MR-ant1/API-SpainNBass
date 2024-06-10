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
exports.deleteLatest = exports.updateLatest = exports.createLatest = exports.getLatests = void 0;
const handleError_1 = require("../utils/handleError");
const Latest_1 = require("../models/Latest");
const getLatests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latests = yield Latest_1.Latest.find({
            relations: { user: true },
            select: { user: { nickname: true } }
        });
        if (!latests) {
            throw new Error('No se encontraron noticias');
        }
        const sortedLatests = latests.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        res.status(200).json({
            success: true,
            message: "Noticias cargadas correctamente",
            data: sortedLatests
        });
    }
    catch (error) {
        if (error.message === "No se encontraron posts de esta categoría") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudieron traer los posts", 500);
    }
});
exports.getLatests = getLatests;
const createLatest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const picUrl = req.body.picUrl;
        if (!title || !description) {
            throw new Error("Título y descripción son obligatorios");
        }
        if (title.length < 3 || title.length > 250) {
            throw new Error("El título debe tener entre 3 y 250 caracteres");
        }
        if (description.length < 3 || description.length > 1000) {
            throw new Error("La descripción debe tener entre 3 y 250 caracteres");
        }
        const createLatest = Latest_1.Latest.create({
            title: title,
            description: description,
            picUrl: picUrl
        }).save();
        const newLatest = yield Latest_1.Latest.find(createLatest);
        res.status(201).json({
            success: true,
            message: `La noticia se ha creado correctamente`,
            data: newLatest
        });
    }
    catch (error) {
        if (error.message === "Título y descripción son obligatorios") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "El título debe tener entre 3 y 250 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "La descripción debe tener entre 3 y 250 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudo crear la noticia", 500);
    }
});
exports.createLatest = createLatest;
const updateLatest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const picUrl = req.body.picUrl;
        const latestId = req.params.id;
        const latestUpdated = yield Latest_1.Latest.update({ id: parseInt(latestId) }, {
            title: title,
            description: description,
            picUrl: picUrl
        });
        res.status(200).json({
            success: true,
            message: "Perfil actualizado correctamente",
            data: { title, description }
        });
    }
    catch (error) {
        if (error.message === "No se puede actualizar el post de otro usuario") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "Formato de email incorrecto") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudo actualizar noticia", 500);
        console.log(error);
    }
});
exports.updateLatest = updateLatest;
const deleteLatest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestId = req.params.id;
        const latestDeleted = yield Latest_1.Latest.findOne({ where: { id: parseInt(latestId) } });
        yield Latest_1.Latest.remove(latestDeleted);
        res.status(200).json({
            success: true,
            message: "Se ha borrado la noticia correctamente"
        });
    }
    catch (error) {
        (0, handleError_1.handleError)(res, "No se pudo eliminar tu post", 500);
    }
});
exports.deleteLatest = deleteLatest;
