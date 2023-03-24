export default interface IUsuario {
    id: string,
    nome: string,
    telefone: string,
    email: string,
    senha: string,
    cpf?: string,
    cnpj?: string
}