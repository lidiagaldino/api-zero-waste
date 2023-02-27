import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
    await prisma.pessoaFisica.deleteMany()
    await prisma.pessoaJuridica.deleteMany()
    await prisma.materiaisCatador.deleteMany()
    await prisma.materiais.deleteMany()
    await prisma.enderecoUsuario.deleteMany()
    await prisma.endereco.deleteMany()
    await prisma.catador.deleteMany()
    await prisma.gerador.deleteMany()
    await prisma.usuario.deleteMany()

    await Promise.all([
        prisma.usuario.create({
            data: {
                email: 'lidia@gmail.com',
                senha: bcrypt.hashSync('lidia123', 8),
                telefone: "12345678987654",
                pessoa_fisica: {
                    create: {
                        cpf: '47189168877',
                        data_nascimento: '2000-02-05T12:01:30.543Z',
                        nome: 'Lídia Galdino'
                    }
                },
                endereco_usuario: {
                    create: {
                        endereco: {
                            create: {
                                bairro: 'Parque Viana',
                                cep: '40002000',
                                cidade: 'Barueri',
                                estado: 'SP',
                                logradouro: 'Estrada das Pitas',
                                complemento: 'apt4',
                            }
                        }
                    },
                },
                catador: {
                    create: {
                        materiais_catador: {
                            create: {
                                material: {
                                    create: {
                                        nome: 'Ferro'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }),

        prisma.usuario.create({
            data: {
                email: 'eduardo@gmail.com',
                senha: bcrypt.hashSync('eduardo123', 8),
                telefone: "98765432123456",
                pessoa_fisica: {
                    create: {
                        cpf: '47189167722',
                        data_nascimento: '2000-02-05T12:01:30.543Z',
                        nome: 'Eduardo Perucci'
                    }
                },
                endereco_usuario: {
                    create: {
                        endereco: {
                            create: {
                                bairro: 'Bairro',
                                cep: '40002001',
                                cidade: 'Barueri',
                                estado: 'SP',
                                logradouro: 'Estrada',
                                complemento: 'apt2',
                            }
                        }
                    },
                },
                catador: {
                    create: {
                        materiais_catador: {
                            create: {
                                material: {
                                    create: {
                                        nome: 'Madeira'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    ])

    await Promise.all([
        prisma.usuario.create({
            data: {
                email: 'miguel@gmail.com',
                senha: bcrypt.hashSync('miguel123', 8),
                telefone: "98765432123456",
                pessoa_fisica: {
                    create: {
                        cpf: '47189167733',
                        data_nascimento: '2000-02-05T12:01:30.543Z',
                        nome: 'Miguel'
                    }
                },
                endereco_usuario: {
                    create: {
                        endereco: {
                            create: {
                                bairro: 'Bairro',
                                cep: '40002001',
                                cidade: 'Barueri',
                                estado: 'SP',
                                logradouro: 'Estrada da Terra',
                                complemento: 'apt1',
                            }
                        }
                    },
                },
                gerador: {
                    create: {

                    }
                }
            }
        })
    ])
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })