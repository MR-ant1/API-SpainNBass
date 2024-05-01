
import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { Post } from "../models/Post";

export const getGenrePosts = async (req: Request, res: Response) => {
    try {
        const topic = req.params.topic
        const posts = await Post.find({
           where: {topic:topic}
        })

        if(!posts) {
            throw new Error('No se encontraron posts de esta categoría')
        }

        res.status(200).json(
            {
                success: true,
                message: `Posts de ${topic} cargaron correctamente`,
                data: posts
            }
        )
    } catch (error:any) {
        if (error.message === "No se encontraron posts de esta categoría") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudieron traer los posts", 500)
    }
}