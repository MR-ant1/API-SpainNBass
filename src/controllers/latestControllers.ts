
import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { Latest } from "../models/Latest";
import { title } from "process";
import { describe } from "node:test";

export const getLatests = async (req: Request, res: Response) => {
    try {
        const latests = await Latest.find({relations:{user:true},
        select:{user: {nickname:true}}})

        if (!latests) {
            throw new Error('No se encontraron noticias')
        }

        res.status(200).json(
            {
                success: true,
                message: "Noticias cargadas correctamente",
                data: latests
            }
        )
    } catch (error: any) {
        if (error.message === "No se encontraron posts de esta categoría") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudieron traer los posts", 500)
    }
}

export const createLatest =  (req: Request, res: Response) => {
    try {
        const title = req.body.title
        const description = req.body.description
        const picUrl = req.body.picUrl
        const userId = req.tokenData.userId

        const createLatest = Latest.create({
            title: title,
            description: description,
            picUrl: picUrl,
            user: { id: userId }
        }).save()

        res.status(201).json(
            {
                success: true,
                message: `La noticia se ha creado correctamente`,
            }
        )
    } catch (error) {
        handleError(res, "No se pudo crear la noticia", 500)
    }
}

export const updateLatest = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData?.userId
        const title = req.body.title
        const description = req.body.description
        const picUrl = req.body.picUrl
        const latestId = req.params.id

        const isOwned = await Latest.findOne(
            {where:
                {id:parseInt(latestId)}
            // relations:{
            //     user:true
            // }
        })

        if (isOwned?.user?.id !== userId) {
            throw new Error("No se puede actualizar el post de otro usuario")
        }
        
        const latestUpdated: Object = await Latest.update(
            { id: parseInt(latestId) },
            {
            title: title,
            description: description,
            picUrl: picUrl
            }
        )
        res.status(200).json(
        {
            success: true,
            message: "Perfil actualizado correctamente",
            data:latestUpdated
        }
    )
} catch (error:any) {
    if (error.message === "No se puede actualizar el post de otro usuario") {
        return handleError(res, error.message, 404)
    }
    if (error.message === "Formato de email incorrecto") {
        return handleError(res, error.message, 404)
    }
    handleError(res, "No se pudo actualizar noticia", 500); console.log(error)
}
}

// export const deleteMyPost = async (req: Request, res: Response) => {
//     try {
//         const userId = req.tokenData.userId;
//         const postId = req.params.id;
        
//         const postDeleted: any = await Post.find({where: {id:userId}, 
//         relations: {
//             owner:true
//         }})
//     console.log(postDeleted)

//         if (userId !== postDeleted.owner.id) {
//             throw new Error("No puedes borrar el post de otro usuario")
//         }
//         console.log(postDeleted)
        
//         await Post.remove(postDeleted)
           
//         res.status(200).json(
//             {
//                 success: true,
//                 message: "Se ha borrado tu post correctamente"
//             }
//         )
        
//     } catch (error: any) {
//         if (error.message === "No puedes borrar el post de otro usuario") {
//             return handleError(res, error.message, 400)
//         }
//         handleError(res, "No se pudo eliminar tu post", 500)
//     }
    
// }
