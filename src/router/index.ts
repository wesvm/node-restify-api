import { Router } from 'restify-router'
import convertRouter from './convert.router'

const PrincipalRouter = new Router()

//const ThreeRouter = new Router()
//ThreeRouter.add('/transform', convertRouter)

PrincipalRouter.add('/api/v1', convertRouter)

export default PrincipalRouter