import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import IEndereco from "../interfaces/Endereco"

class Endereco {
    public async newEndereco(endereco: Omit<IEndereco, 'id'>) {
        try {
            const resultEndereco = await prisma.endereco.create({
                data: {
                    bairro: endereco.bairro,
                    cep: endereco.cep,
                    cidade: endereco.cidade,
                    estado: endereco.estado,
                    logradouro: endereco.logradouro,
                    complemento: endereco.complemento,
                }
            })

            const result = await prisma.enderecoUsuario.create({
                data: {
                    id_endereco: resultEndereco.id,
                    id_usuario: endereco.id_usuario
                },
                include: {
                    endereco: true
                }
            })

            return (result ? result : false)
        } catch (error) {
            return false
        }
    }
}

export default new Endereco()