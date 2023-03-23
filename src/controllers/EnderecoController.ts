import { Request, Response } from 'express'
import Endereco from '../DAO/Endereco'
import IEndereco from '../interfaces/Endereco'
import { StatusCodes } from 'http-status-codes'

class EnderecoController {
    public async store(req: Request<{}, {}, Omit<IEndereco, 'id'>>, res: Response){

        const rs = await Endereco.newEndereco(req.body)

        return (rs == false ? res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível criar' }) : res.status(StatusCodes.CREATED).json({ message: rs }))
    }

    public async getByUser(req: Request, res: Response){
        const { id } = req.params

        const rs = await Endereco.findByUser(id)

        return (rs == false ? res.status(StatusCodes.NOT_FOUND).json({message: 'NOT FOUND'}) : res.status(StatusCodes.OK).json(rs))
    }
}

export default new EnderecoController()