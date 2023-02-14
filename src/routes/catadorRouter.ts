import { Router } from 'express'
import CatadorController from '../controllers/CatadorController'

const routes = Router()

routes.get('/', CatadorController.index)

export default routes