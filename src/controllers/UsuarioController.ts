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

}

export default new UsuarioControlelr()