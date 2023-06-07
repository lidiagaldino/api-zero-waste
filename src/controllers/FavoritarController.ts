import IFavoritar from "../interfaces/Favoritar";

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Favoritar from "../DAO/Favoritar";
import Catador from "../DAO/Catador";
import Gerador from "../DAO/Gerador";

class FavoritarController {
  public async toggle(
    req: Request<{}, {}, Omit<IFavoritar, "id">>,
    res: Response
  ) {
    const body = req.body;

    const catadorExists = await Catador.getById(body.id_catador);
    if (!catadorExists)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Catador não existe" });

    const geradorExists = await Gerador.getById(body.id_gerador);
    if (!geradorExists)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Gerador não existe" });

    const rs = await Favoritar.favorite(body.id_gerador, body.id_catador);

    return rs.action == "DELETED"
      ? res.status(StatusCodes.OK).json(rs)
      : res.status(StatusCodes.CREATED).json(rs);
  }

  public async index(req: Request, res: Response) {
    const id = req.params.id;

    const rs = await Favoritar.getAll(Number(id));

    return rs.length > 0
      ? res.status(StatusCodes.OK).json(rs)
      : res.status(StatusCodes.NOT_FOUND).json({});
  }

  public async getGeradores(req: Request, res: Response) {
    const { id } = req.params;

    const rs = await Favoritar.getGeradores(Number(id));

    return rs.length > 0
      ? res.status(StatusCodes.OK).json(rs)
      : res.status(StatusCodes.NOT_FOUND).json({});
  }

  public async getById(req: Request, res: Response) {
    const { id_catador, id_gerador } = req.params;

    const rs = await Favoritar.getById(Number(id_gerador), Number(id_catador));

    return rs.length > 0
      ? res.status(StatusCodes.OK).json(rs)
      : res.status(StatusCodes.NOT_FOUND).json({});
  }

  public async getByEndereco(req: Request, res: Response) {
    const { id_endereco, id_gerador } = req.params;

    const rs = await Favoritar.getByEndereco(
      Number(id_gerador),
      Number(id_endereco)
    );

    return rs.length > 0
      ? res.status(StatusCodes.OK).json(rs)
      : res.status(StatusCodes.NOT_FOUND).json({});
  }
}

export default new FavoritarController();
