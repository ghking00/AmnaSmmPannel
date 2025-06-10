import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/user?id=${id}`)
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, [id]);

  if (!session || session.user.email !== 'cdark283@gmail.com') return <p>Unauthorized</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-2">👤 User Details</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Balance:</strong> PKR {user.balance}</p>
      <p><strong>ID:</strong> {user.id}</p>
    </div>
  );
}
