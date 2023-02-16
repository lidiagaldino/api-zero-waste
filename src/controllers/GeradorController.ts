import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import Pessoas from '../DAO/Pessoas'
import Endereco from '../DAO/Endereco'
import Usuario from '../DAO/Usuario'
import Gerador from '../DAO/Gerador'

import IGerador from '../interfaces/Gerador'

type tipoPessoa = 'fisica' | 'juridica'

class GeradorController {

    public async index(_req: Request, res: Response) {

        const geradores = await Gerador.getAll()

        if (geradores) return res.status(StatusCodes.OK).json({ message: geradores })

        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
    }

    public async store(req: Request<{}, {}, Omit<IGerador, 'id'>>, res: Response) {

        const body = req.body
        let statPessoa: tipoPessoa = "fisica"
        let idPessoa: number = 0

        const { senha, telefone, email } = body

        const novoUsuario = await Usuario.newUser({ senha, telefone, email })

        if (!novoUsuario) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })

        if (body.cpf) {

            const { nome, cpf, data_nascimento } = body

            const pessoaFisica = await Pessoas.newPessoaFisica({ nome, cpf, data_nascimento, id_usuario: novoUsuario })
            statPessoa = 'fisica'

            if (!pessoaFisica) {
                await Usuario.deleteUser(novoUsuario)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
            }

        } else if (body.cnpj) {
            const { nome, cnpj } = body

            const pessoaJuridica = await Pessoas.newPessoaJuridica({ nome, cnpj, id_usuario: novoUsuario })
            statPessoa = 'juridica'

            if (!pessoaJuridica) {

                await Usuario.deleteUser(novoUsuario)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
            }

        }

        const novoGerador = await Gerador.newGerador(novoUsuario)

        if (!novoGerador) {

            if (statPessoa == 'fisica') {
                await Pessoas.deletePessoaFisica(idPessoa)
            } else {
                await Pessoas.deletePessoaJuridica(idPessoa)
            }

            await Usuario.deleteUser(novoUsuario)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
        }

        const novoEndereco = await Endereco.newEndereco(body.endereco)

        if (!novoEndereco) {

            if (statPessoa == 'fisica') {
                await Pessoas.deletePessoaFisica(idPessoa)
            } else {
                await Pessoas.deletePessoaJuridica(idPessoa)
            }

            await Gerador.deleteGerador(novoGerador)

            await Usuario.deleteUser(novoUsuario)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
        }

        const novoEnderecoGerador = await Endereco.newEnderecoUser(novoUsuario, novoEndereco)

        if (!novoEnderecoGerador) {

            if (statPessoa == 'fisica') {
                await Pessoas.deletePessoaFisica(idPessoa)
            } else {
                await Pessoas.deletePessoaJuridica(idPessoa)
            }

            await Endereco.deleteEndereco(novoEndereco)

            await Gerador.deleteGerador(novoGerador)

            await Usuario.deleteUser(novoUsuario)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
        }

        return res.status(StatusCodes.CREATED).json({ message: 'Item criado com sucesso' })

    }
}

export default new GeradorController()