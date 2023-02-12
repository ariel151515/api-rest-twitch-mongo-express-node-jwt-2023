// Projects: API REST con mongo - Bluuweb
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
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



userSchema.pre("save", async function (next) { // Antes de que se guarde la contraseña la estamos hasheando
    const user = this

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)
        next();
    } catch (err) {
        console.log(err)
        throw new Error('Fallo el hash de contraseña')
    }

})


export const User = mongoose.model('user', userSchema)
