import { Router } from 'express';
import {
  register,
  login,
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback,
  appleAuth,
  appleCallback,
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
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// Facebook
router.get('/facebook', facebookAuth);
router.get('/facebook/callback', facebookCallback);

// Apple
router.get('/apple', appleAuth);
router.get('/apple/callback', appleCallback);

export default router;