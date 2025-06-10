import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function UserList() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status === 'authenticated' && session.user.email !== 'cdark283@gmail.com') {
      router.push('/');
    }
    if (status === 'authenticated') {
      fetch('/api/users')
        .then(res => res.json())
        .then(data => setUsers(data.users || []));
    }
  }, [status]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Please login first.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">👥 All Users</h1>
      <ul className="bg-white rounded shadow divide-y">
        {users.map(user => (
          <li key={user.id} className="p-4">
            <p><strong>{user.email}</strong></p>
            <p>Balance: PKR {user.balance}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}