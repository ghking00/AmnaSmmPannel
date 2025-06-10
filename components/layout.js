import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-[#111] text-white p-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">Amna Rajpoot SMM Panel</h1>
        </Link>
        <nav className="space-x-4 text-sm">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/order">Buy Services</Link>
          <Link href="/logout">Logout</Link>
        </nav>
      </header>

      <main className="flex-1 p-4 max-w-3xl mx-auto">{children}</main>

      <footer className="bg-gray-900 text-white text-center py-2 text-sm">
        © 2025 Amna Rajpoot Panel. All rights reserved.
      </footer>
    </div>
  );
}
