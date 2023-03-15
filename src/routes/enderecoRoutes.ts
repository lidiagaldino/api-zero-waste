import { Router } from 'express'
import EnderecoController from '../controllers/EnderecoController'
import { enderecoBodyValidation } from '../schemas/EnderecoSchema'
import { validation } from '../middleware/validation'

const routes = Router()

routes.post('/', validation({ body: enderecoBodyValidation }), EnderecoController.store)

export default routes