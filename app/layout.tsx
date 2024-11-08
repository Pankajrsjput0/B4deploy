import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { AuthProvider } from './components/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WebNovel',
  description: 'Read and upload novels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}