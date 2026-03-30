import connectDB from "@/lib/connectDB";
import UserModel from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, User } from "next-auth";
import { signinSchema } from "@/schemas/authSchema";
import { validate } from "@/helpers/validate";
import logger from "@/lib/logger";

if (process.env.NODE_ENV === "production" && !process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET must be set in production");
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials): Promise<User | null> {

                const { email, password } = validate(signinSchema, credentials);

                await connectDB();

                const user = await UserModel.findOne({ email }).select("+password");

                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const isPasswordValid = await user.comparePassword(password);

                if (!isPasswordValid) {
                    throw new Error("Invalid email or password");
                }

                if (!user.isVerified) {
                    throw new Error("UNVERIFIED_EMAIL");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };

            },
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                role: token.role,
            };
            return session;
        }
    },

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60, // 10 days
        updateAge: 24 * 60 * 60, // 1 day
    },

    cookies: {
        sessionToken: {
            name: process.env.NODE_ENV === "production"
                ? `__Secure-next-auth.session-token`
                : `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },

    events: {
        async signIn({ user }) {
            logger.info({ userId: user.id, email: user.email }, "User signed in");
        },
        async signOut({ token }) {
            logger.info({ userId: token.id }, "User signed out");
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
}