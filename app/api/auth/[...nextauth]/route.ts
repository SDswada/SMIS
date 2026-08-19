import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';

export const authOptions = {
  adapter: PrismaAdapter(prisma as any),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.username } });
        if (!user) return null;
        try {
          const ok = await argon2.verify(user.password, credentials.password);
          if (!ok) return null;
          // NextAuth expects an object with at least id and email
          return { id: user.id, email: user.email, name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) (session.user as any).id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
