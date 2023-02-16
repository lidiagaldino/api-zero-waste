import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import Pessoas from '../DAO/Pessoas'
import Endereco from '../DAO/Endereco'
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

        const { senha, telefone, email } = body

        const novoUsuario = await Usuario.newUser({ senha, telefone, email })

        if (!novoUsuario) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })

        if (body.cpf) {

            const { nome, cpf, data_nascimento } = body

            const pessoaFisica = await Pessoas.newPessoaFisica({ nome, cpf, data_nascimento, id_usuario: novoUsuario })

            if (!pessoaFisica) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })

        } else if (body.cnpj) {
            const { nome, cnpj } = body

            const pessoaJuridica = await Pessoas.newPessoaJuridica({ nome, cnpj, id_usuario: novoUsuario })

            if (!pessoaJuridica) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
        }

        const novoGerador = await Gerador.newGerador(novoUsuario)

        if (!novoGerador) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })

        const novoEndereco = await Endereco.newEndereco(body.endereco)

        if (!novoEndereco) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })

        const novoEnderecoCatador = await Endereco.newEnderecoUser(novoUsuario, novoEndereco)

        if (!novoEnderecoCatador) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })

        return res.status(StatusCodes.CREATED).json({ message: 'Item criado com sucesso' })

    }
}

export default new GeradorController()