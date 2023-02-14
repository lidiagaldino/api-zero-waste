import express from 'express'
import cors from 'cors'
import routes from './routes/catadorRouter'

class App{
    public app: express.Application

    public constructor(){
        this.app = express()   
        
        this.middleware()
        this.routes()
    }

    private middleware(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    private routes(){
        this.app.use('/', routes)
    }
}

export default new App().app