import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, NextRequest } from 'next/server';
import { Buffer } from 'buffer/';

global.Buffer = Buffer as unknown as BufferConstructor;

const unauthenticated = (req: NextRequest) => {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
};

const unverified = (req: NextRequest) => {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/confirmemail';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Unauthenticated
  if (!session || !session.user) {
    return unauthenticated(req);
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return unauthenticated(req);
  }

  const isConfirmed = !!user?.email_confirmed_at;
  const wasVerified = !!user?.confirmation_sent_at;
  const isVerified = isConfirmed && wasVerified;

  // Unauthenticated
  if (!user) {
    return unauthenticated(req);
  }

  // Unconfirmed email
  if (!isVerified) {
    return unverified(req);
  }

  return res;
}

export const config = {
  matcher: '/app/:path*',
};
