import express ,{ Request, Response, Router }  from 'express';
import { login, register } from '../controllers/auth.controllers';

const router: Router = express.Router();

router.post('/register', (req, res, next) => {
  register(req, res).catch(next);
});

router.post('/login',(req, res, next) => {console.log(req)
  login(req, res).catch(next);
});

export default router;
