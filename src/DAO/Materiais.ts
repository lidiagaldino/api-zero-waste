import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class Materiais {

    public async newMateriaisCatador(id_material: number, id_catador: number): Promise<boolean> {

        try {

            const sql = `insert into tbl_materiais_catador(id_catador, id_materiais) values(${id_catador}, ${id_material})`
            const result = await prisma.$executeRawUnsafe(sql)
            console.log(result)

            return (!!result)

        } catch (error) {
            return false
        }
    }

    public async deleteMateriaisCatador(id: number): Promise<boolean> {

        try {

            const sql = `delete from tbl_materiais_catador where id_catador = ${id}`

            const result = await prisma.$executeRawUnsafe(sql)

            return (!!result)

        } catch (error) {
            return false
        }
    }
}

export default new Materiais()