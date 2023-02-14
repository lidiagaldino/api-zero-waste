import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class Usuario{

    public async newUser(usuario): Promise<number | false>{

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
        } catch (error) {
            return false
        }
    }
}