
import { Request, Response } from "express";
import { User } from "../models/User";
import { handleError } from "../utils/handleError"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit as number


        if (limit > 25) {
            throw new Error("El máximo de usuarios por página es de 25")
        }

        const users = await User.find(

            {
                select: {
                    id: true,
                    nickname: true,
                    favSubgenre: true,
                    preference: true,
                    turntable: true,
                    email: true
                },
                take: limit,
                skip: skip
            }
        )
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "No existen usuarios",
            })
        }
        res.status(200).json(
            {
                success: true,
                message: 'Users retrieved succesfully',
                data: users
            }
        )
    } catch (error:any) {
        if (error.message === "El máximo de usuarios por página es de 25") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "No existen usuarios") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant update users", 500)
    }
}

export const getMyProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        const user = await User.findOneBy(
            {id:userId},
        )
        res.status(200).json(
            {
                success: true,
                message: 'Users retrieved succesfully',
                data: user
            }
        )
    } catch (error) {
        handleError(res, "Cant update users", 500)
    }
}


export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        const { nickname, favSubgenre, preference, turntable, email } = req.body
        
        const checkEmail = await User.findOne({
            where: { email: email }
        })

        if (email && checkEmail) {
            throw new Error("Email ya en uso")
        }
        
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            throw new Error("Formato de email incorrecto")
        }

        const checkNickname = await User.findOne({
            where: { nickname: nickname  }
        })

        if (nickname && checkNickname) {
            throw new Error("Nickname ya en uso")
        }
        
        const userUpdated = await User.update(
            { id: userId },
            {
                nickname:nickname,
                favSubgenre: favSubgenre,
                preference: preference,
                turntable: turntable,
                email: email
            }
        )
        
        
        res.status(200).json(
        {
            success: true,
            message: "Perfil actualizado correctamente",
            nickname, favSubgenre, preference, turntable, email
        }
    )
} catch (error:any) {
    if (error.message === "Nickname ya en uso") {
        return handleError(res, error.message, 404)
    }
    if (error.message === "Email ya en uso") {
        return handleError(res, error.message, 404)
    }
    if (error.message === "Formato de email incorrecto") {
        return handleError(res, error.message, 404)
    }
    handleError(res, "Cant update users", 500)
}
}

export const deleteUser = async (req: Request, res: Response) => {
    res.status(200).json(
        {
            success: true,
            message: "User deleted succesfully"
        }
    )
}