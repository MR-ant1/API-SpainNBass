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
exports.login = exports.registerUser = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleError_1 = require("../utils/handleError");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nickname = req.body.nickname;
        const favSubgenre = req.body.favSubgenre;
        const preference = req.body.preference;
        const turntable = req.body.turntable;
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            throw new Error("Email y password son obligatorios");
        }
        if (!nickname) {
            throw new Error("El nickname es obligatorio");
        }
        if (nickname.length < 3 || nickname.length > 20) {
            throw new Error("Nickname y turntable deben tener mas de 2 y menos de 20 caracteres");
        }
        if (password.length < 8 || password.length > 14) {
            throw new Error("Contraseña debe tener entre 8 y 14 caracteres");
        }
        const checkEmailExists = yield User_1.User.findOne({
            where: { email: email }
        });
        if (checkEmailExists) {
            throw new Error("Este email ya está en uso");
        }
        const checkNicknameExists = yield User_1.User.findOne({
            where: { nickname: nickname }
        });
        if (checkNicknameExists) {
            throw new Error("Este nickname ya está en uso");
        }
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            throw new Error("Formato de email incorrecto");
        }
        const passwordEncrypted = bcrypt_1.default.hashSync(password, 5);
        const newUser = yield User_1.User.create({
            nickname: nickname,
            favSubgenre: favSubgenre,
            preference: preference,
            turntable: turntable,
            email: email,
            password: passwordEncrypted
        }).save();
        const createdUser = yield User_1.User.findOne({
            where: {
                nickname: nickname
            }
        });
        res.status(201).json({
            success: true,
            message: "Usuario registrado",
            data: createdUser
        });
    }
    catch (error) {
        if (error.message === "Email y password son obligatorios") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Nickname y turntable deben tener mas de 2 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "El nickname es obligatorio") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Contraseña debe tener entre 8 y 14 caracteres") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "Este email ya está en uso") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "Este nickname ya está en uso") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        if (error.message === "Formato de email incorrecto") {
            return (0, handleError_1.handleError)(res, error.message, 404);
        }
        (0, handleError_1.handleError)(res, "Cant update users", 500);
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            throw new Error("Email y contraseña son obligatorios");
        }
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            throw new Error("Formato de email incorrecto");
        }
        const user = yield User_1.User.findOne({
            where: {
                email: email
            },
            select: {
                id: true,
                nickname: true,
                password: true,
                email: true,
                role: true
            }
        });
        if (!user) {
            throw new Error("Email o contraseña incorrectos");
        }
        const isValidPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!isValidPassword) {
            throw new Error("Email o contraseña incorrectos");
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            role: user.role,
            nickname: user.nickname,
            favSubgenre: user.favSubgenre
        }, process.env.JWT_SECRET, {
            expiresIn: "100h"
        });
        res.status(200).json({
            success: true,
            message: "Usuario logueado correctamente",
            token: token
        });
    }
    catch (error) {
        if (error.message === "Email y contraseña son obligatorios") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Formato de email incorrecto") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        if (error.message === "Email o contraseña incorrectos") {
            return (0, handleError_1.handleError)(res, error.message, 400);
        }
        (0, handleError_1.handleError)(res, "Cant update users", 500);
    }
});
exports.login = login;
