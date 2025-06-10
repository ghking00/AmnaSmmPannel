import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">🎉 Welcome to Amna Rajpoot SmmPannel</h1>
      <p className="mb-6 text-center text-gray-700">
        Buy social media services with fast delivery and trusted payments.
      </p>
      <div className="space-x-4">
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
        <Link href="/signup" className="px-4 py-2 bg-green-600 text-white rounded">Signup</Link>
      </div>
    </div>
  );
}