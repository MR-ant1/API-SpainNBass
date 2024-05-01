
import { Request, Response } from "express";
import { User } from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
    res.status(200).json(
        {
            success: true,
            message: 'Users retrieved succesfully'
        }
    )
}

export const getMyProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        const user = await User.findOneBy(
            { id: (userId) },

        )
        res.status(200).json(
            {
                success: true,
                message: 'Users retrieved succesfully'
            }
        )
    } catch (error) {
        
    }

    
}


export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        const { nickname, favSubgenre, preference, turntable, email } = req.body

        // const checkEmail = await User.findOne({
        //     where: { email: email }
        // })

        // if (checkEmail) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Este email existe"
        //     })
        // }
        
        const userUpdated = await User.update(
            { id: userId },
            {
                nickname: nickname,
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
            data: userUpdated
        }
    )
} catch (error) {
    res.status(500).json({
        success: false,
        message: "No se pudo actualizar perfil",
        error: error
    })
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