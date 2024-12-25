import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            My Blog
          </Link>
          <div className="flex gap-6">
            <Link href="/posts" className="hover:text-blue-600">
              文章
            </Link>
            <Link href="/archive" className="hover:text-blue-600">
              归档
            </Link>
            <Link href="/categories" className="hover:text-blue-600">
              分类
            </Link>
            <Link href="/tags" className="hover:text-blue-600">
              标签
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="search"
              placeholder="搜索文章..."
              className="px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </nav>
    </header>
  );
} 