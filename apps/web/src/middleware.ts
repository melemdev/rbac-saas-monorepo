import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - auth (authentication pages)
     * - public routes (explicitly defined public routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|auth|$|about|welcome).*)",
  ],
};
