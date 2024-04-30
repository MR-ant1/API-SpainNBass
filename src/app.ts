
import express, { Application } from 'express';
import cors from 'cors'
import { deleteUser, getUser, updateUser } from './controllers/userController';
import { registerUser } from './controllers/authControllers';

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
app.get('/user', getUser)
app.put('/user/:id', updateUser)
app.delete('/user/:id', deleteUser)

// auth routes

app.post('/auth/register', registerUser)