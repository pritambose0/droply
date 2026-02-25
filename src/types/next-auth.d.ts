import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface User {
        id: string;
        name: string;
        email: string;
        role: "creator" | "buyer";
    }

    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: "creator" | "buyer";
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
        role: "creator" | "buyer";
    }
}