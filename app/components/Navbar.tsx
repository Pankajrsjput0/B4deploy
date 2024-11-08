'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from './AuthContext'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../../firebaseConfig'

export default function Navbar() {
  const { user } = useAuth()

  const handleSignOut = async () => {
    const auth = getAuth(app)
    await signOut(auth)
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://images.app.goo.gl/CP3wSZ5V3VVbC1ZYA"
            alt="WebNovel Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-white text-xl font-bold">WebNovel</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-gray-200 transition-colors">
            Home
          </Link>
          <Link href="/search" className="text-white hover:text-gray-200 transition-colors">
            Search
          </Link>
          <Link href="/genres" className="text-white hover:text-gray-200 transition-colors">
            Genres
          </Link>
          {user ? (
            <>
              <Link href="/my-novels" className="text-white hover:text-gray-200 transition-colors">
                My Novels
              </Link>
              <Link href="/profile" className="text-white hover:text-gray-200 transition-colors">
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}