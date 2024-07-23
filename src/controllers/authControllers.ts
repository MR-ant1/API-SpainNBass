
import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { handleError } from "../utils/handleError";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const nickname = req.body.nickname;
        const favSubgenre = req.body.favSubgenre;
        const preference = req.body.preference;
        const turntable = req.body.turntable;
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            throw new Error("Email y password son obligatorios")
        }
        if (!nickname) {
            throw new Error("El nickname es obligatorio")
        }

        if (nickname.length < 3 || nickname.length > 20) {
            throw new Error("Nickname y turntable deben tener mas de 2 y menos de 20 caracteres")
        }

        if (password.length < 8 || password.length > 14) {
            throw new Error("Contraseña debe tener entre 8 y 14 caracteres")
        }

        const checkEmailExists = await User.findOne({
            where:
                { email: email }
        })

        if (checkEmailExists) {
            throw new Error("Este email ya está en uso")
        }

        const checkNicknameExists = await User.findOne({
            where: { nickname: nickname }
        })

        if (checkNicknameExists) {
            throw new Error("Este nickname ya está en uso")
        }


        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            throw new Error("Formato de email incorrecto")
        }
        const passwordEncrypted = bcrypt.hashSync(password, 5)

        const newUser = await User.create({
            nickname: nickname,
            favSubgenre: favSubgenre,
            preference: preference,
            turntable: turntable,
            email: email,
            password: passwordEncrypted

        }).save()

        const createdUser = await User.findOne({
            where:
            {
                nickname: nickname
            }
        })

        res.status(201).json({
            success: true,
            message: "Usuario registrado",
            data: createdUser
        })
    } catch (error: any) {
        if (error.message === "Email y password son obligatorios") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Nickname y turntable deben tener mas de 2 caracteres") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "El nickname es obligatorio") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Contraseña debe tener entre 8 y 14 caracteres") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Este email ya está en uso") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Este nickname ya está en uso") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Formato de email incorrecto") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant register user", 500)
    }
}

export const login = async (req: Request, res: Response) => {

    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            throw new Error("Email y contraseña son obligatorios")
        }


        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            throw new Error("Formato de email incorrecto")
        }

        const user = await User.findOne(
            {
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
            }
        )

        if (!user) {
            throw new Error("Email o contraseña incorrectos")

        }

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            throw new Error("Email o contraseña incorrectos")
        }

        const token = jwt.sign(
            {
                userId: user.id,
                role: user!.role,
                nickname: user.nickname,
                favSubgenre: user.favSubgenre

            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "100h"
            }
        )

        res.status(200).json({
            success: true,
            message: "Usuario logueado correctamente",
            token: token
        })

    } catch (error: any) {
        if (error.message === "Email y contraseña son obligatorios") {
            return handleError(res, error.message, 400)
        }

        if (error.message === "Formato de email incorrecto") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Email o contraseña incorrectos") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant login user", 500)
    }
}
