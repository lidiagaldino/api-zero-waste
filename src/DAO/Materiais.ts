import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class Materiais {
    public async getAll(): Promise<any> {
        const rs = await prisma.materiais.findMany()

        return rs
    }
}

export default new Materiais()