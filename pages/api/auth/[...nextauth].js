import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "",
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.login,
        };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    encryption: true,
    secret: process.env.NEXTAUTH_JWE_SECRET,
  },
  database: process.env.DATABASE_URL,
});
