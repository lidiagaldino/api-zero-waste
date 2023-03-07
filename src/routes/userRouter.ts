import { Router } from 'express'
import UsuarioController from '../controllers/UsuarioController'
import { auth } from '../middleware/auth'

const routes = Router()

routes.post('/auth', UsuarioController.auth)
routes.get('/', auth, UsuarioController.dados)

export default routes