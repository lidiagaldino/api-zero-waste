import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import Materiais from '../DAO/Materiais'
import IEndereco from '../interfaces/Endereco'
import IMateriais from '../interfaces/Materiais'


class MateriaisController {

    public async index(_req: Request, res: Response) {

        const materiais = await Materiais.getAll()

        if (materiais) return res.status(StatusCodes.OK).json({ message: materiais })

        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
    }

    public async store(req: Request, res: Response){
        const material = await Materiais.newMaterial(req.body.nome)

        return (material ? res.status(StatusCodes.CREATED).json(material) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado'}))
    }

    public async getByCatador(req: Request, res: Response){
        const { id } = req.params

        const materiais = await Materiais.getByCatador(id.toString())

        return (materiais.length > 0 ? res.status(StatusCodes.OK).json(materiais) : res.status(StatusCodes.NOT_FOUND).json({message: 'NOT FOUND'}))
    }

    public async storeCatador(req: Request<{}, {}, IMateriais>, res: Response){
        const {id_catador, id_materiais} = req.body

        const result = await Materiais.newMaterialCatador(id_catador, id_materiais)
        
        return (result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado'}))
    }

    public async delete(req: Request, res: Response){
        const {id_catador, id_material} = req.params

        const materiais = await Materiais.getByCatador(id_catador)

        if (materiais.length > 1) {
            const rs = await Materiais.deleteMateriaisCatador(id_catador, id_material)

            return (rs ? res.status(StatusCodes.NO_CONTENT).json(rs) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado'}))
        } else{
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Catador deve ter no minimo um material cadastrado'})
        }
    }

    public async getNoMateriaisCatador(req: Request, res: Response){
        const {id_catador} = req.params

        const materiais = await Materiais.noMaterial(id_catador)

        return (materiais.length > 0 ? res.status(StatusCodes.OK).json(materiais) : res.status(StatusCodes.NOT_FOUND).json({message: 'Not found'}))
    }

}

export default new MateriaisController()