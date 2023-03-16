import IFavoritar from '../interfaces/Favoritar'

import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Favoritar from '../DAO/Favoritar'

class FavoritarController{
    public async toggle(req: Request<{}, {}, Omit<IFavoritar, 'id'>>, res: Response){
        const body = req.body

        const rs = await Favoritar.favorite(body.id_gerador, body.id_catador)

        return (rs.action == 'DELETED' ? res.status(StatusCodes.OK).json(rs) : res.status(StatusCodes.CREATED).json(rs))
    }

    public async index(req: Request, res: Response){
        const id = req.params.id

        const rs = await Favoritar.getAll(id)

        return (rs.length > 0 ? res.status(StatusCodes.OK).json(rs) : res.status(StatusCodes.NOT_FOUND).json({}))
    }
}

export default new FavoritarController()