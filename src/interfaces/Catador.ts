export default interface ICatador{
    id: number,
    nome: string,
    endereco: {
        cep: string,
        logradouro: string,
        bairro: string,
        cidade: string,
        estado: string,
        pais: string,
        numero: string,
        complemento?: string
    },
    telefone: string,
    email: string,
    senha: string,
    materiais: [number]
}