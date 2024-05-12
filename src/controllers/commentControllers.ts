
import { Request, Response } from "express";
import { Comment } from "../models/Comment";
import { handleError } from "../utils/handleError"
import { Post } from "../models/Post";

export const getPostComments = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id

        const findPost = await Post.findOne({ where: { id: parseInt(postId) } })

        if (!findPost) {
            throw new Error("Este post no existe")
        }

        const comments = await Comment.find(
            {
                where:
                {
                    post: { id: parseInt(postId) }
                },
                relations: {
                    user: true
                }
            }
        )

        if (comments.length > 0) {
            res.status(200).json(
                {
                    success: true,
                    message: 'Comentarios cargaron correctamente',
                    data: comments
                }
            )
        } else {
            res.status(200).json(
                {
                    success: true,
                    message: 'Este post aun no tiene comentarios',
                    data: []
                }
            )
        }

    } catch (error: any) {
        if (error.message === "Este post no existe") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "No se pudieron cargar los comentarios", 500); console.log(error)
    }
}

export const createComment = async (req: Request, res: Response) => {
    try {
        const { comment, url } = req.body
        const userId = req.tokenData.userId
        const postId = req.params.id

        if (!comment || comment.length < 3) {
            throw new Error("Tu comentario debe contener mínimo 3 caracteres")
        }

        if (comment.length > 1000) {
            throw new Error("Tu comentario es superior al límite de 1000 caracteres")
        }
        if (url && url.length > 250 || url && url.length < 3) {
            throw new Error("El enlace debe tener entre 3 y 250 caracteres")
        }

        const findPost = await Post.findOne({ where: { id: parseInt(postId) } })

        if (!findPost) {
            throw new Error("Este post no existe")
        }

        const newComment = await Comment.create({
            comment: comment,
            url: url,
            user: { id: userId },
            post: { id: parseInt(postId) },
        }).save()

        const commentData = await Comment.find({
            where: { id: newComment.id },
            select: {
                id: true,
                comment: true,
                url: true,
                createdAt: true,
                user: { id: true, nickname: true }
            }
        })

        res.status(201).json(
            {
                success: true,
                message: `Comentario publicado correctamente`,
                data: commentData
            }
        )
    } catch (error: any) {
        if (error.message === "Tu comentario es superior al límite de 1000 caracteres") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Tu comentario debe contener mínimo 3 caracteres") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "El enlace debe tener entre 3 y 250 caracteres") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Este post no existe") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudo crear tu comentario", 500); console.log(error)
    }
}

export const deleteMyComment = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const commentId = req.params.id;

        const findComment = await Comment.find({ where: { id: parseInt(commentId) } })

        if (findComment.length === 0) {
            throw new Error("Este comentario no existe")
        }

        const commentDeleted = await Comment.findOne({
            where: {
                id: parseInt(commentId),
                user: { id: userId }
            },
            relations: {
                user: true
            },
            select: {
                id: true,
                user: { id: true }
            }
        })
        if (commentDeleted?.user.id !== userId) {
            throw new Error("No puedes borrar el comentario de otro usuario")
        } else {
            await Comment.remove(commentDeleted)

            res.status(200).json(
                {
                    success: true,
                    message: "Se ha borrado tu comentario correctamente"
                })
        }

    } catch (error: any) {
        if (error.message === "No puedes borrar el comentario de otro usuario") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Este comentario no existe") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudo eliminar tu comentario", 500)
    }
}

export const deleteOthersComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.id;

        const findComment = await Comment.find({ where: { id: parseInt(commentId) } })

        if (findComment.length === 0) {
            throw new Error("Este comentario no existe")
        }

        const commentDeleted = await Comment.find({
            where: {
                id: parseInt(commentId)
            },
            relations: {
                user: true
            },
            select: {
                id: true,
                user: { id: true }
            }
        })
        await Comment.remove(commentDeleted)

        res.status(200).json(
            {
                success: true,
                message: "Se ha borrado el comentario correctamente"
            })
    }

    catch (error: any) {
        if (error.message === "Este comentario no existe") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudo eliminar tu comentario", 500)
    }
}