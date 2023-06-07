import { Router } from "express";
import { validation } from "../middleware/validation";
import { favoritarBodyValidation } from "../schemas/favoritarSchema";
import FavoritarController from "../controllers/FavoritarController";
import { auth } from "../middleware/auth";
import { verifyCatador } from "../middleware/verifyCatador";
import { verifyGerador } from "../middleware/verifyGerador";
import { enderecoExists } from "../middleware/enderecoExists";

const routes = Router();

routes.get("/:id", auth, FavoritarController.index);
routes.get("/geradores/:id", auth, FavoritarController.getGeradores);
routes.patch(
  "/",
  validation({ body: favoritarBodyValidation }),
  auth,
  verifyCatador("body"),
  FavoritarController.toggle
);
routes.get("/:id_gerador/:id_catador", FavoritarController.getById);

routes.get(
  "/endereco/:id_gerador/:id_endereco",
  verifyGerador("params"),
  auth,
  FavoritarController.getByEndereco
);

export default routes;
