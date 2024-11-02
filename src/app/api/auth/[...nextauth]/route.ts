import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Replace this with your logic to validate the user credentials
                const user = {
                    id: '1', // Mock user ID
                    email: credentials?.email || '',
                }; // Mock user for demonstration

                if (credentials?.email === 'you@example.com' && credentials?.password === 'password') {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin', // Custom sign-in page
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Assuming `id` is on the user object
            }
            return token;
        },
        async session({ session, token }) {
            // Cast session.user to the extended type to ensure TypeScript knows about `id`
            if (token) {
                session.user.id = token.id as string; // Ensure ID is properly typed
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
