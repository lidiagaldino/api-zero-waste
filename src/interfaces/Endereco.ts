export default interface IEndereco {
    cep: string,
    logradouro: string,
    bairro: string,
    cidade: string,
    estado: string
    complemento: string | null
}