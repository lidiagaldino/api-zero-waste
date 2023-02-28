import { PrismaClient } from "@prisma/client"
import IGerador from "../interfaces/Gerador"
const prisma = new PrismaClient()

class Gerador {

    public async getAll(): Promise<any> {

        const rs = await prisma.gerador.findMany({
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

export default new Gerador()