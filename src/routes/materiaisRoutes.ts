import { Router } from 'express'
import MateriaisController from '../controllers/MateriaisController'
import { auth } from '../middleware/auth'
import { verifyCatador } from '../middleware/verifyCatador'
import { validation } from '../middleware/validation'
import { materiaisBodyValidation } from '../schemas/materiaisSchema'

const routes = Router()

routes.get('/', MateriaisController.index)
routes.get('/:id', MateriaisController.getByCatador)
routes.get('/not_collect/:id_catador', MateriaisController.getNoMateriaisCatador)
routes.post('/catador', auth, verifyCatador('body'), validation({ body: materiaisBodyValidation}), MateriaisController.storeCatador)
routes.post('/', MateriaisController.store)
routes.delete('/:id_catador/:id_material', auth, verifyCatador('params'), MateriaisController.delete)

export default routes