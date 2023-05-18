"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.pessoaFisica.deleteMany();
        yield prisma.pessoaJuridica.deleteMany();
        yield prisma.materiaisCatador.deleteMany();
        yield prisma.materiais.deleteMany();
        yield prisma.enderecoUsuario.deleteMany();
        yield prisma.endereco.deleteMany();
        yield prisma.favoritarCatador.deleteMany();
        yield prisma.catador.deleteMany();
        yield prisma.gerador.deleteMany();
        yield prisma.usuario.deleteMany();
        yield Promise.all([
            prisma.usuario.create({
                data: {
                    email: "lidia@gmail.com",
                    senha: bcryptjs_1.default.hashSync("lidia123", 8),
                    pontos: 10,
                    telefone: "12345678987654",
                    foto: "https://cdn-icons-png.flaticon.com/512/5231/5231019.png",
                    pessoa_fisica: {
                        create: {
                            cpf: "47189168877",
                            data_nascimento: "2000-02-05T12:01:30.543Z",
                            nome: "Lídia Galdino",
                        },
                    },
                    endereco_usuario: {
                        create: {
                            endereco: {
                                create: {
                                    bairro: "Parque Viana",
                                    cep: "06449-300",
                                    cidade: "Barueri",
                                    estado: "SP",
                                    logradouro: "Estrada das Pitas",
                                    complemento: "134C",
                                    latitude: -23.549294,
                                    longitude: -46.87274,
                                    numero: "952",
                                    apelido: "Principal",
                                },
                            },
                        },
                    },
                    catador: {
                        create: {
                            status_catador: {
                                create: {
                                    status: "available",
                                },
                            },
                            materiais_catador: {
                                create: {
                                    material: {
                                        create: {
                                            nome: "Ferro",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
            prisma.usuario.create({
                data: {
                    email: "eduardo@gmail.com",
                    senha: bcryptjs_1.default.hashSync("eduardo123", 8),
                    pontos: 10,
                    foto: "https://cdn-icons-png.flaticon.com/512/5231/5231019.png",
                    telefone: "98765432123456",
                    pessoa_fisica: {
                        create: {
                            cpf: "47189167722",
                            data_nascimento: "2000-02-05T12:01:30.543Z",
                            nome: "Eduardo Perucci",
                        },
                    },
                    endereco_usuario: {
                        create: {
                            endereco: {
                                create: {
                                    bairro: "Parque Viana",
                                    cep: "06449-300",
                                    cidade: "Barueri",
                                    estado: "SP",
                                    logradouro: "Estrada das Pitas",
                                    complemento: "134C",
                                    latitude: -23.549294,
                                    longitude: -46.87274,
                                    numero: "952",
                                    apelido: "Principal",
                                },
                            },
                        },
                    },
                    catador: {
                        create: {
                            status_catador: {
                                create: {
                                    status: "unavailable",
                                },
                            },
                            materiais_catador: {
                                create: {
                                    material: {
                                        create: {
                                            nome: "Madeira",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
        ]);
        yield Promise.all([
            prisma.usuario.create({
                data: {
                    email: "miguel@gmail.com",
                    senha: bcryptjs_1.default.hashSync("miguel123", 8),
                    pontos: 10,
                    foto: "https://cdn-icons-png.flaticon.com/512/5231/5231019.png",
                    telefone: "98765432123456",
                    pessoa_fisica: {
                        create: {
                            cpf: "47189167733",
                            data_nascimento: "2000-02-05T12:01:30.543Z",
                            nome: "Miguel",
                        },
                    },
                    endereco_usuario: {
                        create: {
                            endereco: {
                                create: {
                                    bairro: "Parque Viana",
                                    cep: "06449-300",
                                    cidade: "Barueri",
                                    estado: "SP",
                                    logradouro: "Estrada das Pitas",
                                    complemento: "134C",
                                    latitude: -23.549294,
                                    longitude: -46.87274,
                                    numero: "952",
                                    apelido: "Principal",
                                },
                            },
                        },
                    },
                    gerador: {
                        create: {},
                    },
                },
            }),
        ]);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
