import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  try {
    // Skip auth check for static assets and API routes
    const path = request.nextUrl.pathname;
    if (
      path.includes('/_next') ||
      path.includes('/api/') ||
      path.endsWith('.ico') ||
      path.endsWith('.png') ||
      path.endsWith('.jpg') ||
      path.endsWith('.svg')
    ) {
      return response;
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value }) => response.cookies.set(name, value));
          },
        },
      },
    );

    await supabase.auth.getUser();
    return response;
  } catch (error) {
    console.error('Error in middleware:', error);
    // Return the response even if authentication fails
    // This prevents the application from crashing
    return response;
  }
}
