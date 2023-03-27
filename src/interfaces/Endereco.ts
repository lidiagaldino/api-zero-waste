export default interface IEndereco {
    id: string,
    id_usuario: string,
    cep: string,
    logradouro: string,
    bairro: string,
    cidade: string,
    estado: string,
    complemento: string | null
    apelido: string,
    numero: string
}