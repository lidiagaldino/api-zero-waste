import * as yup from 'yup'
import IGerador from '../interfaces/Gerador'

interface IBodyProps extends Omit<IGerador, 'id'> {}

export const geradorBodyValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    nome: yup.string().required(),
    endereco: yup.object({
        cep: yup.string().required(),
        logradouro: yup.string().required(),
        bairro: yup.string().required(),
        cidade: yup.string().required(),
        estado: yup.string().required(),
        pais: yup.string().required(),
        numero: yup.string().required(),
        complemento: yup.string()
    }),
    telefone: yup.string().required().min(14),
    email: yup.string().required().min(10),
    senha: yup.string().required().min(5),
})