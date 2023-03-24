import * as yup from 'yup'
import ICatador from '../interfaces/Catador'
import IUsuario from '../interfaces/Usuario'

interface IBodyProps extends Omit<IUsuario, 'id'> { }

export const usuarioBodyValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3).max(100),
    telefone: yup.string().required().min(14),
    email: yup.string().email().required().min(10),
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
})