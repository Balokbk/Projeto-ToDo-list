import express from 'express';
import { body } from 'express-validator';
import * as toDoController from '../controllers/todoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { paginationMiddleware } from '../middlewares/paginationMiddleware.js';

const toDoRouter = express.Router();

// Rota para obter todas as tarefas do usuário autenticado
toDoRouter.get('/',
    authMiddleware,
    paginationMiddleware,
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

// Rota para atualizar uma tarefa
toDoRouter.put('/:id',
    authMiddleware,
    [
        body('title').optional().isString().withMessage('O título deve ser uma string'),
        body('description').optional().isString().withMessage('A descrição deve ser uma string')
    ],
    toDoController.updateToDo
);

// Rota para buscar tarefas por título
toDoRouter.get('/search',
    authMiddleware,
    [
        body('title').notEmpty().withMessage('O título é obrigatório')
    ],
    toDoController.searchToDosByTitle
);

// Marcar como concluído
toDoRouter.patch('/:id/toggle',
    authMiddleware,
    toDoController.toggleCompleted
)

// Rota para deletar uma tarefa
toDoRouter.delete('/:id',
    authMiddleware,
    toDoController.deleteToDo
);

export default toDoRouter;