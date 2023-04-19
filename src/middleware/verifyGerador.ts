import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Catador from "../DAO/Catador";
import Gerador from "../DAO/Gerador";

type modos = "body" | "params";

export const verifyGerador =
  (modo: modos) => async (req: Request, res: Response, next: NextFunction) => {
    const verificar = await Gerador.getById(req[modo].id_gerador);

    if (!verificar)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Gerador não existe" });

    next();
  };
