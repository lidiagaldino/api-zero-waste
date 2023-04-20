import * as yup from "yup";
import IFavoritar from "../interfaces/Favoritar";
import IMateriais from "../interfaces/Materiais";

interface IBodyProps extends Omit<IMateriais, "id"> {}

export const materiaisBodyValidation: yup.SchemaOf<IBodyProps> = yup
  .object()
  .shape({
    id_catador: yup.number().required(),
    id_materiais: yup.array().of(yup.number()).required(),
  });
