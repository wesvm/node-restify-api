import { Router } from 'restify-router';
import convertController from '../controller/convert.controller';

const convertRouter = new Router();

convertRouter.get('/mp4towebm', convertController.convertMp4ToWebm);
convertRouter.get('/webmtomp4', convertController.convertWebmToMp4);
convertRouter.get('/mutevideos', convertController.muteVods);

convertRouter.post('/:filename', convertController.createFile);

export default convertRouter;