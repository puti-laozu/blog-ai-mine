export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Cloudflare Pages
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
} 