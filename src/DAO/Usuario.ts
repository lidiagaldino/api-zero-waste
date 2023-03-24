import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import bcrypt from 'bcryptjs'

import ICatador from "../interfaces/Catador"
import IGerador from "../interfaces/Gerador"


class Usuario {

    public async newUserCatador(usuario: Omit<ICatador, 'id'>): Promise<Usuario | any> {

        try {

            if (usuario.cpf) {
                const result = await prisma.usuario.create({
                    data: {
                        email: usuario.email,
                        telefone: usuario.telefone,
                        senha: bcrypt.hashSync(usuario.senha, 8),
                        catador: {
                            create: {}

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
                                        complemento: usuario.endereco.complemento
                                    }
                                }
                            }
                        },
                        pessoa_fisica: {
                            create: {
                                cpf: usuario.cpf,
                                data_nascimento: usuario.data_nascimento,
                                nome: usuario.nome
                            }
                        }

                    },
                    include: {
                        catador: {
                            select: {
                                id: true
                            }
                        }
                    }
                })

                let teste: any

                usuario.materiais.map(async item => {
                    teste = await prisma.materiaisCatador.create({
                        data: {
                            id_catador: result.catador[0].id,
                            id_materiais: item
                        },
                        include: {
                            catador: true
                        }
                    })
                })

                const newUser = {
                    id: result.id,
                    nome: usuario.nome,
                    endereco: {
                        cep: usuario.endereco.cep,
                        logradouro: usuario.endereco.logradouro,
                        bairro: usuario.endereco.bairro,
                        cidade: usuario.endereco.cidade,
                        estado: usuario.endereco.estado,
                        complemento: usuario.endereco.estado
                    },
                    telefone: usuario.telefone,
                    email: usuario.email,
                    senha: result.senha,
                    materiais: usuario.materiais,
                    cpf: usuario.cpf,
                    data_nascimento: usuario.data_nascimento
                }


