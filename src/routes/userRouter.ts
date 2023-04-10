import { Router } from 'express'
import UsuarioController from '../controllers/UsuarioController'
import { auth } from '../middleware/auth'
import { usuarioBodyValidation } from '../schemas/usuarioSchema'
import { validation } from '../middleware/validation'

const routes = Router()

routes.post('/auth', UsuarioController.auth)
routes.get('/', auth, UsuarioController.dados)
routes.get('/:id', auth, UsuarioController.getById)
routes.put('/', auth, validation({ body: usuarioBodyValidation }), UsuarioController.update)
routes.patch('/bio', auth, UsuarioController.updateBio)
routes.patch('/photo', auth, UsuarioController.updatePhoto)

export default routes