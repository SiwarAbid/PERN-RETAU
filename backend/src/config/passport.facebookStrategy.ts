import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { prisma } from '../prisma'; // ton instance Prisma
import 'dotenv/config';


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID!,
  clientSecret: process.env.FACEBOOK_APP_SECRET!,
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails?.[0].value;
    try {
    if (!email) return done(null, false);

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        user = await prisma.user.create({
        data: {
            email,
            name: profile.displayName,
            password: '', // pas de mot de passe (utilisateur social)
            provider: 'FACEBOOK',
        }
        });
        console.log(" USER CREATED : ", user)
    } else if (user && user.provider !== "FACEBOOK") {
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
