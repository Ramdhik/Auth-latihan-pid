import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (session === undefined) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    const parsed = await decrypt(session);
    if (!parsed.user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: '/cekOngkir',
};
