import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


class Catador {

    public async getAll(): Promise<any> {
        const rs = await prisma.catador.findMany({
            include: {
                user: {
                    include: {
                        endereco_usuario: {
                            include: {
                                endereco: true
                            }
                        },
                        pessoa_fisica: true,
                        pessoa_juridica: true,
                    }
                },
                materiais_catador: {
                    include: {
                        material: true
                    }
                }
            }
        })


        return (rs.length > 0 ? rs : false)
    }

    public async getById(id: string): Promise<any> {
        const rs = await prisma.catador.findUnique({
            where: {
                id
            }
        })

        return (rs.id ? rs : false)
    }
}

export default new Catador()