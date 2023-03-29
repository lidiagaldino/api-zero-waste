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

    public async getNearCatadores(id_endereco: string): Promise<any> {
        try {

            const getLatLong = await prisma.endereco.findUnique({
                where: {
                    id: id_endereco
                },
            })

            const sql = `
            SELECT logradouro, cidade, numero, tbl_usuario.foto, tbl_pessoa_fisica.nome, PessoaJuridica.nome_fantasia, ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) AS distance
                FROM Endereco
                INNER JOIN EnderecoUsuario
                    ON EnderecoUsuario.id_endereco = Endereco.id
                INNER JOIN tbl_usuario
                    ON tbl_usuario.id = EnderecoUsuario.id_usuario
                LEFT JOIN tbl_pessoa_fisica
                    ON tbl_pessoa_fisica.id_usuario = tbl_usuario.id
                LEFT JOIN PessoaJuridica
                    ON PessoaJuridica.id_usuario = tbl_usuario.id
                INNER JOIN Catador
                    ON Catador.id_usuario = tbl_usuario.id
                WHERE ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) <= 10000
                ORDER BY distance
            LIMIT 10;
            `

            const rs = await prisma.$queryRawUnsafe(sql)

            return rs
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

export default new Gerador()