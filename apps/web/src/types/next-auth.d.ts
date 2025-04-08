import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: User;
    sub: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: string;
    sub: string;
    accessToken: string;
    refreshToken: string;
    iat: number;
    exp: number;
    jti: string;
    refresh: boolean;
  }
}
