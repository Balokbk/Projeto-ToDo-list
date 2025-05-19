import bcrypt from "bcryptjs";
import jtw from "jsonwebtoken";
import User from "../models/User.js";

export async function registerUser({ name, email, password }) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return { id: newUser.id, name: newUser.name, email: newUser.email };
}

export async function logInUser({ email, password }){
    const user = await User.findOne({where: { email }});
    if(!user) throw new Error("User not found");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) throw new Error("Email or password is incorrect");

    const token = jtw.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return { token, user: { id: user.id, name: user.name, email: user.email }};
}