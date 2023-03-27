import * as yup from 'yup'
import IGerador from '../interfaces/Gerador'

interface IBodyProps extends Omit<IGerador, 'id'> { }

export const geradorBodyValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    nome: yup.string().required(),
    endereco: yup.object({
        cep: yup.string().required(),
        logradouro: yup.string().required(),
        bairro: yup.string().required(),
        cidade: yup.string().required(),
        estado: yup.string().required(),
        complemento: yup.string().nullable().required(),
        numero: yup.string().required()
    }),
    telefone: yup.string().required().min(14),
    email: yup.string().email().required(),
    senha: yup.string().required().min(5),
    cnpj: yup.string().test(function (value) {
        const { cpf } = this.parent
        if (!cpf) return value != null
        return true
    }),
    cpf: yup.string().test(function (value) {
        const { cnpj } = this.parent
        if (!cnpj) return value != null
        return true
    }),
    data_nascimento: yup.date().required()
})