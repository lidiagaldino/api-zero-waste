import * as yup from "yup";
import IEndereco from "../interfaces/Endereco";

interface IBodyProps extends Omit<IEndereco, "id"> {}

export const enderecoBodyValidation: yup.SchemaOf<IBodyProps> = yup
  .object()
  .shape({
    cep: yup.string().required(),
    logradouro: yup.string().required(),
    bairro: yup.string().required(),
    cidade: yup.string().required(),
    estado: yup.string().required(),
    complemento: yup.string().nullable().required(),
    apelido: yup.string().min(3).required(),
    numero: yup.string().required(),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
    id_usuario: yup.number(),
  });
