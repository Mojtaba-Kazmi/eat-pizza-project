// app/api/login/route.js
import cookie from 'cookie';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const headers = new Headers();
      headers.append(
        'Set-Cookie',
        cookie.serialize('token', process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
          httpOnly: true, // For security
          secure: process.env.NODE_ENV === 'production', // Secure cookies in production
        })
      );

      return new Response(JSON.stringify('Successful'), {
        status: 200,
        headers,
      });
    } else {
      return new Response(JSON.stringify('Wrong Credentials'), {
        status: 400,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
