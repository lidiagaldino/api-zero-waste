import { Router } from 'express'
import UsuarioController from '../controllers/UsuarioController'
import { auth } from '../middleware/auth'
import { usuarioBodyValidation } from '../schemas/usuarioSchema'
import { validation } from '../middleware/validation'

const routes = Router()

routes.post('/auth', UsuarioController.auth)
routes.get('/', auth, UsuarioController.dados)
routes.put('/:id_usuario', auth, validation({ body: usuarioBodyValidation }), UsuarioController.update)

export default routes