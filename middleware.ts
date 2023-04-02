import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log('MIDDLEWARE');

  // Unauthenticated
  if (!session || !session.user) {
    return res;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log(user);

  if (error) {
    console.error(error);
    return res;
  }

  // Unauthenticated
  if (!user) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Unconfirmed email
  if (!user.email_confirmed_at) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/confirmemail';
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: '/app/:path*',
};
