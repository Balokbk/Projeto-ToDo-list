import ToDo from '../models/ToDo.js';

export async function createToDo({ title, description,userId }){
    return await ToDo.create({ title, description, userId });
}

export async function getUserToDos(userId, page, limit){
    const skip = (page - 1) * limit
    const todos = await ToDo.find({ userId }).skip(skip).limit(limit)
    const total = await ToDo.countDocuments({ userId });
    return { todos, total, page, limit };
}

export async function updateToDo(id, updates){
    //apenas permite autalizar se o ToDo pertencer ao usuário
    return await ToDo.findOneAndUpdate(
        { _id: id, userId: updates.userId },
        updates,
        { new: true }
    );
}

export async function toggleCompleted(id, userId){
    const todo = await ToDo.findOne({ _id: id, userId })
    if(!todo) return null
    todo.completed = !todo.completed
    await todo.save()
    return todo
}

export async function searchToDosByTitle(userId, title){
    // Busca por título (case-insensitive)
    return await ToDo.find({
        userId,
        title: { $regex: title, $options: 'i' }
    });
}

export async function deleteToDo(id, userId){
    return await ToDo.findOneAndDelete({ _id: id, userId });
}