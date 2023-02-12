import { User } from './../models/Users.js'

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save()
        return res.json({ ok: true })

        console.log(user)
    } catch (err) {
        console.log(err)
    }
}

export const login = async (req, res) => {
    res.json({ ok: 'login' })
}