import { Router } from 'express'
import GeradorController from '../controllers/GeradorController'

const routes = Router()

routes.get('/', GeradorController.index)

export default routes