import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import Materiais from '../DAO/Materiais'


class MateriaisController {

    public async index(_req: Request, res: Response) {

        const materiais = await Materiais.getAll()

        if (materiais) return res.status(StatusCodes.OK).json({ message: materiais })

        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
    }

}

export default new MateriaisController()