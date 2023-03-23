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

        let rs: any

        if (body.cnpj) rs = await Usuario.newUserGeradorJud(body)
        else rs = await Usuario.newUserGerador(body)

        return (rs == false ? res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível criar' }) : res.status(StatusCodes.CREATED).json(rs))
    }

}

export default new GeradorController()