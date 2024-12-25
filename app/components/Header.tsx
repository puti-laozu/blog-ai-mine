import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            My Blog
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-blue-600">
              首页
            </Link>
            <Link href="/archive" className="hover:text-blue-600">
              归档
            </Link>
            <Link href="/tags" className="hover:text-blue-600">
              标签
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 