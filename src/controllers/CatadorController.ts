import { Request, Response } from 'express'
import Catador from '../DAO/Catador'

import { StatusCodes } from 'http-status-codes'

class CatadorController {
    public async index(req: Request, res: Response){
        
        const catadores = await Catador.getAll()

        if (catadores) {
            return res.status(StatusCodes.OK).json({message: catadores})
        } else{
            return res.status(StatusCodes.NOT_FOUND).json({message: 'Not found'})
        }
    }

    public async store(req: Request, res: Response){
        
        const body = req.body
    }
}

export default new CatadorController()