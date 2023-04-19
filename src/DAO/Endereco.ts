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

      const result = await prisma.enderecoUsuario.create({
        data: {
          id_endereco: resultEndereco.id,
          id_usuario: endereco.id_usuario,
        },
        include: {
          endereco: true,
        },
      });

      return result ? result : false;
    } catch (error) {
      return false;
    }
  }

  public async findByUser(id: string): Promise<any> {
    const rs = await prisma.enderecoUsuario.findMany({
      where: {
        id_usuario: id,
      },
      include: {
        endereco: true,
      },
    });

    return rs.length > 0 ? rs : false;
  }

  public async findByUserEndereco(
    id_usuario: string,
    id_endereco: string
  ): Promise<any> {
    const rs = await prisma.enderecoUsuario.findMany({
      where: {
        id_endereco,
        id_usuario,
      },
    });

    return rs.length > 0 ? true : false;
  }

  public async delete(id_endereco: string, id_usuario: string): Promise<any> {
    try {
      await prisma.enderecoUsuario.deleteMany({
        where: {
          id_endereco: id_endereco,
          id_usuario: id_usuario,
        },
      });

      await prisma.endereco.deleteMany({
        where: {
          id: id_endereco,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  public async update(
    id_endereco: string,
    endereco: Omit<IEndereco, "id">
  ): Promise<any> {
    try {
      const rs = await prisma.endereco.updateMany({
        where: {
          id: id_endereco,
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
        id: id_endereco,
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

  public async findById(id: string): Promise<any> {
    const endereco = await prisma.endereco.findUnique({
      where: {
        id,
      },
    });

    return endereco ? endereco : false;
  }
}

export default new Endereco();
