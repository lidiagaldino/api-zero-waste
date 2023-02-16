import { PrismaClient } from "@prisma/client"
import { array } from "yup"
const prisma = new PrismaClient()

import ICatador from '../interfaces/Catador'
import IlastId from "../interfaces/Ids"

class Catador {

    public async getAll(): Promise<ICatador[] | false> {

        const sql = `SELECT tbl_usuario_endereco.id_usuario, tbl_usuario_endereco.id_endereco, 
                        tbl_usuario.telefone, tbl_usuario.email, tbl_usuario.senha,
                        tbl_pessoa_fisica.nome, tbl_pessoa_fisica.cpf, tbl_pessoa_fisica.data_nascimento,
                        tbl_endereco.logradouro,tbl_endereco.bairro,tbl_endereco.cidade, tbl_endereco.estado,tbl_endereco.cep, tbl_endereco.complemento,
                        tbl_pessoa_juridica.nome_fantasia, tbl_pessoa_juridica.cnpj, tbl_usuario.email, tbl_usuario.telefone, tbl_usuario.senha
                    FROM tbl_catador
                        INNER JOIN tbl_usuario
                            ON tbl_usuario.id = tbl_catador.id_usuario
                        LEFT JOIN tbl_pessoa_fisica
                            ON tbl_usuario.id = tbl_pessoa_fisica.id_usuario
                        LEFT JOIN tbl_pessoa_juridica
                            ON tbl_usuario.id = tbl_pessoa_juridica.id_usuario   
                        INNER JOIN tbl_usuario_endereco
                            ON tbl_usuario.id = tbl_usuario_endereco.id_usuario
                        INNER JOIN tbl_endereco
                            ON tbl_endereco.id = tbl_usuario_endereco.id_endereco`

        const result: ICatador[] = await prisma.$queryRawUnsafe(sql)

        return (result.length > 0 ? result : false)
    }

    public async newCatador(idUsuario: number): Promise<number | false> {

        try {
            const sql = `INSERT INTO tbl_catador(
                            id_usuario
                        ) VALUES (
                            ${idUsuario}
                        );`

            const result = await prisma.$executeRawUnsafe(sql)

            if (result) {
                const selectId = 'select id from tbl_catador order by id desc limit 1'
                const lastId: IlastId = await prisma.$queryRawUnsafe(selectId)

                return lastId[0].id

            }

            return false

        } catch (error) {
            return false
        }
    }

    public async deleteCatador(id: number): Promise<boolean> {

        try {
            const sql = `delete from tbl_catador where id = ${id}`

            const result = await prisma.$executeRawUnsafe(sql)

            return (!!result)

        } catch (error) {
            return false
        }
    }
}

export default new Catador()