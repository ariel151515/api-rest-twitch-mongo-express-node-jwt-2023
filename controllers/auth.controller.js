import { User } from './../models/Users.js'
import jwt from 'jsonwebtoken'
import { generateToket } from '../utils/tokenManager.js';



export const register = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Alternativa de validacion  1: 
        let user = await User.findOne({ email })
        if (user) throw { code: 11000 };

        user = new User({ email, password });
        await user.save()


        return res.json({ ok: true })

        console.log(user)
    } catch (err) {
        console.log(err.code)

        // Alternativa de validacion  2: Usar un swich para manejar varios codigos de respuesta

        if (err.code === 11000) {
            return res.status(400).json({ error: 'Ya existe este usuario' })
        }
    }
}




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }); // Busca el email en la base de datos

        //if (!user) throw new Error('No existe el usuario registrado')
        if (!user) return res.status(403).json({ error: 'No existe el usuario registrado' })

        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword) return res.status(403).json({ error: "Contraseña incorrecta" });

        // Generar el token JWT
        const { token, expiresIn } = generateToket(user.id)

        return res.json({ token, expiresIn });

    } catch (err) {
        return res.status(500).json({ error: 'Error de servidor' })
    }


}


export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean()
        return res.json({ user })
    } catch (err) {
        return res.status(500).json({ err: "error de server" })
    }
}

