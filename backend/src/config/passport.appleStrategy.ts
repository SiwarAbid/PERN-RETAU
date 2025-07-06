import passport from 'passport';
import { Strategy as AppleStrategy, Profile, VerifyCallback } from 'passport-apple';
import { prisma } from '../prisma'; // ton instance Prisma
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

interface AppleIdTokenPayload {
  email?: string;
  sub: string; // l’identifiant unique Apple
  name?: string;
}
dotenv.config(); // 👈 Important
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}
  console.log("✅ APPLE_CLIENT_ID is defined in .env");
passport.use(new AppleStrategy({
  clientID: requireEnv('APPLE_CLIENT_ID'),
  teamID: requireEnv('APPLE_TEAM_ID'),
  keyID: requireEnv('APPLE_KEY_ID'),
  privateKeyString: requireEnv('APPLE_PRIVATE_KEY'),
  passReqToCallback: false,
  callbackURL: "/auth/apple/callback"
}, async ( accessToken: string,
        refreshToken: string,
        idToken: string,
        profile: Profile,
        done: VerifyCallback ) => {
    try {
    const decoded = jwt.decode(idToken) as AppleIdTokenPayload;

    if (!decoded?.email) {
      return done(null, undefined, { message: "Email non fourni par Apple" });
    }
    const email = decoded.email;
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        user = await prisma.user.create({
        data: {
            email,
            name: decoded.name || '',
            password: '', // pas de mot de passe (utilisateur social)
            provider: 'APPLE',
        }
        });
        console.log(" USER CREATED : ", user)
    } else if (user && user.provider !== "APPLE") {
            console.log(" USER FOUND : ", user )
            return done(null, undefined, {
            message:
                "Un compte avec cet email existe déjà avec un autre mode de connexion.",
            });
        }

    return done(null, user);
    } catch (err: any) {
      return done(err);
    }
}));
