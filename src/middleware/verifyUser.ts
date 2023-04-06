import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import Endereco from "../DAO/Endereco"

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {

    if (req.id_usuario == req.params.id_usuario) next()

    return res.status(StatusCodes.BAD_REQUEST).json({message: 'Token não pertence ao mesmo usuário informado nos parametros'})
}