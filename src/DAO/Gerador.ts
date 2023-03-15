import { FavoritarCatador, PrismaClient } from "@prisma/client"
import IGerador from "../interfaces/Gerador"
const prisma = new PrismaClient()

type Favoritar = {
    id: string,
    id_catador: string,
    id_gerador: string,
    action?: 'CREATED' | 'DELETED'
}

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

    public async favorite(id_gerador: string, id_catador: string): Promise<Favoritar> {
        const find = await prisma.favoritarCatador.findFirst({
            where: {
                id_catador,
                id_gerador
            }
        })

        let result: Favoritar

        if (!find) {
            result = await prisma.favoritarCatador.create({
                data: {
                    id_catador,
                    id_gerador
                }
            })

            result.action = 'CREATED'
        } else {
            result = await prisma.favoritarCatador.delete({
                where: {
                    id: find.id
                }
            })

            result.action = 'DELETED'
        }

        return result
    }
}

export default new Gerador()