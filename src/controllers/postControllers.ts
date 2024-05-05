
import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { Post } from "../models/Post";

export const getGenrePosts = async (req: Request, res: Response) => {
    try {
        const topic = req.params.topic



        const posts = await Post.find({
            where: { topic: topic },
            relations: { owner: true },

            select: {
                title: true,
                description: true,
                topic: true,
                picUrl: true
            }
        })

        if (posts.length === 0) {
            return res.status(200).json(
                {
                    success: true,
                    message: "Aun no hay posts en esta categoría",
                    data: posts
                }
            )
        }

        switch (topic) {
            case "RaggaJungle":
            case "Club dnb":
            case "Liquid dnb":
            case "NeuroFunk":
            case "Rollers":
            case "Jump Up":
            case "memes":
                {
                    res.status(200).json(
                        {
                            success: true,
                            message: `Posts de ${topic} recuperados correctamente`,
                            data: posts
                        }
                    )
                }
        }

    } catch (error: any) {
        if (error.message === "Categoría inexistente")
            handleError(res, "No se pudo recuperar posts", 500)
    }
}

export const getMyPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId

        const myPosts = await Post.find({
            where: { owner: { id: userId } },
            relations: {
                owner: true
            },
            select: {
                id: true,
                title: true,
                description: true,
                topic: true,
                picUrl: true,
                owner: { id: true, nickname: true },
                createdAt: true,
                updatedAt: true
            }
        })

        if (myPosts.length === 0) {
            res.status(200).json(
                {
                    success: true,
                    message: "Aun no existen post creados por ti"
                }
            )
        } else {

            res.status(200).json(
                {
                    success: true,
                    message: `Tus posts han sido cargados correctamente`,
                    data: myPosts
                }
            )
        }
    } catch (error: any) {
        if (error.message === "Esta categoría no existe") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudieron traer tus posts", 500)
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, description, picUrl, topic } = req.body
        const userId = req.tokenData.userId
        const userNick = req.tokenData.nickname

        if (title.length > 250) {
            throw new Error("Tu titulo no puede tener mas de 250 caracteres")
        }
        if (picUrl.length > 250) {
            throw new Error("Tu enlace es demasiado largo")
        }
        if (description.length > 1000) {
            throw new Error("Tu descripción es superior al límite de 1000 caracteres")
        }
        if (topic !== ("RaggaJungle" || "Club dnb" || "Liquid dnb" || "NeuroFunk" || "Rollers" || "Jump Up" || "memes")) {
            throw new Error("Categoría incorrecta")
        }

        const newPost = await Post.create({
            title: title,
            description: description,
            picUrl: picUrl,
            topic: topic,
            owner: { id: userId }
        }).save()

        res.status(201).json(
            {
                success: true,
                message: `Post publicado correctamente`
            }
        )
    } catch (error: any) {
        if (error.message === "Tu titulo no puede tener mas de 250 caracteres") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Tu enlace es demasiado largo") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Tu descripción es superior al límite de 1000 caracteres") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Categoría incorrecta") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudo crear tu Post", 500)
    }
}

export const updateMyPost = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId
        const title = req.body.title
        const description = req.body.description
        const picUrl = req.body.picUrl
        const postId = req.params.id
        const userNick = req.tokenData.nickname

        // if (title.length > 250) {
        //     throw new Error("Tu titulo no puede tener mas de 250 caracteres")
        // }
        // if (picUrl.length > 250) {
        //     throw new Error("Tu enlace es demasiado largo")
        // }
        // if (description.length > 1000) {
        //     throw new Error("Tu descripción es superior al límite de 1000 caracteres")
        // }

        const findPost = await Post.find(
            {
                where:
                {
                    id: parseInt(postId),
                    owner: { id: userId }
                },
                relations: {
                    owner: true
                }
            })

        if (findPost.length === 0) {
            throw new Error("No puedes editar este post")
        } else {

            const postUpdated = await Post.update(
                {
                    id: parseInt(postId),
                    owner: { id: userId }
                },
                {
                    title: title,
                    description: description,
                    picUrl: picUrl
                }
            )

            const responseData = await Post.find(
                {
                    where:
                    {
                        id: parseInt(postId),
                    },
                    relations: {
                        owner: true
                    }
                })


            res.status(200).json(
                {
                    success: true,
                    message: "Perfil actualizado correctamente",
                    data: responseData
                }
            )
        }
    } catch (error: any) {
        if (error.message === "Tu titulo no puede tener mas de 250 caracteres") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Tu enlace es demasiado largo") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Tu descripción es superior al límite de 1000 caracteres") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "No puedes editar este post") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "No se pudo editar tu Post", 500); console.log(error)
    }
}

export const updatePostTopic = async (req: Request, res: Response) => {
    try {

        const postId = req.params.id
        const topic = req.body.topic

        // if (topic !== ("RaggaJungle"||"Club dnb"|| "Liquid dnb"|| "NeuroFunk"||"Rollers"||"Jump Up"||"memes")) {
        //     throw new Error("Inserte un topic válido")
        // } REVISAR ESTA VALIDACIÓN

        const topicUpdated = await Post.update({ id: parseInt(postId) },
            {
                topic: topic
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Perfil actualizado correctamente",
                data: topicUpdated
            }
        )

    } catch (error: any) {
        if (error.message === "Inserte un topic válido") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "No se pudo editar el topic", 500);
    }
}

export const deleteMyPost = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const postId = req.params.id;

        const postDeleted: any = await Post.findOne({
            where: {
                id: parseInt(postId),
                owner: { id: userId }
            }
        })


        if (postDeleted === null) {
            throw new Error("No puedes borrar el post de otro usuario")
        }

        await Post.remove(postDeleted)

        res.status(200).json(
            {
                success: true,
                message: "Se ha borrado tu post correctamente"
            }
        )

    } catch (error: any) {
        if (error.message === "No puedes borrar el post de otro usuario") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "No se pudo eliminar tu post", 500); console.log(error)
    }

}
