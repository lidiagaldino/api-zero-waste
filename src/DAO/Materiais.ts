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

    public async newMaterialCatador(id_catador: string, id_material: string): Promise<any>{

        try {
            const rs = await prisma.materiaisCatador.create({
                data: {
                    id_catador: id_catador,
                    id_materiais: id_material
                }
            }) 

            return (rs ? rs : false)
        } catch (error) {
            return false
        }
        
    }

    public async deleteMateriaisCatador(id_catador: string, id_material: string): Promise<any>{
        try {
            const rs = await prisma.materiaisCatador.deleteMany({
                where: {
                    id_catador: id_catador,
                    id_materiais: id_material
                }
            })

            return (rs ? true : false)
        } catch (error) {
            return false
        }
        
    }
}

export default new Materiais()