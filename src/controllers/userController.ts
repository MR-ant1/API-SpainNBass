
import { Request, Response } from "express";
import { User } from "../models/User";
import { handleError } from "../utils/handleError"
import { error } from "console";

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

        if (turntable.length < 3) {
            throw new Error("El campo Equipo y RRSS tiene que tener mas de 3 caracteres")
        }
        
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            throw new Error("Formato de email incorrecto")
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
    if (error.message === "El campo Equipo y RRSS tiene que tener mas de 3 caracteres") {
        return handleError(res, error.message, 404)
    }
    if (error.message === "Formato de email incorrecto") {
        return handleError(res, error.message, 404)
    }
    handleError(res, "Cant update users", 500)
}
}

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId

        const userDeleting: any = await User.findOne({where:{id:userId}})
      

        const deletedUser = await User.delete(userDeleting)
           
        res.status(200).json(
            {
                success: true,
                message: "Tu cuenta se ha borrado correctamente",
            }
        )
        
    } catch (error) {
        handleError(res, "Cant delete user", 500)
    }
    
}