import { validationResult } from 'express-validator';
import { registerUser, logInUser } from '../services/usersService.js';

export async function register(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const { username, email, password } = req.body;
        const user = await registerUser({ username, email, password });
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function login(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const { email, password } = req.body;
        const { token } = await logInUser({ email, password });
        res.status(200).json({ token});
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}