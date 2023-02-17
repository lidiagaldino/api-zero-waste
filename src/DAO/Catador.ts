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
                        pessoa_juridica: true
                    }
                }
            }
        })


        return (rs.length > 0 ? rs : false)
    }
}

export default new Catador()