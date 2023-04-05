import express from 'express'
import cors, { CorsOptions } from 'cors'
import catadorRoutes from './routes/catadorRouter'
import geradorRoutes from './routes/geradorRouter'
import materiaisRoutes from './routes/materiaisRoutes'
import userRouter from './routes/userRouter'
import enderecoRoutes from './routes/enderecoRoutes'
import favoritarRoutes from './routes/favoritarRoutes'
import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import http from 'http'

class App {
    public app: express.Application
    public httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
    public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

    public constructor() {
        this.app = express()
        this.httpServer = http.createServer(this.app)

        this.middleware()
        this.routes()
    }

    private enableCors(){
        const options: CorsOptions = {
            methods: 'GET,PUT,POST,DELETE,PATCH',
            origin: '*'
        }
        this.app.use(cors(options))
    }

    private middleware() {
        this.enableCors()
        this.io = new Server(this.httpServer, {
            cors: {
                origin: "*"
            }
        })
        this.app.use(express.json())
    }

    private routes() {
        this.app.use('/catador', catadorRoutes)
        this.app.use('/gerador', geradorRoutes)
        this.app.use('/materiais', materiaisRoutes)
        this.app.use('/user', userRouter)
        this.app.use('/endereco', enderecoRoutes)
        this.app.use('/favoritar', favoritarRoutes)

    }
}

export default new App()