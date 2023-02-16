export default interface ICatador {
    id: number,
    nome: string,
    endereco: {
        cep: string,
        logradouro: string,
        bairro: string,
        cidade: string,
        estado: string,
        complemento: string | null
    },
    telefone: string,
    email: string,
    senha: string,
    materiais: [number],
    cpf?: string,
    cnpj?: string,
    data_nascimento: Date
}