import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { z } from "zod";
import { authService, LoginResponse } from "./api/services/auth";
import { fetchApi } from "./api";
import { AxiosHeaders } from "axios";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import { isAfter } from "date-fns";

interface GetProfileReponse {
  email: string;
  name: string;
  sid: string;
  uid: string;
}

interface AccessTokenPayload {
  uid: {
    user_id: string;
    name: string;
    email: string;
  };
  sid: string;
  iat: number;
  exp: number;
}

async function GetProfile(token: JWT) {
  const headers = new AxiosHeaders();
  headers.set("Authorization", `Bearer ${token.accessToken}`);
  return fetchApi<GetProfileReponse>("/api/auth/profile", { headers });
}

async function RefreshSession(token: JWT) {
  const headers = new AxiosHeaders();
  headers.set("Authorization", `Bearer ${token.accessToken}`);
  return fetchApi<LoginResponse>("/api/auth/refresh-token ", { headers });
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        try {
          const loginResponse = await authService.login(parsedCredentials.data);

          return {
            id: loginResponse.userId,
            name: loginResponse.name,
            email: loginResponse.email,
            accessToken: loginResponse.accessToken,
            refreshToken: loginResponse.accessToken,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt(params) {
      if (params.user) {
        const { accessToken, refreshToken } = params.user;
        const { sid } = jwtDecode<AccessTokenPayload>(accessToken);
        params.token.accessToken = accessToken;
        params.token.refreshToken = refreshToken;
        params.token.sub = sid;
      }

      if (params.token.accessToken) {
        try {
          const { accessToken } = params.token;
          const { iat, sid } = jwtDecode<AccessTokenPayload>(accessToken);

          const now = new Date();
          const expiresAt = new Date(iat * 1000);
          expiresAt.setHours(expiresAt.getHours() + 1);

          if (isAfter(now, expiresAt)) {
            console.log("Access Token expired");
            const newSession = await RefreshSession(params.token);
            params.token.accessToken = newSession.accessToken;
            params.token.refreshToken = newSession.accessToken;
            params.token.sub = sid;
            params.token.refresh = true;

            const { iat: newIat } = jwtDecode<AccessTokenPayload>(accessToken);
            console.log(new Date(newIat).toLocaleString("pt-br"));
          } else {
            params.token.refresh = false;
          }
        } catch (error: any) {
          throw new Error("Invalid JWT refresh");
        }
      }

      if (params.trigger) {
        params.token.refresh = ["signIn"].includes(params.trigger);
      } else {
        params.token.refresh = false;
      }

      return params.token;
    },
    async session(params) {
      try {
        if (params.session && !params.token.refresh) {
          params.session.user.accessToken = params.token.accessToken;
          params.session.user.refreshToken = params.token.refreshToken;
          params.session.sub = params.token.sub;
          return params.session;
        }

        const profile = await GetProfile(params.token);
        console.log("Profile Updated!");

        if (!profile) throw new Error("Not Authorized");

        params.session.user = {
          id: profile.uid,
          email: profile.email,
          name: profile.name,
          accessToken: params.token.accessToken,
          refreshToken: params.token.refreshToken,
          image: "user-default.png",
        };
        params.session.sub = profile.sid;
      } catch (error: any) {
        console.log(error.message);
        throw new Error("Not Authorized");
      }

      return params.session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
    updateAge: 5 * 60,
  },
};
