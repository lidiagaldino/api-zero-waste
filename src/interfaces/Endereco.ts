export default interface IEndereco {
    cep: string,
    logradouro: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string,
    numero: string,
    complemento?: string
}