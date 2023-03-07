import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'

interface tokenPayload {
    id: string,
    iat: number,
    exp: number
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autotizado' })
    }


    const [, token] = authorization.split(" ")
    console.log(token);

    try {
        const data = jwt.verify(token, 'secret')

        const { id } = data as tokenPayload

        req.id_usuario = id

        return next()

    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autorizado' })
    }
}