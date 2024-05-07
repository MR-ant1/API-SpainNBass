
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
                },
                relations:{
                    user:true
                },
                select: {
                    user: {nickname:true, favSubgenre:true}
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
                    message: 'Like',
                    data:LikeOrDislike
                }
            )

        }else {
            await Like.remove(LikeOrDislike)

            res.status(201).json(
                {
                    success: true,
                    message: "Disliked",
                    data:LikeOrDislike
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

export const getPostLikes = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id

        const myPosts = await Like.find({
            where: { post: { id: parseInt(postId) } },
            relations: {
                user: true
            },
            // select: {
            //     user: {id:true,nickname:true}
            // }
        })
        if (myPosts.length === 0) {
            res.status(200).json(
                {
                    success: true,
                    message: "Aun no existen likes para este post"
                }
            )
        } else {
            res.status(200).json(
                {
                    success: true,
                    message: `Likes a este post cargados`,
                    data: myPosts
                })
        }

    } catch (error) {
        handleError(res, "No se pudieron traer los likes a este post", 500)
    }
}