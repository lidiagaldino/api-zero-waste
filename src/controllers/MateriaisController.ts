import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import Materiais from '../DAO/Materiais'


class MateriaisController {

    public async index(_req: Request, res: Response) {

        const materiais = await Materiais.getAll()

        if (materiais) return res.status(StatusCodes.OK).json({ message: materiais })

        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
    }

    public async getByCatador(req: Request, res: Response){
        const { id } = req.params

        const materiais = await Materiais.getByCatador(id.toString())

        return (materiais.length > 0 ? res.status(StatusCodes.OK).json(materiais) : res.status(StatusCodes.NOT_FOUND).json({message: 'NOT FOUND'}))
    }

}

export default new MateriaisController()