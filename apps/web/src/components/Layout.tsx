import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  )
} 