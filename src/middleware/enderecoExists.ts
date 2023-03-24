import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import Endereco from "../DAO/Endereco"

export const enderecoExists = async (req: Request, res: Response, next: NextFunction) => {

    const verificar = await Endereco.findByUser(req.body.id_usuario)

    verificar.map((item: any) => {
        if (item.endereco.cep == req.body.cep && item.endereco.complemento == req.body.complemento) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Endereço já existe'})
        }
    })

    next()
}