
import { Request, Response } from "express";
import { User } from "../models/User";
import { handleError } from "../utils/handleError"
import { error } from "console";
import { Like } from "../models/Like";

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
    } catch (error: any) {
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
        const user = await User.findOne({
            where:
                { id: userId }
        },
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

        if (nickname.length < 3 || nickname.length > 20) {
            throw new Error("Tu nickname tiene que tener  3 o más caracteres y menos de 21")
        }

        if (turntable && turntable.length < 3) {
            throw new Error("El campo Equipo y RRSS tiene que tener mas de 2 caracteres")
        }

        const userUpdated = await User.update(
            { id: userId },
            {
                nickname: nickname,
                favSubgenre: favSubgenre,
                preference: preference,
                turntable: turntable,
            }
        )
        const newProfile = await User.find({
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
        }
        )
        res.status(200).json(
            {
                success: true,
                message: "Perfil actualizado correctamente",
                data: newProfile
            }
        )
    } catch (error: any) {
        if (error.message === "El campo Equipo y RRSS tiene que tener mas de 3 caracteres") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Tu nickname tiene que tener  3 o más caracteres y menos de 21") {
            return handleError(res, error.message, 400)
        }

        handleError(res, "No se pudo actualizar tu perfil", 500)
    }
}

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId

        const userDeleting: any = await User.findOne({ where: { id: userId } })


        const deletedUser = await User.delete(userDeleting)

        res.status(200).json(
            {
                success: true,
                message: "Tu cuenta se ha borrado correctamente",
            }
        )

    } catch (error) {
        handleError(res, "No se pudo eliminar tu cuenta", 500)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        const userDeletedId = req.params.id

        const userDeleted: any = await User.findOne({ where: { id: parseInt(userDeletedId) } })

        const deletedUser = await User.delete(userDeleted)

        res.status(200).json(
            {
                success: true,
                message: "Este usuario ha sido borrado correctamente",
            }
        )

    } catch (error) {
        handleError(res, "No se pudo eliminar al usuario", 500)
    }

}

export const getUserLikes = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId

        const myPosts = await Like.find({
            where: { user: { id: userId } },
            relations: {
                post: true
            },
            // select: {
            //     user: {id:true,nickname:true}
            // }
        })
        if (myPosts.length === 0) {
            res.status(200).json(
                {
                    success: true,
                    message: "Aun no has dado like a ningún post"
                }
            )
        } else {
            res.status(200).json(
                {
                    success: true,
                    message: `Post que te han gustado cargados correctamente`,
                    data: myPosts
                })
        }

    } catch (error) {
        handleError(res, "No se pudieron traer los posts que te gustan", 500)
    }
}