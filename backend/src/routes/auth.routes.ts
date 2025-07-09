import { Router } from 'express';
import {
  register,
  login,

  googleCallbackRegister,
  googleCallbackLogin,
  // facebookAuth,
  // facebookCallbackLogin,
  // facebookCallbackRegister,
  // appleAuth,
  // appleCallbackLogin,
  // appleCallbackRegister,
  googleAuthLogin,
  googleAuthRegister,
} from '../controllers/auth.controllers';

const router = Router();

// == AUTHENTICATION ROUTES ==
router.post('/register', (req, res, next) => {
  console.log("ROUTER REGISTER : REQ", req)
  register(req, res).catch(next);
});
router.post('/login', (req, res, next) => {
  console.log("ROUTER LOGIN : REQ", req)
  login(req, res).catch(next);
});

// == SOCIAL AUTH ROUTES ==
// Google
router.get('/google/login', googleAuthLogin);
router.get('/google/register', googleAuthRegister);
router.get('/google/login/callback', googleCallbackLogin);
router.get('/google/register/callback', googleCallbackRegister);

// Facebook
// router.get('/facebook', facebookAuth);
// router.get('/facebook/callback', facebookCallback);

// // Apple
// router.get('/apple', appleAuth);
// router.get('/apple/callback', appleCallback);

export  {router as authRouter};