import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import Usuario from "../DAO/Usuario"

export const verify = async (req: Request, res: Response, next: NextFunction) => {

    const verificar = await Usuario.getUserBy(req.body.email)

    if (verificar) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email já foi cadastrado anteriormente' })
    }

    next()
}