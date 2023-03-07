import express from 'express'
import cors from 'cors'
import catadorRoutes from './routes/catadorRouter'
import geradorRoutes from './routes/geradorRouter'
import materiaisRoutes from './routes/materiaisRoutes'
import userRouter from './routes/userRouter'

class App {
    public app: express.Application

    public constructor() {
        this.app = express()

        this.middleware()
        this.routes()
    }

    private middleware() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    private routes() {
        this.app.use('/catador', catadorRoutes)
        this.app.use('/gerador', geradorRoutes)
        this.app.use('/materiais', materiaisRoutes)
        this.app.use('/user', userRouter)
    }
}

export default new App().app