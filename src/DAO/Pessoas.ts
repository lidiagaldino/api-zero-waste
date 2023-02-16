import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import IPessoaFisica from "../interfaces/PessoaFisica"
import IPessoaJuridica from "../interfaces/PessoaJuridica"
import IlastId from "../interfaces/Ids"

class Pessoas {

    public async newPessoaFisica(pessoa: Omit<IPessoaFisica, 'id'>): Promise<number | false> {

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

            if (result) {
                const selectId = 'select id from tbl_pessoa_fisica order by id desc limit 1'
                const lastId: IlastId[] = await prisma.$queryRawUnsafe(selectId)

                return lastId[0].id
            }

            return false

        } catch (error) {
            return false
        }
    }

    public async newPessoaJuridica(pessoa: Omit<IPessoaJuridica, 'id'>): Promise<number | false> {

        try {

            const sql = `insert into tbl_pessoa_juridica(nome_fantasia, cnpj, id_usuario) values('${pessoa.nome}', '${pessoa.cnpj}', ${pessoa.id_usuario})`

            const result = await prisma.$executeRawUnsafe(sql)

            if (result) {
                const selectId = 'select id from tbl_pessoa_juridica order by id desc limit 1'
                const lastId: IlastId[] = await prisma.$queryRawUnsafe(selectId)

                return lastId[0].id
            }

            return false

        } catch (error) {
            return false
        }
    }

    public async deletePessoaJuridica(id: number): Promise<boolean> {

        try {

            const sql = `delete from tbl_pessoa_juridica where id = ${id}`

            const result = await prisma.$executeRawUnsafe(sql)

            return (!!result)

        } catch (error) {
            return false
        }
    }

    public async deletePessoaFisica(id: number): Promise<boolean> {

        try {

            const sql = `delete from tbl_pessoa_fisica where id = ${id}`

            const result = await prisma.$executeRawUnsafe(sql)

            return (!!result)

        } catch (error) {
            return false
        }
    }
}

export default new Pessoas()