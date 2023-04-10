import { Router } from 'express'
import EnderecoController from '../controllers/EnderecoController'
import { enderecoBodyValidation } from '../schemas/EnderecoSchema'
import { validation } from '../middleware/validation'
import { enderecoExists } from '../middleware/enderecoExists'
import { verify } from 'jsonwebtoken'
import { auth } from '../middleware/auth'
import { verifyUser } from '../middleware/verifyUser'

const routes = Router()

routes.post('/', validation({ body: enderecoBodyValidation }), enderecoExists ,EnderecoController.store)
routes.put('/:id_endereco', auth, validation({body: enderecoBodyValidation}), EnderecoController.update)
routes.delete('/:id_usuario/:id_endereco', auth, verifyUser ,EnderecoController.delete)
routes.get('/:id', EnderecoController.getByUser)

export default routes