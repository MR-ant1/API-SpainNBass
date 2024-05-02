
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

app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', login);

// user routes
app.get('/api/users', auth, isSuperAdmin, getAllUsers)
app.get('/api/users/profile', auth, getMyProfile)
app.put('/api/users/profile', auth, updateProfile)
app.delete('/api/users/:id', deleteUser)

//post routes
app.get('/api/posts', auth, getMyPosts)
app.get('/api/posts/:topic', auth, getGenrePosts)
