// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Get the token from cookies
  const authToken = request.cookies.get("authToken")?.value;
  const KEY = process.env.KEY;

  const isAuthentic = authToken && KEY && authToken === KEY;

  // 2. Logic: If not authenticated and trying to access /private
  if (!isAuthentic && pathname.startsWith('/private')) {
    const loginUrl = new URL('/auth', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Logic: If already authenticated and trying to access login (/)
  if (isAuthentic && pathname === '/auth') {
    const dashboardUrl = new URL('/private', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// 4. Configure which paths this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};