                return (result ? newUser : false)
            }

        } catch (error) {
            console.log(error);
            return error
        }
    }

    public async newUserCatadorJud(usuario: Omit<ICatador, 'id'>): Promise<Usuario | any> {

        try {
            if (usuario.cnpj) {
                const result = await prisma.usuario.create({
                    data: {
                        email: usuario.email,
                        telefone: usuario.telefone,
                        senha: bcrypt.hashSync(usuario.senha, 8),
                        catador: {
                            create: {}

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
                                        complemento: usuario.endereco.complemento
                                    }
                                }
                            }
                        },
                        pessoa_juridica: {
                            create: {
                                cnpj: usuario.cnpj,
                                nome_fantasia: usuario.nome
                            }
                        }

                    },
                    include: {
                        catador: {
                            select: {
                                id: true
                            }
                        }
                    }
                })

                let teste: any

                usuario.materiais.map(async item => {
                    teste = await prisma.materiaisCatador.create({
                        data: {
                            id_catador: result.catador[0].id,
                            id_materiais: item
                        },
                        include: {
                            catador: true
                        }
                    })
                })

                console.log(teste);

                const newUser = {
                    id: result.id,
                    nome: usuario.nome,
                    endereco: {
                        cep: usuario.endereco.cep,
                        logradouro: usuario.endereco.logradouro,
                        bairro: usuario.endereco.bairro,
                        cidade: usuario.endereco.cidade,
                        estado: usuario.endereco.estado,
                        complemento: usuario.endereco.estado
                    },
                    telefone: usuario.telefone,
                    email: usuario.email,
                    senha: result.senha,
                    materiais: usuario.materiais,
                    cnpj: usuario.cnpj,
                    data_nascimento: usuario.data_nascimento
                }


                return (result ? newUser : false)
            }

        } catch (error) {
            console.log(error);
            return error
        }
    }

    public async newUserGerador(usuario: Omit<IGerador, 'id'>): Promise<Usuario | any> {

        try {

            if (usuario.cpf) {
                const result = await prisma.usuario.create({
                    data: {
                        email: usuario.email,
                        telefone: usuario.telefone,
                        senha: bcrypt.hashSync(usuario.senha),
                        endereco_usuario: {
                            create: {
                                endereco: {
                                    create: {
                                        bairro: usuario.endereco.bairro,
                                        cep: usuario.endereco.cep,
                                        cidade: usuario.endereco.cidade,
                                        estado: usuario.endereco.estado,
                                        logradouro: usuario.endereco.logradouro,
                                        complemento: usuario.endereco.complemento
                                    }
                                }
                            }
                        },
                        pessoa_fisica: {
                            create: {
                                cpf: usuario.cpf,
                                data_nascimento: usuario.data_nascimento,
                                nome: usuario.nome
                            }
                        },
                        gerador: {
                            create: {}
                        }

                    }
                })

                const newUser = {
                    id: result.id,
                    nome: usuario.nome,
                    endereco: {
                        cep: usuario.endereco.cep,
                        logradouro: usuario.endereco.logradouro,
                        bairro: usuario.endereco.bairro,
                        cidade: usuario.endereco.cidade,
                        estado: usuario.endereco.estado,
                        complemento: usuario.endereco.estado
                    },
                    telefone: usuario.telefone,
                    email: usuario.email,
                    senha: result.senha,
                    cpf: usuario.cpf,
                    data_nascimento: usuario.data_nascimento
                }


                return (result ? newUser : false)
            }


        } catch (error) {
            return error
        }
    }

    public async newUserGeradorJud(usuario: Omit<IGerador, 'id'>): Promise<Usuario | any> {

        try {

            if (usuario.cnpj) {
                const result = await prisma.usuario.create({
                    data: {
                        email: usuario.email,
                        telefone: usuario.telefone,
                        senha: bcrypt.hashSync(usuario.senha),
                        endereco_usuario: {
                            create: {
                                endereco: {
                                    create: {
                                        bairro: usuario.endereco.bairro,
                                        cep: usuario.endereco.cep,
                                        cidade: usuario.endereco.cidade,
                                        estado: usuario.endereco.estado,
                                        logradouro: usuario.endereco.logradouro,
                                        complemento: usuario.endereco.complemento
                                    }
                                }
                            }
                        },
                        pessoa_juridica: {
                            create: {
                                cnpj: usuario.cnpj,
                                nome_fantasia: usuario.nome
                            }
                        },
                        gerador: {
                            create: {}
                        }

                    }
                })

                const newUser = {
                    id: result.id,
                    nome: usuario.nome,
                    endereco: {
                        cep: usuario.endereco.cep,
                        logradouro: usuario.endereco.logradouro,
                        bairro: usuario.endereco.bairro,
                        cidade: usuario.endereco.cidade,
                        estado: usuario.endereco.estado,
                        complemento: usuario.endereco.estado
                    },
                    telefone: usuario.telefone,
                    email: usuario.email,
                    senha: result.senha,
                    cnpj: usuario.cnpj,
                    data_nascimento: usuario.data_nascimento
                }


                return (result ? newUser : false)
            }

        } catch (error) {
            console.log(error);
            return error
        }
    }

    public async getUserBy(value: string): Promise<boolean | any> {

        const result = await prisma.usuario.findFirst({
            where: {
                email: value
            },
            include: {
                catador: {
                    include: {
                        materiais_catador: {
                            include: {
                                material: true
                            }
                        }
                    }
                },
                gerador: true,
                pessoa_fisica: true,
                pessoa_juridica: true,
                endereco_usuario: {
                    include: {
                        endereco: true
                    }
                }
            }
        })

        return (result != null ? result : false)

    }

    public async getUserById(value: string): Promise<boolean | any> {

        const result = await prisma.usuario.findFirst({
            where: {
                id: value
            },
            include: {
                catador: {
                    include: {
                        materiais_catador: {
                            include: {
                                material: true
                            }
                        }
                    }
                },
                gerador: true,
                pessoa_fisica: true,
                pessoa_juridica: true,
                endereco_usuario: {
                    include: {
                        endereco: true
                    }
                }
            }
        })

        return (result != null ? result : false)

    }


}

export default new Usuario()