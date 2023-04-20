import * as yup from "yup";
import ICatador from "../interfaces/Catador";

interface IBodyProps extends Omit<ICatador, "id"> {}

export const catadorBodyValidation: yup.SchemaOf<IBodyProps> = yup
  .object()
  .shape({
    nome: yup.string().required().min(3).max(100),
    endereco: yup.object({
      cep: yup.string().required(),
      logradouro: yup.string().required(),
      bairro: yup.string().required(),
      cidade: yup.string().required(),
      estado: yup.string().required(),
      complemento: yup.string().nullable().required(),
      numero: yup.string().required(),
      latitude: yup.string().required(),
      longitude: yup.string().required(),
    }),
    telefone: yup.string().required().min(14),
    email: yup.string().email().required().min(10),
    senha: yup.string().required().min(5),
    materiais: yup.array().of(yup.number().required()).required(),
    cnpj: yup.string().test(function (value) {
      const { cpf } = this.parent;
      if (!cpf) return value != null;
      return true;
    }),
    cpf: yup.string().test(function (value) {
      const { cnpj } = this.parent;
      if (!cnpj) return value != null;
      return true;
    }),
    data_nascimento: yup.date().required(),
  });
