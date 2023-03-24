import { Router } from 'express'
import MateriaisController from '../controllers/MateriaisController'
import { auth } from '../middleware/auth'
import { verifyCatador } from '../middleware/verifyCatador'

const routes = Router()

routes.get('/', MateriaisController.index)
routes.get('/:id', MateriaisController.getByCatador)
routes.post('/:id_catador/:id_material', auth, verifyCatador, MateriaisController.storeCatador)
routes.delete('/:id_catador/:id_material', auth, verifyCatador, MateriaisController.delete)

export default routes