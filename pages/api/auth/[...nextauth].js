import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    encryption: true,
    secret: process.env.NEXTAUTH_JWE_SECRET,
  },
  callbacks: {
    async session(session, token) {
      // console.log(session, token)
      if (token?.accessToken) {
        // Add property to session, like an access_token from a provider
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
});
