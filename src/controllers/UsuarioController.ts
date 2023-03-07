import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import Usuario from '../DAO/Usuario'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


class UsuarioControlelr {

    public async auth(req: Request, res: Response) {

        const { email, senha } = req.body

        const user = await Usuario.getUserBy(email)

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
        }

        const isPassValid = await bcrypt.compare(senha, user.senha)

        if (!isPassValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não autorizado' })
        }

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' })

        delete user.senha

        return res.status(StatusCodes.OK).json({ user, token })

    }

    public async dados(req: Request, res: Response) {

        const id = req.id_usuario

        const user = await Usuario.getUserById(id)

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
        }

        return res.status(StatusCodes.OK).json({ user })

    }

}

export default new UsuarioControlelr()