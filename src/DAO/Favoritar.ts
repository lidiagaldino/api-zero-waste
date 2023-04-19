import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Favorito = {
  id: string;
  id_catador: string;
  id_gerador: string;
  action?: "CREATED" | "DELETED";
};

class Favoritar {
  public async favorite(
    id_gerador: string,
    id_catador: string
  ): Promise<Favorito> {
    const find = await prisma.favoritarCatador.findFirst({
      where: {
        id_catador,
        id_gerador,
      },
    });

    let result: Favorito;

    if (!find) {
      result = await prisma.favoritarCatador.create({
        data: {
          id_catador,
          id_gerador,
        },
      });

      result.action = "CREATED";
    } else {
      result = await prisma.favoritarCatador.delete({
        where: {
          id: find.id,
        },
      });

      result.action = "DELETED";
    }

    return result;
  }

  public async getAll(id_gerador: string): Promise<any> {
    const rs = await prisma.favoritarCatador.findMany({
      where: {
        id_gerador,
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

  public async getById(id_gerador: string, id_catador: string): Promise<any> {
    const rs = await prisma.favoritarCatador.findMany({
      where: {
        id_catador,
        id_gerador,
      },
    });

    return rs.length > 0 ? rs : false;
  }

  public async getByEndereco(
    id_gerador: string,
    id_endereco: string
  ): Promise<any> {
    const getLatLong = await prisma.endereco.findUnique({
      where: {
        id: id_endereco,
      },
    });

    const sql = `
            SELECT Catador.id as id_catador, tbl_usuario.id as id_usuario, logradouro, cidade, numero, tbl_usuario.foto, tbl_pessoa_fisica.nome, PessoaJuridica.nome_fantasia, ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) AS distance
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
                INNER JOIN FavoritarCatador
                    ON Catador.id = FavoritarCatador.id_catador
                WHERE ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) <= 10000 AND FavoritarCatador.id_gerador = '${id_gerador}'
                ORDER BY distance
            LIMIT 10;
            `;

    const rs = await prisma.$queryRawUnsafe(sql);

    return rs;
  }
}

export default new Favoritar();
