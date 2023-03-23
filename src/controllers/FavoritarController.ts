import IFavoritar from '../interfaces/Favoritar'

import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Favoritar from '../DAO/Favoritar'
import Catador from '../DAO/Catador'
import Gerador from '../DAO/Gerador'

class FavoritarController{
    public async toggle(req: Request<{}, {}, Omit<IFavoritar, 'id'>>, res: Response){
        const body = req.body

        const catadorExists = await Catador.getById(body.id_catador)
        if (!catadorExists) return res.status(StatusCodes.NOT_FOUND).json({message: 'Catador não existe'})

        const geradorExists = await Gerador.getById(body.id_gerador)
        if (!geradorExists) return res.status(StatusCodes.NOT_FOUND).json({message: 'Gerador não existe'})

        const rs = await Favoritar.favorite(body.id_gerador, body.id_catador)

        return (rs.action == 'DELETED' ? res.status(StatusCodes.OK).json(rs) : res.status(StatusCodes.CREATED).json(rs))
    }

    public async index(req: Request, res: Response){
        const id = req.params.id

        const rs = await Favoritar.getAll(id.toString())

        return (rs.length > 0 ? res.status(StatusCodes.OK).json(rs) : res.status(StatusCodes.NOT_FOUND).json({}))
    }
}

export default new FavoritarController()