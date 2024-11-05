import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticated } from '@/utils/amplifyServerUtils';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const response = NextResponse.next();

  if (url.pathname === '/') {
    return response;
  }

  const authenticated = await getAuthenticated({
    request,
    response,
  });

  if (authenticated) {
    return response;
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|todos).*)',
  ],
};