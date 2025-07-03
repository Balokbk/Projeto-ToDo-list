import express from 'express';
import { body } from 'express-validator';
import * as toDoController from '../controllers/todoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const toDoRouter = express.Router();

// Rota para obter todas as tarefas do usuário autenticado
toDoRouter.get('/',
    authMiddleware,
    toDoController.getUserToDos
);

// Rota para criar uma nova tarefa
toDoRouter.post('/',
    authMiddleware,
    [
        body('title').notEmpty().withMessage('O título é obrigatório'),
        body('description').optional().isString().withMessage('A descrição deve ser uma string')
    ],
    toDoController.createToDo
);

export default toDoRouter;