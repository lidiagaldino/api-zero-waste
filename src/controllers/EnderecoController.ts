import { Request, Response } from "express";
import Endereco from "../DAO/Endereco";
import IEndereco from "../interfaces/Endereco";
import { StatusCodes } from "http-status-codes";

type TParams = {
  id: string;
};

class EnderecoController {
  public async store(
    req: Request<{}, {}, Omit<IEndereco, "id">>,
    res: Response
  ) {
    const rs = await Endereco.newEndereco(req.body);

    return rs == false
      ? res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Não foi possível criar" })
      : res.status(StatusCodes.CREATED).json(rs);
  }

  public async getByUser(req: Request, res: Response) {
    const { id } = req.params;

    const rs = await Endereco.findByUser(Number(id));

    return rs == false
      ? res.status(StatusCodes.NOT_FOUND).json({ message: "NOT FOUND" })
      : res.status(StatusCodes.OK).json(rs);
  }

  public async delete(req: Request, res: Response) {
    const { id_endereco, id_usuario } = req.params;

    const result = await Endereco.delete(
      Number(id_endereco),
      Number(id_usuario)
    );
    console.log(result);

    return result
      ? res.status(StatusCodes.OK).json({ message: "Deletado" })
      : res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Algo deu errado" });
  }

  public async update(
    req: Request<TParams, {}, Omit<IEndereco, "id">>,
    res: Response
  ) {
    const { id } = req.params;
    const { id_usuario } = req;
    const body = req.body;

    const exists = await Endereco.findByUserEndereco(
      Number(id_usuario),
      Number(id)
    );

    if (!exists)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Endereço não existe ou não pertence ao usuário registrado",
      });

    const result = await Endereco.update(Number(id), body);

    return result
      ? res.status(StatusCodes.OK).json(result)
      : res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Nada foi alterado" });
  }

  public async getById(req: Request<TParams, {}, {}>, res: Response) {
    const { id } = req.params;

    const endereco = await Endereco.findById(Number(id));

    return endereco
      ? res.status(StatusCodes.OK).json(endereco)
      : res.status(StatusCodes.NOT_FOUND).json({ message: "NOT_FOUND" });
  }
}

export default new EnderecoController();
