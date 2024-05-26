
import express, { Application } from 'express';
import cors from 'cors'
import { deleteAccount, deleteUser, getAllUsers, getMyProfile, updateProfile } from './controllers/userController';
import { login, registerUser } from './controllers/authControllers';
import { auth } from './middlewares/auth';
import { isSuperAdmin } from './middlewares/isSuperAdmin';
import { createPost, deleteMyPost, deleteOtherUserPost, getGenrePosts, getMyPosts, updateMyPost, updatePostTopic } from './controllers/postControllers';
import { createLatest, deleteLatest, getLatests, updateLatest } from './controllers/latestControllers';
import { createComment, deleteMyComment, deleteOthersComment, getPostComments } from './controllers/commentControllers';
import { getPostLikes, getUserLikes, sendOrRemoveLike } from './controllers/likeControllers';

export const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/healthy', (req, res) => {
    res.status(200).json(
        {
            success: true,
            message: 'Server is healthy'
        }
    );
})

// auth routes

app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', login);

// user routes
app.get('/api/users', auth, isSuperAdmin, getAllUsers)
app.get('/api/users/profile', auth, getMyProfile)
app.put('/api/users/profile', auth, updateProfile)
app.delete('/api/users', auth, deleteAccount)
app.delete('/api/users/:id', auth, isSuperAdmin, deleteUser)

// post routes
app.get('/api/posts', auth, getMyPosts)
app.get('/api/posts/:topic', auth, getGenrePosts)
app.post('/api/posts', auth, createPost)
app.put('/api/posts/:id', auth, updatePostTopic)
app.put('/api/posts/own/:id', auth, updateMyPost)
app.delete('/api/posts/:id', auth, isSuperAdmin, deleteOtherUserPost)
app.delete('/api/posts/own/:id', auth, deleteMyPost)

// Latests routes
app.get('/api/latests', getLatests)
app.post('/api/latests', auth, isSuperAdmin, createLatest)
app.put('/api/latests/:id', auth, updateLatest)
app.delete('/api/latests/:id', auth, deleteLatest)

// Comments routes
app.get('/api/comments/:id', auth, getPostComments)
app.post('/api/comments/:id', auth, createComment)
app.delete('/api/comments/:id', auth, deleteOthersComment)
app.delete('/api/comments/own/:id', auth, deleteMyComment)

// Likes endpoint
app.post('/api/likes/:id', auth, sendOrRemoveLike)
app.get('/api/likes/posts/:id', auth, getPostLikes)
app.get('/api/likes/users', auth, getUserLikes)