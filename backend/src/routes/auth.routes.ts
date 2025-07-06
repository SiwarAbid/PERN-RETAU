import express ,{ Request, Response, Router }  from 'express';
import { login, register, googleAuth, googleCallback, facebookAuth, appleAuth, facebookCallback, appleCallback } from '../controllers/auth.controllers';
import passport from 'passport';
import { generateToken } from '../utils/jwt';

const router: Router = express.Router();

// Inscription
router.post('/register', (req, res, next) => {
  console.log("ROUTER REGISTER : REQ", req)
  register(req, res).catch(next);
});

// Connexion
router.post('/login',(req, res, next) => {
  console.log("ROUTER LOGIN : REQ", req)
  login(req, res).catch(next);
});

// Démarrer OAuth
router.get('/google', googleAuth);
router.get('/facebook', facebookAuth);
router.get('/apple', appleAuth);

// Callback après succès Google
router.get('/google/callback', (req, res, next) => {
  console.log("ROUTER GOOGLE CALLBACK : REQ", req)
  googleCallback(req, res, next).catch(next);
});
router.get('/facebook/callback', (req, res, next) => {
  console.log("ROUTER FACEBOOK CALLBACK : REQ", req)
  facebookCallback(req, res, next).catch(next);
});
router.get('/apple/callback', (req, res, next) => {
console.log("ROUTER APPLE CALLBACK : REQ", req)
  appleCallback(req, res, next).catch(next);
});

export default router;
