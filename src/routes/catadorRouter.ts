import { Router } from 'express'
import CatadorController from '../controllers/CatadorController'
import { catadorBodyValidation } from '../schemas/catadorSchema'
import { verify } from '../middleware/verify'
import { validation } from '../middleware/validation'

const routes = Router()

routes.get('/', CatadorController.index)
routes.post('/', validation({ body: catadorBodyValidation }), verify, CatadorController.store)

export default routes