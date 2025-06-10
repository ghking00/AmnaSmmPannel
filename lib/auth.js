import { getSession } from 'next-auth/react';

export async function checkUserAuth(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  return { props: { session } };
}

export async function checkAdminAuth(context) {
  const session = await getSession(context);

  const isAdmin = session?.user?.email === 'cdark283@gmail.com' || session?.user?.role === 'admin';

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return { props: { session } };
}