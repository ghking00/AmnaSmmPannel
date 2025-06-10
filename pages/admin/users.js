import { getSession } from "next-auth/react";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await dbConnect();
  const users = await User.find({}).lean();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}

export default function UsersPage({ users }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Balance</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.balance} PKR</td>
              <td className="py-2 px-4 border-b">{user.role || "user"}</td>
              <td className="py-2 px-4 border-b">
                {new Date(user.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
