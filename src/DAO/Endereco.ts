import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import IEndereco from "../interfaces/Endereco"

class Endereco {

    public async newEndereco(endereco: Omit<IEndereco, 'id'>): Promise<number | false> {

        try {

            const sql = `INSERT INTO tbl_endereco (
                            logradouro,
                            bairro,
                            cidade,
                            estado,
                            cep,
                            complemento
                        ) VALUES (
                            '${endereco.logradouro}',
                            '${endereco.bairro}',
                            '${endereco.cidade}',
                            '${endereco.estado}',
                            '${endereco.cep}',
                            '${endereco.complemento}'
            )`

            const result = await prisma.$executeRawUnsafe(sql)

            if (result) {
                const selectId = 'select id from tbl_endereco order by id desc limit 1'
                const lastId = await prisma.$queryRawUnsafe(selectId)

                return lastId[0].id
            }

            return false
        } catch (error) {
            return false
        }
    }

    public async newEnderecoUser(id_user: number, id_endereco: number): Promise<boolean> {

        try {

            const sql = `INSERT INTO tbl_usuario_endereco(
                            id_usuario,
                            id_endereco
                        ) VALUES (
                            ${id_user},
                            ${id_endereco}
                        )`

            const result = await prisma.$executeRawUnsafe(sql)

            return (!!result)
        } catch (error) {
            return false
        }
    }
}

export default new Endereco()