import { Request, Response } from 'express'
import Catador from '../DAO/Catador'
import Usuario from '../DAO/Usuario'

import { StatusCodes } from 'http-status-codes'

import ICatador from '../interfaces/Catador'

class CatadorController {
    public async index(_req: Request, res: Response) {

        const catadores = await Catador.getAll()

        if (catadores) return res.status(StatusCodes.OK).json({ message: catadores })

        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })

    }

    public async store(req: Request<{}, {}, Omit<ICatador, 'id'>>, res: Response) {

        const body = req.body

        let rs: any

        if (body.cnpj) rs = await Usuario.newUserCatadorJud(body)
        else rs = await Usuario.newUserCatador(body)

        return (rs == false ? res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível criar' }) : res.status(StatusCodes.CREATED).json({ message: rs }))
    }
}

export default new CatadorController()