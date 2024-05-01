
import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const nickname = req.body.nickname;
        const favSubgenre = req.body.favSubgenre;
        const preference = req.body.preference;
        const turntable = req.body.turntable;
        const email = req.body.email;
        const password = req.body.password;

        if (nickname.length < 3 || turntable.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Debe tener mas de 2 caracteres"
            })
        }

        if (password.length < 8 || password.length > 14) {
            return res.status(400).json({
                success: false,
                message: "Contraseña debe tener entre 8 y 14 caracteres"
            })
        }


        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Formato de email incorrecto"
                }
            )
        }
        const passwordEncrypted = bcrypt.hashSync(password, 5)

        const newUser = await User.create({
            nickname: nickname,
            favSubgenre: favSubgenre,
            preference: preference,
            turntable:turntable,
            email: email,
            password: passwordEncrypted,
            
        }).save()
        res.status(201).json({
            success: true,
            message: "Usuario registrado",
            data: nickname
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Usuario no pudo ser registrado",
            error: error
        })
    }
}

export const login = async (req: Request, res: Response) => {

    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email y contraseña son obligatorios"
            })
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Formato de email incorrecto"
                }
            )
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
            return res.status(400).json({
                success: false,
                message: "Email o contraseña incorrectos"
            })
        }

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Email o contraseña incorrectos"
            })
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

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "No se pudo iniciar sesión",
            error: error
        })
    }
}
