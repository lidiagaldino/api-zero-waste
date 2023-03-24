import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import Catador from "../DAO/Catador"

export const verifyCatador = async (req: Request, res: Response, next: NextFunction) => {

    const verificar = await Catador.getById(req.params.id_catador)

    if (!verificar) return res.status(StatusCodes.NOT_FOUND).json({message: 'Catador não existe'})

    next()
}