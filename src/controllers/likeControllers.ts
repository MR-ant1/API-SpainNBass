
import { Request, Response } from "express";
import { handleError } from "../utils/handleError"
import { Like } from "../models/Like";
import { Post } from "../models/Post";


export const sendOrRemoveLike = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        const postId = req.params.id


        const findPost = await Post.find({ where: { id: parseInt(postId) } })

        if (findPost.length === 0) {
            throw new Error("Este post no existe")
        }

        const LikeOrDislike = await Like.find(
            {
                where:
                {
                    user: { id: userId },
                    post: { id: parseInt(postId) }
                }
            })
        if (LikeOrDislike.length === 0) {
            const newCommentPost = await Like.create({
                user: { id: userId },
                post: { id: parseInt(postId) }

            }).save()

            res.status(201).json(
                {
                    success: true,
                    message: 'Like'
                }
            )

        }else {
            await Like.remove(LikeOrDislike)

            res.status(201).json(
                {
                    success: true,
                    message: "Disliked"
                }
            )
        }

        
    } catch (error: any) {
        if (error.message === "Este post no existe") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudo dar like", 500); console.log(error)
    }
}