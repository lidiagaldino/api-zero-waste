import { Router } from 'express'
import UsuarioController from '../controllers/UsuarioController'

const routes = Router()

routes.post('/auth', UsuarioController.auth)

export default routes