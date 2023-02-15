import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class Materiais {

    public async newMateriaisCatador(id_material: number, id_catador: number): Promise<boolean> {

        try {

            const sql = `insert into tbl_materiais_catador(id_catador, id_material) values(${id_catador}, ${id_material})`
            const result = await prisma.$executeRawUnsafe(sql)

            return (!!result)

        } catch (error) {
            return false
        }
    }
}

export default new Materiais()