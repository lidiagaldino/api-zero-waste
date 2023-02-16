import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import IUsuario from "../interfaces/Usuario"
import IlastId from "../interfaces/Ids"


class Usuario {

    public async newUser(usuario: Omit<IUsuario, 'id'>): Promise<number | false> {

        try {
            const sql = `INSERT INTO tbl_usuario(
                telefone,
                email,
                senha
            ) VALUES (
                '${usuario.telefone}',
                '${usuario.email}',
                '${usuario.senha}'
            ) `

            const result = await prisma.$executeRawUnsafe(sql)

            if (result) {
                const selectId = 'select id from tbl_usuario order by id desc limit 1'
                const lastId: IlastId[] = await prisma.$queryRawUnsafe(selectId)

                return lastId[0].id
            }

            return false

        } catch (error) {
            return false
        }
    }

    public async getUserBy(campo: string, value: string): Promise<Omit<IUsuario, 'senha'>[] | false> {

        const sql = `select telefone, email, id from tbl_usuario where ${campo} = '${value}'`

        const result: Omit<IUsuario, 'senha'>[] = await prisma.$queryRawUnsafe(sql)

        return (result.length > 0 ? result : false)
    }

    public async deleteUser(id: number): Promise<boolean> {

        try {

            const sql = `delete from tbl_usuario where id = ${id}`

            const result = await prisma.$executeRawUnsafe(sql)

            return (!!result)

        } catch (error) {
            return false
        }
    }
}

export default new Usuario()