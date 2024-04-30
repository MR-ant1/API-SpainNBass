
import express, { Application } from 'express';
import cors from 'cors'
import { deleteUser, getAllUsers, updateProfile } from './controllers/userController';
import { login, registerUser } from './controllers/authControllers';
import { auth } from './middlewares/auth';
import { isSuperAdmin } from './middlewares/isSuperAdmin';

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

// user routes
app.get('/users', auth, isSuperAdmin, getAllUsers)
app.put('/users/profile', auth, updateProfile)
app.delete('/users/:id', deleteUser)

// auth routes

app.post('/auth/register', registerUser);
app.post('/auth/login', login);