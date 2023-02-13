import { Router } from "express";
import { login, register, infoUser } from "../controllers/auth.controller.js";
import { body } from 'express-validator'
import { validationResultExpress } from './../middlewares/validationResultExpress.js'
import { requireToken } from "../middlewares/requiereToken.js";

const router = Router();

// validacion con express-validator (.trim limpia de espacios)
router.post('/register',
    [
        body('email', 'formato email incorrecto') // validando el email
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Minimo 6 caracteres")
            .trim()
            .isLength({ min: 6 }),
        body("password", "password Incorrecto") // validando el password
            .custom((value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error('No coinciden las contraseñas')
                }
                return value;
            }),
    ],
    validationResultExpress,
    register
);

router.post('/login',
    [
        body('email', 'formato email incorrecto') // validando el email
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Minimo 6 caracteres")
            .trim()
            .isLength({ min: 6 }),

    ],
    validationResultExpress,
    login)


router.get('/protected', requireToken, infoUser)


export default router;

