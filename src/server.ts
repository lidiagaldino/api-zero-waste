import app from './app'
import http from 'http'
import debug from 'debug'
import { Server } from 'socket.io';

const port = normalizePort(process.env.PORT || '3000');

app.io.on("connection", socket => {
    console.log(`Usuário conectado no socket ${socket.id} `);
})

app.httpServer.listen(port, () => console.log('App rodando'))

function normalizePort(val: string) {

    const port = parseInt(val, 10);

    if (isNaN(port)) {

        return val;
    }

    if (port >= 0) {

        return port;
    }

    return false;
}
