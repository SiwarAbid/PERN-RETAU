import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../prisma'; // ton instance Prisma
import 'dotenv/config';


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:5000/auth/google/callback',
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
            provider: 'GOOGLE',
        }
        });
        console.log(" USER CREATED : ", user)
    } else if (user && user.provider !== "GOOGLE") {
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


// passport.serializeUser((user: any , done) => done(null, user.id));
// passport.deserializeUser(async (id: number, done) => {
//   const user = await prisma.user.findUnique({ where: { id } });
//   done(null, user);
// });
