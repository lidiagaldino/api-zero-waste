import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface IPayload extends JwtPayload {
  id_usuario: number;
  id_modo: number;
  user_type: "CATADOR" | "GERADOR";
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Não autotizado" });
  }

  const [, token] = authorization.split(" ");
  console.log(token);

  try {
    const data = jwt.verify(token, "secret") as IPayload;

    const { id } = data as IPayload;

    req.id_usuario = id;
    req.user = data;

    return next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Não autorizado" });
  }
};
