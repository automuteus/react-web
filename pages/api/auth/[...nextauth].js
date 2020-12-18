import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import Models from "../../../models";

const options = {
  debug: false,
  database: process.env.DATABASE_URL,

  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: "identify email guilds",
    }),
  ],

  adapter: Adapters.TypeORM.Adapter(process.env.DATABASE_URL, {
    models: {
      User: Models.User,
    },
  }),

  session: {
    jwt: true,
  },

  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (account) {
        console.log("user_jwt", user);
        profile.token = account.accessToken;
        token.profile = profile;
      }
      // console.log("profile", profile)
      return Promise.resolve(token);
    },

    session: async (session, user) => {
      if (user.profile.hasOwnProperty("token")) {
        session.token = user.profile.token;
      }
      return Promise.resolve(session);
    },
  },

  // A database is optional, but required to persist accounts in a database
};

async function getUserGuilds(token) {
  const bearer = `Bearer ${token}`;
  const guild = await fetch("https://discordapp.com/api/users/@me/guilds", {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  });

  return guild.json();
}

export default (req, res) => NextAuth(req, res, options);
