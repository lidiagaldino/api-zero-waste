import { Router } from 'express'
import MateriaisController from '../controllers/MateriaisController'

const routes = Router()

routes.get('/', MateriaisController.index)
routes.get('/:id', MateriaisController.getByCatador)

export default routes