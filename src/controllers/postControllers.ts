
import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { Post } from "../models/Post";

export const getGenrePosts = async (req: Request, res: Response) => {
    try {
        const topic = req.params.topic
        const posts = await Post.find({
            where: { topic: topic },
            
            select: {
                title: true,
                description: true,
                picUrl: true,
                owner: {id:true}
            }
        })

        if (!posts) {
            throw new Error('No se encontraron posts de esta categoría')
        }

        res.status(200).json(
            {
                success: true,
                message: `Posts de ${topic} cargaron correctamente`,
                data: posts
            }
        )
    } catch (error: any) {
        if (error.message === "No se encontraron posts de esta categoría") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudieron traer los posts", 500)
    }
}

export const getMyPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        
        const posts = await Post.find({
        where: { owner:{ id:userId} }
        })

        if (posts.length === 0) {
            throw new Error('No se encontraron posts creados por ti')
        }

        res.status(200).json(
            {
                success: true,
                message: `Tus posts han sido cargados correctamente`,
                data: posts
            }
        )
    } catch (error: any) {
        if (error.message === "No se encontraron posts creados por ti") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudieron traer tus posts", 500)
    }
}