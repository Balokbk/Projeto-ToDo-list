import ToDo from '../models/ToDo.js';

export async function createToDo({ title, description,userId }) {
    return await ToDo.create({ title, description, userId });
}

export async function getUserToDos(userId) {
    return await ToDo.find({ userId });
}

export async function updateToDo(id, updates){
    //apenas permite autalizar se o ToDo pertencer ao usuário
    return await ToDo.findOneAndUpedate(
        { _id: id, userId: updates.userId },
        data,
        { new: true }
    );
}

export async function searchToDosByTitle(userId, title) {
    // Busca por título (case-insensitive)
    return await ToDo.find({
        userId,
        title: { $regex: title, $options: 'i' }
    });
}

export async function deleteToDo(id, userId) {
    return await ToDo.findOneAndDelete({ _id: id, userId });
}