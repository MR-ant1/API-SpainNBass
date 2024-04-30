
import { Request, Response } from "express";
import { User } from "../models/User";

export const getAllUsers = (req: Request, res: Response) => {
    res.status(200).json(
        {
            success: true,
            message: 'Users retrieved succesfully'
        }
    )
}


export const updateProfile = (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        const { nickname, favSubgenre, preference, turntable, email } = req.body

        // if (email) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "first Name, lastName and email are needed"
        //     })
        // }
        
        const userUpdated = User.update(
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

export const deleteUser = (req: Request, res: Response) => {
    res.status(200).json(
        {
            success: true,
            message: "User deleted succesfully"
        }
    )
}