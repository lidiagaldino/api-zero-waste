import * as yup from 'yup'
import ICatador from '../interfaces/Catador'

interface IBodyProps extends Omit<ICatador, 'id'> {}

export const catadorBodyValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3).max(100),
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
    materiais: yup.array().of(yup.number().required()).required()
})