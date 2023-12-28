import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const redirectURL = new URL('/', request.url)

  const token = request.cookies.get('refreshToken')?.value

  if (!token) {
    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; httpOnly; max-age=20`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
