import { NextFunction, Request, Response } from 'express'
import Catador from '../DAO/Catador'
import Usuario from '../DAO/Usuario'

import { StatusCodes } from 'http-status-codes'
import Pessoas from '../DAO/Pessoas'
import Materiais from '../DAO/Materiais'
import Endereco from '../DAO/Endereco'
import ICatador from '../interfaces/Catador'

type tipoPessoa = 'fisica' | 'juridica'

class CatadorController {
    public async index(_req: Request, res: Response, next: NextFunction) {

        const catadores = await Catador.getAll()

        if (catadores) return res.status(StatusCodes.OK).json({ message: catadores })

        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })

    }

    public async store(req: Request<{}, {}, Omit<ICatador, 'id'>>, res: Response) {

        const body = req.body

        let statPessoa: tipoPessoa = "fisica"
        let idPessoa: number = 0

        const { senha, telefone, email } = body

        const novoUsuario = await Usuario.newUser({ senha, telefone, email })

        if (!novoUsuario) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })

        if (body.cpf) {
            statPessoa = 'fisica'
            const { nome, cpf, data_nascimento } = body

            const pessoaFisica = await Pessoas.newPessoaFisica({ nome, cpf, data_nascimento, id_usuario: novoUsuario })

            if (!pessoaFisica) {
                await Usuario.deleteUser(novoUsuario)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
            }

            idPessoa = pessoaFisica

        } else if (body.cnpj) {

            statPessoa = 'juridica'

            const { nome, cnpj } = body

            const pessoaJuridica = await Pessoas.newPessoaJuridica({ nome, cnpj, id_usuario: novoUsuario })

            if (!pessoaJuridica) {
                await Usuario.deleteUser(novoUsuario)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
            }

            idPessoa = pessoaJuridica
        }

        const novoCatador = await Catador.newCatador(novoUsuario)

        if (!novoCatador) {

            if (statPessoa == 'fisica') {
                await Pessoas.deletePessoaFisica(idPessoa)
            } else {
                await Pessoas.deletePessoaJuridica(idPessoa)
            }

            await Usuario.deleteUser(novoUsuario)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })

        }

        let novoMaterialCatador: boolean = true


        body.materiais.forEach(async (element: number) => {
            novoMaterialCatador = await Materiais.newMateriaisCatador(element, novoCatador)

            if (!novoMaterialCatador) return false
        });

        if (!novoMaterialCatador) {

            if (statPessoa == 'fisica') {
                await Pessoas.deletePessoaFisica(idPessoa)
            } else {
                await Pessoas.deletePessoaJuridica(idPessoa)
            }

            await Materiais.deleteMateriaisCatador(novoCatador)

            await Catador.deleteCatador(novoCatador)

            await Usuario.deleteUser(novoUsuario)

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
        }

        const novoEndereco = await Endereco.newEndereco(body.endereco)

        if (!novoEndereco) {

            if (statPessoa == 'fisica') {
                await Pessoas.deletePessoaFisica(idPessoa)
            } else {
                await Pessoas.deletePessoaJuridica(idPessoa)
            }

            await Materiais.deleteMateriaisCatador(novoCatador)

            await Catador.deleteCatador(novoCatador)

            await Usuario.deleteUser(novoUsuario)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
        }

        const novoEnderecoCatador = await Endereco.newEnderecoUser(novoUsuario, novoEndereco)

        if (!novoEnderecoCatador) {

            if (statPessoa == 'fisica') {
                await Pessoas.deletePessoaFisica(idPessoa)
            } else {
                await Pessoas.deletePessoaJuridica(idPessoa)
            }

            await Materiais.deleteMateriaisCatador(novoCatador)

            await Catador.deleteCatador(novoCatador)

            await Endereco.deleteEndereco(novoEndereco)

            await Usuario.deleteUser(novoUsuario)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Não foi possível realizar essa ação' })
        }

        return res.status(StatusCodes.CREATED).json({ message: 'Item criado com sucesso' })
    }
}

export default new CatadorController()