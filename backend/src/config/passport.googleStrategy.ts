import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../prisma'; // ton instance Prisma
import 'dotenv/config';


passport.use('google-login', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:5000/auth/google/login/callback',
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  const email = profile.emails?.[0].value;
    try {
    if (!email) return done(null, false);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return done(null, false, { message: 'Aucun utilisateur trouvé. Veuillez vous enregistrer. ' });

    else if (user && user.provider !== "GOOGLE") {
            console.log(" USER FOUND : ", user )
            return done(null, false, {
            message:
                "Un compte avec cet email existe déjà avec un autre mode de connexion.",
            });
        }

    return done(null, user);
    } catch (err) {
      return done(err);
    }
}));


passport.use('google-register', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:5000/auth/google/register/callback',
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  const email = profile.emails?.[0].value;
    try {
    if (!email) return done(null, false);

    let user = await prisma.user.findUnique({ where: { email } });

    if (user) return done(null, false, { message: 'Cet email est déjà utilisé.' });

    user = await prisma.user.create({
        data: {
            email,
            name: profile.displayName,
            password: '', // pas de mot de passe (utilisateur social)
            provider: 'GOOGLE',
        }
    });

    return done(null, user); 
    } catch (err) {
      return done(err);
    }
}));

