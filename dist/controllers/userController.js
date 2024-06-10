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
exports.deleteUser = exports.deleteAccount = exports.updateProfile = exports.getMyProfile = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const handleError_1 = require("../utils/handleError");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const limit = Number(req.query.limit) || 10
        // const page = Number(req.query.page) || 1
        // const skip = (page - 1) * limit as number
        // if (limit > 25) {
        //     throw new Error("El máximo de usuarios por página es de 25")
        // }
        const users = yield User_1.User.find();
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "No existen usuarios",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: 'Usuarios cargados correctamente',
            data: users
        });
    }
    catch (error) {
        if (error.message === "El máximo de usuarios por página es de 25") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "No existen usuarios") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "Cant update users", 500);
    }
});
exports.getAllUsers = getAllUsers;
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const user = yield User_1.User.findOne({
            where: { id: userId }
        });
        res.status(200).json({
            success: true,
            message: 'Users retrieved succesfully',
            data: user
        });
    }
    catch (error) {
        (0, handleError_1.handleError)(res, "Cant update users", 500);
    }
});
exports.getMyProfile = getMyProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const { nickname, favSubgenre, preference, turntable, email } = req.body;
        if (nickname.length < 3 || nickname.length > 20) {
            throw new Error("Tu nickname tiene que tener  3 o más caracteres y menos de 21");
        }
        if (turntable && turntable.length < 3) {
            throw new Error("El campo Equipo y RRSS tiene que tener mas de 2 caracteres");
        }
        const findNickname = yield User_1.User.find({ where: { nickname: nickname } });
        if (findNickname.length > 0) {
            throw new Error("Este nickname ya está en uso");
        }
        const userUpdated = yield User_1.User.update({ id: userId }, {
            nickname: nickname,
            favSubgenre: favSubgenre,
            preference: preference,
            turntable: turntable,
        });
        const newProfile = yield User_1.User.find({
            where: {
                id: userId
            },
            select: {
                nickname: nickname,
                favSubgenre: favSubgenre,
                preference: preference,
                turntable: turntable,
                email: email
            }
        });
        res.status(200).json({
            success: true,
            message: "Perfil actualizado correctamente",
            data: newProfile
        });
    }
    catch (error) {
        if (error.message === "El campo Equipo y RRSS tiene que tener mas de 3 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Este nickname ya está en uso") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Tu nickname tiene que tener  3 o más caracteres y menos de 21") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        (0, handleError_1.handleError)(res, "No se pudo actualizar tu perfil", 500);
    }
});
exports.updateProfile = updateProfile;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.userId;
        const userDeleting = yield User_1.User.findOne({ where: { id: userId } });
        if (userDeleting.role === "super_admin") {
            throw new Error("Tu cuenta super admin no puede ser borrada");
        }
        const deletedUser = yield User_1.User.delete(userDeleting);
        res.status(200).json({
            success: true,
            message: "Tu cuenta se ha borrado correctamente",
        });
    }
    catch (error) {
        if (error.message === "Tu cuenta super admin no puede ser borrada") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        (0, handleError_1.handleError)(res, "No se pudo eliminar tu cuenta", 500);
    }
});
exports.deleteAccount = deleteAccount;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDeletedId = req.params.id;
        const userDeleted = yield User_1.User.findOne({
            where: { id: parseInt(userDeletedId) },
            select: {
                id: true,
                role: true
            }
        });
        if (userDeleted.length === 0) {
            throw new Error("Este usuario no existe");
        }
        if (userDeleted.role !== "user") {
            throw new Error("No puedes eliminar cuentas admin ni tu propia cuenta super_admin");
        }
        const deletingUser = yield User_1.User.remove(userDeleted);
        res.status(200).json({
            success: true,
            message: "Este usuario ha sido borrado correctamente",
            data: userDeleted
        });
    }
    catch (error) {
        if (error.message === "No puedes eliminar cuentas admin ni tu propia cuenta super_admin") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Este usuario no existe") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "No se pudo eliminar el usuario", 500);
    }
});
exports.deleteUser = deleteUser;
