import { Router } from 'express'
import GeradorController from '../controllers/GeradorController'
import { geradorBodyValidation } from '../schemas/geradorSchema'
import { verify } from '../middleware/verify'
import { validation } from '../middleware/validation'

const routes = Router()

routes.get('/', GeradorController.index)
routes.post('/', validation({ body: geradorBodyValidation }), verify, GeradorController.store)

export default routes