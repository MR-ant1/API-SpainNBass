
import { Request, Response } from "express";
import { Comment } from "../models/Comment";
import { handleError } from "../utils/handleError"
import { Post } from "../models/Post";

export const getPostComments = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id

        const findPost = await Post.findOne({where: {id:parseInt(postId)}})

        if (!findPost) {
            throw new Error("Este post no existe")
        }

        const comments = await Comment.find(
            {
                where:
                {
                    post: { id: parseInt(postId) }
                }
            }
        )

        if(comments.length > 0) {
           res.status(200).json(
            {
                success: true,
                message: 'Comentarios cargaron correctamente',
                data: comments
            }
        ) 
        }else {
            res.status(200).json(
                {
                    success: true,
                    message: 'Este post aun no tiene comentarios'
                }
            ) 
        }
        
    } catch (error: any) {
        if (error.message === "Este post no existe") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "No se pudieron cargar los comentarios", 500);console.log(error)
    }
}