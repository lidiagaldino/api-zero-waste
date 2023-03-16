import { Router } from "express";
import { validation } from "../middleware/validation";
import { favoritarBodyValidation } from "../schemas/favoritarSchema";
import FavoritarController from "../controllers/FavoritarController";
import { auth } from "../middleware/auth";

const routes = Router()

routes.get('/:id', auth, FavoritarController.index)
routes.patch('/', validation({ body: favoritarBodyValidation }), auth, FavoritarController.toggle)

export default routes