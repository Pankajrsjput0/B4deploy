'use client'

import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [genres, setGenres] = useState<string[]>([])
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGenreChange = (genre: string) => {
    setGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre)
      }
      if (prev.length < 3) {
        return [...prev, genre]
      }
      return prev
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (genres.length !== 3) {
      setError('Please select exactly 3 genres')
      return
    }
    try {
      const auth = getAuth(app)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      const db = getFirestore(app)
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        age: parseInt(age),
        interestedGenre: genres
      })
      router.push('/')
    } catch (error: any) {
      setError(error.message)
    }
  }

  const availableGenres = ['Fantasy', 'Horror', 'Mystery', 'Adventure', 'Romance', 'Sci-Fi']

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="number"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select 3 favorite genres:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableGenres.map((genre) => (
                <label key={genre} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">{genre}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}