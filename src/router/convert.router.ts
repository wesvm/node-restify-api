import { Router } from 'restify-router';
import convertController from '../controller/convert.controller';

const convertRouter = new Router();

convertRouter.get('/convert', convertController.getTest);

export default convertRouter;