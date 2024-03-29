import bcrypt from "bcryptjs";

import ICatador from "../interfaces/Catador";
import IGerador from "../interfaces/Gerador";
import IUsuario from "../interfaces/Usuario";
import prisma from "../lib/db";

class Usuario {
  public async newUserCatador(usuario: Omit<ICatador, "id">): Promise<any> {
    try {
      if (usuario.cpf) {
        const result = await prisma.usuario.create({
          data: {
            email: usuario.email,
            pontos: 10,
            telefone: usuario.telefone,
            senha: bcrypt.hashSync(usuario.senha, 8),
            foto: "https://cdn-icons-png.flaticon.com/512/3231/3231671.png",
            biografia: "Eu amo recliclagem!!",
            catador: {
              create: {
                id_status_catador: 2,
              },
            },
            endereco_usuario: {
              create: {
                endereco: {
                  create: {
                    bairro: usuario.endereco.bairro,
                    cep: usuario.endereco.cep,
                    cidade: usuario.endereco.cidade,
                    estado: usuario.endereco.estado,
                    logradouro: usuario.endereco.logradouro,
                    complemento: usuario.endereco.complemento,
                    apelido: "Principal",
                    latitude: usuario.endereco.latitude,
                    longitude: usuario.endereco.longitude,
                    numero: usuario.endereco.numero,
                  },
                },
              },
            },
            pessoa_fisica: {
              create: {
                cpf: usuario.cpf,
                data_nascimento: usuario.data_nascimento,
                nome: usuario.nome,
              },
            },
          },
          include: {
            catador: {
              select: {
                id: true,
              },
            },
          },
        });

        let teste: any;

        usuario.materiais.map(async (item) => {
          teste = await prisma.materiaisCatador.create({
            data: {
              id_catador: Number(result.catador[0].id),
              id_materiais: Number(item),
            },
            include: {
              catador: true,
            },
          });
        });

        const newUser = {
          id: Number(result.id),
          nome: usuario.nome,
          endereco: {
            cep: usuario.endereco.cep,
            logradouro: usuario.endereco.logradouro,
            bairro: usuario.endereco.bairro,
            cidade: usuario.endereco.cidade,
            estado: usuario.endereco.estado,
            complemento: usuario.endereco.estado,
            numero: usuario.endereco.numero,
            latitude: usuario.endereco.latitude,
            longitude: usuario.endereco.longitude,
          },
          telefone: usuario.telefone,
          email: usuario.email,
          senha: result.senha,
          materiais: usuario.materiais,
          cpf: usuario.cpf,
          data_nascimento: usuario.data_nascimento,
        };

        console.log(result);

        return result ? newUser : false;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async newUserCatadorJud(
    usuario: Omit<ICatador, "id">
  ): Promise<Usuario | any> {
    try {
      if (usuario.cnpj) {
        const result = await prisma.usuario.create({
          data: {
            email: usuario.email,
            pontos: 10,
            telefone: usuario.telefone,
            senha: bcrypt.hashSync(usuario.senha, 8),
            foto: "https://cdn-icons-png.flaticon.com/512/3231/3231671.png",
            biografia: "Eu amo recliclagem!!",
            catador: {
              create: {
                id_status_catador: 2,
              },
            },
            endereco_usuario: {
              create: {
                endereco: {
                  create: {
                    bairro: usuario.endereco.bairro,
                    cep: usuario.endereco.cep,
                    cidade: usuario.endereco.cidade,
                    estado: usuario.endereco.estado,
                    logradouro: usuario.endereco.logradouro,
                    complemento: usuario.endereco.complemento,
                    apelido: "Principal",
                    latitude: Number(usuario.endereco.latitude),
                    longitude: Number(usuario.endereco.longitude),
                    numero: usuario.endereco.numero,
                  },
                },
              },
            },
            pessoa_juridica: {
              create: {
                cnpj: usuario.cnpj,
                nome_fantasia: usuario.nome,
              },
            },
          },
          include: {
            catador: {
              select: {
                id: true,
              },
            },
          },
        });

        let teste: any;

        usuario.materiais.map(async (item) => {
          teste = await prisma.materiaisCatador.create({
            data: {
              id_catador: Number(result.catador[0].id),
              id_materiais: Number(item),
            },
            include: {
              catador: true,
            },
          });
        });

        console.log(teste);

        const newUser = {
          id: Number(result.id),
          nome: usuario.nome,
          endereco: {
            cep: usuario.endereco.cep,
            logradouro: usuario.endereco.logradouro,
            bairro: usuario.endereco.bairro,
            cidade: usuario.endereco.cidade,
            estado: usuario.endereco.estado,
            complemento: usuario.endereco.estado,
            numero: usuario.endereco.numero,
            latitude: usuario.endereco.latitude,
            longitude: usuario.endereco.longitude,
          },
          telefone: usuario.telefone,
          email: usuario.email,
          senha: result.senha,
          materiais: usuario.materiais,
          cnpj: usuario.cnpj,
          data_nascimento: usuario.data_nascimento,
        };

        return result ? newUser : false;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async newUserGerador(
    usuario: Omit<IGerador, "id">
  ): Promise<Usuario | any> {
    try {
      if (usuario.cpf) {
        const result = await prisma.usuario.create({
          data: {
            email: usuario.email,
            pontos: 10,
            telefone: usuario.telefone,
            senha: bcrypt.hashSync(usuario.senha),
            foto: "https://cdn-icons-png.flaticon.com/512/3231/3231671.png",
            biografia: "Eu amo recliclagem!!",
            endereco_usuario: {
              create: {
                endereco: {
                  create: {
                    bairro: usuario.endereco.bairro,
                    cep: usuario.endereco.cep,
                    cidade: usuario.endereco.cidade,
                    estado: usuario.endereco.estado,
                    logradouro: usuario.endereco.logradouro,
                    complemento: usuario.endereco.complemento,
                    apelido: "Principal",
                    latitude: usuario.endereco.latitude,
                    longitude: usuario.endereco.longitude,
                    numero: usuario.endereco.numero,
                  },
                },
              },
            },
            pessoa_fisica: {
              create: {
                cpf: usuario.cpf,
                data_nascimento: usuario.data_nascimento,
                nome: usuario.nome,
              },
            },
            gerador: {
              create: {},
            },
          },
        });

        const newUser = {
          id: Number(result.id),
          nome: usuario.nome,
          endereco: {
            cep: usuario.endereco.cep,
            logradouro: usuario.endereco.logradouro,
            bairro: usuario.endereco.bairro,
            cidade: usuario.endereco.cidade,
            estado: usuario.endereco.estado,
            complemento: usuario.endereco.complemento,
            numero: usuario.endereco.numero,
            latitude: usuario.endereco.latitude,
            longitude: usuario.endereco.longitude,
          },
          telefone: usuario.telefone,
          email: usuario.email,
          senha: result.senha,
          cpf: usuario.cpf,
          data_nascimento: usuario.data_nascimento,
        };

        console.log(result);
        return result ? newUser : false;
      }
    } catch (error) {
      return error;
    }
  }

  public async newUserGeradorJud(
    usuario: Omit<IGerador, "id">
  ): Promise<Usuario | any> {
    try {
      if (usuario.cnpj) {
        const result = await prisma.usuario.create({
          data: {
            email: usuario.email,
            pontos: 10,
            telefone: usuario.telefone,
            senha: bcrypt.hashSync(usuario.senha),
            foto: "https://cdn-icons-png.flaticon.com/512/3231/3231671.png",
            biografia: "Eu amo recliclagem!!",
            endereco_usuario: {
              create: {
                endereco: {
                  create: {
                    bairro: usuario.endereco.bairro,
                    cep: usuario.endereco.cep,
                    cidade: usuario.endereco.cidade,
                    estado: usuario.endereco.estado,
                    logradouro: usuario.endereco.logradouro,
                    complemento: usuario.endereco.complemento,
                    apelido: "Principal",
                    latitude: usuario.endereco.latitude,
                    longitude: usuario.endereco.longitude,
                    numero: usuario.endereco.numero,
                  },
                },
              },
            },
            pessoa_juridica: {
              create: {
                cnpj: usuario.cnpj,
                nome_fantasia: usuario.nome,
              },
            },
            gerador: {
              create: {},
            },
          },
        });

        const newUser = {
          id: Number(result.id),
          nome: usuario.nome,
          endereco: {
            cep: usuario.endereco.cep,
            logradouro: usuario.endereco.logradouro,
            bairro: usuario.endereco.bairro,
            cidade: usuario.endereco.cidade,
            estado: usuario.endereco.estado,
            complemento: usuario.endereco.estado,
            numero: usuario.endereco.numero,
            latitude: usuario.endereco.latitude,
            longitude: usuario.endereco.longitude,
          },
          telefone: usuario.telefone,
          email: usuario.email,
          senha: result.senha,
          cnpj: usuario.cnpj,
          data_nascimento: usuario.data_nascimento,
        };

        return result ? newUser : false;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async getUserBy(value: string): Promise<boolean | any> {
    const result = await prisma.usuario.findFirst({
      where: {
        email: value,
      },
      include: {
        catador: {
          include: {
            materiais_catador: {
              include: {
                material: true,
              },
            },
          },
        },
        gerador: true,
        pessoa_fisica: true,
        pessoa_juridica: true,
        endereco_usuario: {
          include: {
            endereco: true,
          },
        },
      },
    });

    return result != null ? result : false;
  }

  public async getUserById(value: number): Promise<boolean | any> {
    const result = await prisma.usuario.findFirst({
      where: {
        id: Number(value),
      },
      include: {
        catador: {
          include: {
            materiais_catador: {
              include: {
                material: true,
              },
            },
          },
        },
        gerador: true,
        pessoa_fisica: true,
        pessoa_juridica: true,
        endereco_usuario: {
          include: {
            endereco: true,
          },
        },
      },
    });

    return result != null ? result : false;
  }

  public async updateUser(
    id: number,
    user: Omit<IUsuario, "id">
  ): Promise<any> {
    try {
      const rs = await prisma.usuario.update({
        where: {
          id: Number(id),
        },
        data: {
          email: user.email,
          telefone: user.telefone,
          biografia: user.biografia,
          foto: user.foto,
        },
      });

      console.log(user);

      let retorno: any;

      let fisico_juridico: any;

      if (user.cnpj) {
        fisico_juridico = await prisma.pessoaJuridica.updateMany({
          where: {
            id_usuario: Number(id),
          },
          data: {
            cnpj: user.cnpj,
            nome_fantasia: user.nome,
          },
        });

        retorno = {
          email: user.email,
          nome_fantasia: user.nome,
          telefone: user.telefone,
          senha: user.senha,
          cnpj: user.cnpj,
          foto: user.foto,
        };
      } else {
        fisico_juridico = await prisma.pessoaFisica.updateMany({
          where: {
            id_usuario: Number(id),
          },
          data: {
            cpf: user.cpf,
            nome: user.nome,
          },
        });

        retorno = {
          email: user.email,
          nome: user.nome,
          telefone: user.telefone,
          senha: user.senha,
          cpf: user.cpf,
          foto: user.foto,
        };
      }

      console.log(fisico_juridico);

      return fisico_juridico && rs ? retorno : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async updateBio(id: number, bio: string): Promise<any> {
    try {
      const rs = await prisma.usuario.update({
        where: {
          id: Number(id),
        },
        data: {
          biografia: bio,
        },
      });

      return rs ? bio : false;
    } catch (error) {
      return false;
    }
  }

  public async updatePhoto(id: number, url: string): Promise<any> {
    try {
      const rs = await prisma.usuario.update({
        where: {
          id: Number(id),
        },
        data: {
          foto: url,
        },
      });

      return rs ? url : false;
    } catch (error) {
      return false;
    }
  }

  public async delete(id: number): Promise<any> {
    try {
      const rs = await prisma.usuario.delete({
        where: {
          id,
        },
      });

      return rs ? rs : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new Usuario();
