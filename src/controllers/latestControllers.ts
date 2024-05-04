
import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { Latest } from "../models/Latest";

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

// export const getMyPosts = async (req: Request, res: Response) => {
//     try {
//         const userId = req.tokenData.userId

//         const myPosts = await Post.find({
//             where: { owner: { id: userId } },
//             relations: {
//                 owner: true
//             },
//         select: {
//                 id: true,
//                 title: true,
//                 description: true,
//                 topic: true,
//                 picUrl: true,
//                 owner: { id: true, nickname:true },
//                 createdAt: true,
//                 updatedAt:true
//             }
//         })

//         res.status(200).json(
//             {
//                 success: true,
//                 message: `Tus posts han sido cargados correctamente`,
//                 data: myPosts
//             }
//         )
//     } catch (error) {
//         handleError(res, "No se pudieron traer tus posts", 500)
//     }
// }

// export const createPost = async (req: Request, res: Response) => {
//     try {
//         const [title, description, picUrl] = req.body

//         if (title.length > 250) {
//             throw new Error("Tu titulo no puede tener mas de 250 caracteres")
//         }
//         if (picUrl.length > 250) {
//             throw new Error("Tu enlace es demasiado largo")
//         }
//         if (description.length > 1000) {
//             throw new Error("Tu descripción es superior al límite de 1000 caracteres")
//         }

//         const newPost = await Post.create({
//           title: title,
//           description:description,
//           picUrl:picUrl,
//         }).save()

//         res.status(201).json(
//             {
//                 success: true,
//                 message: `Post publicado correctamente`
//             }
//         )
//     } catch (error: any) {
//         if (error.message === "Tu titulo no puede tener mas de 250 caracteres") {
//             return handleError(res, error.message, 404)
//         }
//         if (error.message === "Tu enlace es demasiado largo") {
//             return handleError(res, error.message, 404)
//         }
//         if (error.message === "Tu descripción es superior al límite de 1000 caracteres") {
//             return handleError(res, error.message, 404)
//         }
//         handleError(res, "No se pudo crear tu Post", 500)
//     }
// }

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
