import { MateriaisCatador, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Materiais {
  public async getAll(): Promise<any> {
    const rs = await prisma.materiais.findMany();

    return rs;
  }

  public async getByCatador(id: number): Promise<any> {
    const rs = await prisma.materiaisCatador.findMany({
      where: {
        id_catador: Number(id),
      },
      include: {
        material: true,
      },
    });

    return rs;
  }

  public async newMaterialCatador(
    id_catador: number,
    id_materiais: Array<number>
  ): Promise<any> {
    try {
      let error = false;

      const objeto = id_materiais.map(async (item: number) => {
        const rs = await prisma.materiaisCatador.create({
          data: {
            id_catador: Number(id_catador),
            id_materiais: Number(item),
          },
        });

        if (!rs) error = true;
        else return rs;
      });

      const retorno = Promise.all(objeto);

      return error ? false : retorno;
    } catch (error) {
      return false;
    }
  }

  public async deleteMateriaisCatador(
    id_catador: number,
    id_material: number
  ): Promise<any> {
    try {
      const rs = await prisma.materiaisCatador.deleteMany({
        where: {
          id_catador: Number(id_catador),
          id_materiais: Number(id_material),
        },
      });

      return rs ? true : false;
    } catch (error) {
      return false;
    }
  }

  public async newMaterial(nome: string): Promise<any> {
    try {
      const rs = await prisma.materiais.create({
        data: {
          nome: nome,
        },
      });

      return rs ? rs : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async noMaterial(id_catador: number): Promise<any> {
    try {
      const rs = await prisma.materiais.findMany({
        where: {
          materiais_catador: {
            none: {
              id_catador: Number(id_catador),
            },
          },
        },
      });

      console.log(rs);

      return rs;
    } catch (error) {
      return false;
    }
  }
}

export default new Materiais();
