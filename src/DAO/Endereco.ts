import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import IEndereco from "../interfaces/Endereco";

class Endereco {
  public async newEndereco(endereco: Omit<IEndereco, "id">) {
    try {
      const resultEndereco = await prisma.endereco.create({
        data: {
          bairro: endereco.bairro,
          cep: endereco.cep,
          cidade: endereco.cidade,
          estado: endereco.estado,
          logradouro: endereco.logradouro,
          complemento: endereco.complemento,
          latitude: endereco.latitude,
          longitude: endereco.longitude,
          apelido: endereco.apelido,
          numero: endereco.numero,
        },
      });

      console.log(resultEndereco);

      const result = await prisma.enderecoUsuario.create({
        data: {
          id_endereco: Number(resultEndereco.id),
          id_usuario: Number(endereco.id_usuario),
        },
        include: {
          endereco: true,
        },
      });

      return result ? result : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async findByUser(id: number): Promise<any> {
    console.log(id);
    const rs = await prisma.enderecoUsuario.findMany({
      where: {
        id_usuario: Number(id),
      },
      include: {
        endereco: true,
      },
    });

    return rs.length > 0 ? rs : false;
  }

  public async findByUserEndereco(
    id_usuario: number,
    id_endereco: number
  ): Promise<any> {
    const rs = await prisma.enderecoUsuario.findMany({
      where: {
        id_endereco: Number(id_endereco),
        id_usuario: Number(id_usuario),
      },
    });

    return rs.length > 0 ? true : false;
  }

  public async delete(id_endereco: number, id_usuario: number): Promise<any> {
    try {
      console.log(id_usuario);
      await prisma.enderecoUsuario.deleteMany({
        where: {
          id_endereco: Number(id_endereco),
          id_usuario: Number(id_usuario),
        },
      });

      await prisma.endereco.deleteMany({
        where: {
          id: Number(id_endereco),
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  public async update(
    id_endereco: number,
    endereco: Omit<IEndereco, "id">
  ): Promise<any> {
    try {
      const rs = await prisma.endereco.updateMany({
        where: {
          id: Number(id_endereco),
        },
        data: {
          apelido: endereco.apelido,
          bairro: endereco.bairro,
          cep: endereco.cep,
          cidade: endereco.cidade,
          complemento: endereco.complemento,
          estado: endereco.estado,
          latitude: endereco.latitude,
          longitude: endereco.longitude,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
        },
      });

      const retorno = {
        id: Number(id_endereco),
        apelido: endereco.apelido,
        bairro: endereco.bairro,
        cep: endereco.cep,
        cidade: endereco.cidade,
        complemento: endereco.complemento,
        estado: endereco.estado,
        latitude: endereco.latitude,
        longitude: endereco.longitude,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
      };

      return rs.count > 0 ? retorno : false;
    } catch (error) {
      return false;
    }
  }

  public async findById(id: number): Promise<any> {
    const endereco = await prisma.endereco.findUnique({
      where: {
        id: Number(id),
      },
    });

    return endereco ? endereco : false;
  }
}

export default new Endereco();
