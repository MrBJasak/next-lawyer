import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (error) {
    console.error('Middleware error:', error);
    // Fallback to just continuing the request if session update fails
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Only run middleware on admin routes that require authentication
    '/admin/dashboard/:path*',
    '/admin/signin',
    // Skip middleware for static files, API routes, etc.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
