
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
                message: "nickname and turntable must contain at least 3 characters"
            })
        }

        if (password.length < 8 || password.length > 14) {
            return res.status(400).json({
                success: false,
                message: "Password must contain between 8 and 14 characters"
            })
        }


        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email format invalid"
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
            message: "User registered succesfully",
            data: nickname
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be registered",
            error: error
        })
    }
}

