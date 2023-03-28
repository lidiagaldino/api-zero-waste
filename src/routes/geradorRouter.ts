import { Router } from 'express'
import GeradorController from '../controllers/GeradorController'
import { geradorBodyValidation } from '../schemas/geradorSchema'
import { verify } from '../middleware/verify'
import { validation } from '../middleware/validation'
import { auth } from '../middleware/auth'

const routes = Router()

routes.get('/', GeradorController.index)
routes.post('/', validation({ body: geradorBodyValidation }), verify, GeradorController.store)
routes.get('/:id_endereco', auth, GeradorController.nearCatadores)

export default routes