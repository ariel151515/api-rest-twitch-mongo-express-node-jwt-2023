import Jwt from "jsonwebtoken"

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;

        if (!token) throw new Error('No existe el token en el header usa  Bearer')
        // console.log(req.headers)

        token = token.split(" ")[1];
        const { uid } = Jwt.verify(token, process.env.JWT_SECRET)
        console.log(uid)

        req.uid = uid

        next();
    } catch (err) {
        console.log(err)

        const TokenVerificationErrors = {
            "invalid signatura": "La firma del JWT no es valida",
            "jwt expired": "KJWT expirado",
            "invalid token": "Token no valido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "JWT formato no valido"
        }

        return res
            .status(401)
            .json({ error: err.message });
    }
}



