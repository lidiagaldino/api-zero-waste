import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

type Favorito = {
    id: string,
    id_catador: string,
    id_gerador: string,
    action?: 'CREATED' | 'DELETED'
}

type List = {

}


class Favoritar{
    public async favorite(id_gerador: string, id_catador: string): Promise<Favorito> {
        const find = await prisma.favoritarCatador.findFirst({
            where: {
                id_catador,
                id_gerador
            }
        })

        let result: Favorito

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

    public async getAll(id_gerador: string): Promise<any>{

        const rs = await prisma.favoritarCatador.findMany({
            where: {
                id_gerador
            },
            include: {
                catador: {
                    include: {
                        user: true
                    }
                }
            }
        })

        return (rs.length > 0 ? rs : false)
    } 
}

export default new Favoritar()