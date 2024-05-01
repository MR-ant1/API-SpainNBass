
import { Request, Response } from "express";
import { User } from "../models/User";
import { handleError } from "../utils/handleError"

export const getAllUsers = async (req: Request, res: Response) => {
    res.status(200).json(
        {
            success: true,
            message: 'Users retrieved succesfully'
        }
    )
}

// export const getMyProfile = async (req: Request, res: Response) => {
//     try {
//         const userId = req.tokenData.userId
//         const user = await User.findOneBy(
//             { id: (userId) },
//             {
//                 nickname: true,
//                 favSubgenre: true,
//                 preference: true,
//                 turntable: true,
//                 email: true
                
//             }

//         )
//         res.status(200).json(
//             {
//                 success: true,
//                 message: 'Users retrieved succesfully'
//             }
//         )
//     } catch (error) {
        
//     }

    
// }


export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        const { nickname, favSubgenre, preference, turntable, email } = req.body

        const checkEmail = await User.findOne({
            where: 
            { 
              email: email,
              nickname:nickname
            }
        })

        if (checkEmail) {
            throw new Error("Email ya en uso")
        }

        const checkNickname = await User.findOne({
            where: {nickname:nickname  }
        })

        if (checkNickname) {
            throw new Error("Nickname ya en uso")
        }
        
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
} catch (error:any) {
    if (error.message === "Nickname ya en uso") {
        return handleError(res, error.message, 404)
    }
    if (error.message === "Email ya en uso") {
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