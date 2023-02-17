import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import Usuario from '../DAO/Usuario'
import Gerador from '../DAO/Gerador'

import IGerador from '../interfaces/Gerador'

class GeradorController {

    public async index(_req: Request, res: Response) {

        const geradores = await Gerador.getAll()

        if (geradores) return res.status(StatusCodes.OK).json({ message: geradores })

        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
    }

    public async store(req: Request<{}, {}, Omit<IGerador, 'id'>>, res: Response) {

        const body = req.body

        const rs = await Usuario.newUserGerador(body)

        return res.send(rs)
    }
}

export default new GeradorController()