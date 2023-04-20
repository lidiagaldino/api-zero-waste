import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Favorito = {
  id: number;
  id_catador: number;
  id_gerador: number;
  action?: "CREATED" | "DELETED";
};

class Favoritar {
  public async favorite(
    id_gerador: number,
    id_catador: number
  ): Promise<Favorito> {
    const find = await prisma.favoritarCatador.findFirst({
      where: {
        id_catador: Number(id_catador),
        id_gerador: Number(id_gerador),
      },
    });

    let result: Favorito;

    if (!find) {
      result = await prisma.favoritarCatador.create({
        data: {
          id_catador: Number(id_catador),
          id_gerador: Number(id_gerador),
        },
      });

      result.action = "CREATED";
    } else {
      result = await prisma.favoritarCatador.delete({
        where: {
          id: Number(find.id),
        },
      });

      result.action = "DELETED";
    }

    return result;
  }

  public async getAll(id_gerador: number): Promise<any> {
    const rs = await prisma.favoritarCatador.findMany({
      where: {
        id_gerador: Number(id_gerador),
      },
      include: {
        catador: {
          include: {
            user: {
              include: {
                pessoa_fisica: true,
                pessoa_juridica: true,
              },
            },
          },
        },
      },
    });

    return rs.length > 0 ? rs : false;
  }

  public async getById(id_gerador: number, id_catador: number): Promise<any> {
    const rs = await prisma.favoritarCatador.findMany({
      where: {
        id_catador: Number(id_catador),
        id_gerador: Number(id_gerador),
      },
    });

    return rs.length > 0 ? rs : false;
  }

  public async getByEndereco(
    id_gerador: number,
    id_endereco: number
  ): Promise<any> {
    const getLatLong = await prisma.endereco.findUnique({
      where: {
        id: Number(id_endereco),
      },
    });

    const sql = `
            SELECT tbl_catador.id as id_catador, tbl_usuario.id as id_usuario, logradouro, cidade, numero, tbl_usuario.foto, tbl_pessoa_fisica.nome, tbl_pessoa_juridica.nome_fantasia, ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) AS distance
                FROM tbl_endereco
                INNER JOIN tbl_endereco_usuario
                    ON tbl_endereco_usuario.id_endereco = tbl_endereco.id
                INNER JOIN tbl_usuario
                    ON tbl_usuario.id = tbl_endereco_usuario.id_usuario
                LEFT JOIN tbl_pessoa_fisica
                    ON tbl_pessoa_fisica.id_usuario = tbl_usuario.id
                LEFT JOIN tbl_pessoa_juridica
                    ON tbl_pessoa_juridica.id_usuario = tbl_usuario.id
                INNER JOIN tbl_catador
                    ON tbl_catador.id_usuario = tbl_usuario.id
                INNER JOIN tbl_favoritar_catador
                    ON tbl_catador.id = tbl_favoritar_catador.id_catador
                WHERE ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) <= 10000 AND tbl_favoritar_catador.id_gerador = '${id_gerador}'
                ORDER BY distance
            LIMIT 10;
            `;

    const rs = await prisma.$queryRawUnsafe(sql);

    return rs;
  }
}

export default new Favoritar();
