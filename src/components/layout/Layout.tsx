import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <article className="flex-grow">{children}</article>
          <Sidebar className="w-80" />
        </div>
      </main>
      <Footer />
    </div>
  );
} 