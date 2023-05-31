import { Request, Response, Next } from 'restify';

class ConvertController {
    getTest(_req: Request, res: Response, next: Next) {
        res.send('this is a get');
        next();
    }
}

export default new ConvertController();