
import express, { Application } from 'express';
import cors from 'cors'
import { deleteUser, getAllUsers, getMyProfile, updateProfile } from './controllers/userController';
import { login, registerUser } from './controllers/authControllers';
import { auth } from './middlewares/auth';
import { isSuperAdmin } from './middlewares/isSuperAdmin';
import { getGenrePosts, getMyPosts } from './controllers/postControllers';

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

app.post('/auth/register', registerUser);
app.post('/auth/login', login);

// user routes
app.get('/users', auth,  getAllUsers)
app.get('/users/profile', auth, getMyProfile)
app.put('/users/profile', auth, updateProfile)
app.delete('/users/:id', deleteUser)

//post routes
app.get('/posts', auth, getMyPosts)
app.get('/posts/:topic', auth, getGenrePosts)
