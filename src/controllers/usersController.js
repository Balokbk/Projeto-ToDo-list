import { registerUser, logInUser } from "../services/usersService.js";

export async function register(req, res){
    try{
        const { username, email, password } = req.body;
        const user = await registerUser({ username, email, password });
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

export async function login(req, res){
    try{
        const { email, password } = req.body;
        const { token, user } = await logInUser({ email, password });
        res.status(200).json({ token, user });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}