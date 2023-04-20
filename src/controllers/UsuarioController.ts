import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Usuario from "../DAO/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import IUsuario from "../interfaces/Usuario";
import IParams from "../interfaces/Params";

class UsuarioControlelr {
  public async auth(req: Request, res: Response) {
    const { email, senha } = req.body;

    const user = await Usuario.getUserBy(email);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
    }

    const isPassValid = await bcrypt.compare(senha, user.senha);

    if (!isPassValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Não autorizado" });
    }

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

    delete user.senha;

    return res.status(StatusCodes.OK).json({ user, token });
  }

  public async dados(req: Request, res: Response) {
    const id = req.id_usuario;

    const user = await Usuario.getUserById(Number(id));

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
    }

    return res.status(StatusCodes.OK).json(user);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await Usuario.getUserById(Number(id));

    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });

    return res.status(StatusCodes.OK).json(user);
  }
  public async update(req: Request, res: Response) {
    const body = req.body;
    const { id_usuario } = req;

    const rs = await Usuario.updateUser(Number(id_usuario), body);

    return rs
      ? res.status(StatusCodes.OK).json(rs)
      : res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Algo deu errado" });
  }

  public async updatePhoto(req: Request, res: Response) {
    const body = req.body;
    const { id_usuario } = req;

    const rs = await Usuario.updatePhoto(Number(id_usuario), body.url);

    return rs
      ? res.status(StatusCodes.OK).json(rs)
      : res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Algo deu errado" });
  }

  public async updateBio(req: Request, res: Response) {
    const body = req.body;
    const { id_usuario } = req;

    const rs = await Usuario.updateBio(Number(id_usuario), body.bio);

    return rs
      ? res.status(StatusCodes.OK).json(rs)
      : res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Algo deu errado" });
  }
}

export default new UsuarioControlelr();
