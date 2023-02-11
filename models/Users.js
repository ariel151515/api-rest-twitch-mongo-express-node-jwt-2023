import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        trim: true, // Limpia los campos
        required: true,
        unique: true, // El email es unico
        lowercase: true,
        index: { unique: true }, // sirve para hacer las busquedas mas rapido en gran escala
    },
    password: {
        type: String,
        required: true,
    },
})

export const User = model('user', userSchema)
