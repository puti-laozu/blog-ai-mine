import Link from 'next/link';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={`space-y-6 ${className}`}>
      <div className="card">
        <h3 className="text-lg font-bold mb-4">分类</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/category/tech" className="hover:text-blue-600">
              技术 (10)
            </Link>
          </li>
          <li>
            <Link href="/category/life" className="hover:text-blue-600">
              生活 (5)
            </Link>
          </li>
        </ul>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-4">标签云</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tag/javascript"
            className="px-2 py-1 bg-gray-100 rounded hover:bg-blue-50 hover:text-blue-600"
          >
            JavaScript
          </Link>
          <Link
            href="/tag/typescript"
            className="px-2 py-1 bg-gray-100 rounded hover:bg-blue-50 hover:text-blue-600"
          >
            TypeScript
          </Link>
        </div>
      </div>
    </aside>
  );
} 