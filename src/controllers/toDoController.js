import { validationResult } from 'express-validator';
import * as toDoService from '../services/todoServices.js';

export async function createToDo(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    
    try{
        const { title, description } = req.body;
        const userId = req.userId;
        const toDo = await toDoService.createToDo({ title, description, userId });
        res.status(201).json(toDo);
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function getUserToDos(req, res){
    try{
        const userId = req.userId;
        const toDos = await toDoService.getUserToDos(userId);
        res.status(200).json(toDos);
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function searchByTitle(req, res) {
    try{
        const userId = req.userId;
        const { title } = req.query;
        const toDos = await toDoService.searchToDosByTitle(userId, title);
        res.status(200).json(toDos);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function updateToDo(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    try{
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.userId;
        const updatedToDo = await toDoService.updateToDo(id, { title, description, userId });
        if(!updatedToDo){
            return res.status(404).json({ error: 'tarefa não encontraa ou não pertence ao usuário' });
        }
        res.status(200).json(updatedToDo);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function deleteToDo(req, res){
    try{
        const { id } = req.params;
        const userId = req.userId;
        const deletedToDo = await toDoService.deleteToDo(id, userId);
        if(!deletedToDo){
            return res.status(404).json({ error: 'tarefa não encontrada ou não pertence ao usuário' });
        }
        res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function markAsCompleted(req, res){
    try{
        const { id } = req.params;
        const userId = req.userId;
        const updatedToDo = await toDoService.updateToDo(id, { completed: true, userId });
        if(!updatedToDo){
            return res.status(404).json({ error: 'Tarefa não encontrada ou não pertence ao usuário' });
        }
        res.status(200).json(updatedToDo);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}