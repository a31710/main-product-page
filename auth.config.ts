import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
