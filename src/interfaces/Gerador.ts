export default interface IGerador {
    id: number,
    nome: string,
    endereco: {
        cep: string,
        logradouro: string,
        bairro: string,
        cidade: string,
        estado: string,
        complemento: string | null,
        numero: string,
        latitude: string,
        longitude: string
    },
    telefone: string,
    email: string,
    senha: string,
    cpf?: string,
    cnpj?: string,
    data_nascimento: Date
}