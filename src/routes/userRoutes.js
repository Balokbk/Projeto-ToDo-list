import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/usersController.js';

const userRouter = express.Router();

// Rota para registrar um novo usuário
userRouter.post("/register",
    [
        body('username').notEmpty().withMessage('Username é obrigatório'),
        body('email').isEmail().withMessage('Email inválido'),
        body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
    ],
    register
);

// Rota para login de usuário
userRouter.post("/login",
    [
        body('email').isEmail().withMessage('Email inválido'),
        body('password').notEmpty().withMessage('Senha é obrigatória')
    ],
    login
);

export default userRouter;