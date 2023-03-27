import { PrismaClient } from "@prisma/client"
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

    public async getById(id: string): Promise<any> {
        const rs = await prisma.gerador.findUnique({
            where: {
                id
            }
        })

        return (rs.id ? rs : false)
    }

    public async getNearCatadores(lat: string, long: string): Promise<any>{
        try {

            const sql = `
            SELECT id, latitude, longitude,
ST_DISTANCE_SPHERE(POINT(${lat}, ${long}), POINT(latitude, longitude)) AS distance
FROM Endereco
WHERE ST_DISTANCE_SPHERE(POINT(${lat}, ${long}), POINT(latitude, longitude)) <= 10000
ORDER BY distance
LIMIT 10;
            `

            console.log(sql);
            const rs = await prisma.$queryRawUnsafe(sql)

            return rs
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

export default new Gerador()