import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({ message: 'No token provided' });

    // Colocar o token no header esperando o formato: "Authorization: Bearer <token>"
    const parts = authHeader.split(' ');
    if(parts.length !==2 || parts[0] !== 'Bearer'){
        return res.status(401).json({ message: 'Token Malformatted!' });
    }

    const token = parts[1]
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}