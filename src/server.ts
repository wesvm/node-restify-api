import restify from 'restify'
import PrincipalRouter from './router'
import morgan from 'morgan';
import bunyan from 'bunyan'

const server = restify.createServer({
    name: 'bootcamp',
    log: bunyan.createLogger({
        name: 'audit',
        level: 'error'
    })
})

server.use(morgan('dev'))

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

PrincipalRouter.applyRoutes(server)

const executeMainServer = () => {
    server.listen(8080, () => {
        console.log('%s listening at %s', server.name, server.url);
    })
}

export default executeMainServer