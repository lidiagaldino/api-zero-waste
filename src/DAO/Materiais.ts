import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class Materiais {
    public async getAll(): Promise<any> {
        const rs = await prisma.materiais.findMany()

        return rs
    }

    public async getByCatador(id: string): Promise<any>{
        const rs = await prisma.materiaisCatador.findMany({
            where: {
                id_catador: id
            },
            include: {
                material: true
            }
        })

        return rs
    }
}

export default new Materiais()