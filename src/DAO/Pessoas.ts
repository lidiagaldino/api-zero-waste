import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import IPessoaFisica from "../interfaces/PessoaFisica"
import IPessoaJuridica from "../interfaces/PessoaJuridica"

class Pessoas {

    public async newPessoaFisica(pessoa: Omit<IPessoaFisica, 'id'>): Promise<boolean> {

        try {

            const sql = `INSERT INTO tbl_pessoa_fisica(
                            nome,
                            cpf,
                            data_nascimento,
                            id_usuario
                        ) VALUES (
                            '${pessoa.nome}',
                            '${pessoa.cpf}',
                            '${pessoa.data_nascimento}',
                            ${pessoa.id_usuario}
                        )`

            const result = await prisma.$executeRawUnsafe(sql)

            return (!!result)

        } catch (error) {
            return false
        }
    }

    public async newPessoaJuridica(pessoa: Omit<IPessoaJuridica, 'id'>): Promise<boolean> {

        try {

            const sql = `insert into tbl_pessoa_juridica(nome_fantasia, cnpj, id_usuario) values('${pessoa.nome_fantasia}', '${pessoa.cnpj}', ${pessoa.id_usuario})`

            const result = await prisma.$executeRawUnsafe(sql)

            return (!!result)

        } catch (error) {
            return false
        }
    }
}

export default new Pessoas()