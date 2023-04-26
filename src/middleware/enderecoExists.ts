import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Endereco from "../DAO/Endereco";

export const enderecoExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const verificar = await Endereco.findByUser(Number(req.params.id_usuario));

  console.log(verificar);

  if (verificar.length == 1) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Você deve ter no minímo um endereço" });
  }

  verificar.map((item: any) => {
    if (
      item.endereco.cep == req.body.cep &&
      item.endereco.complemento == req.body.complemento
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Endereço já existe" });
    }
  });

  return next();
};
