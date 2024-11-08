'use client'

import { useState } from 'react'
import { useAuth } from '../components/AuthContext'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { useRouter } from 'next/navigation'

export default function UploadNovel() {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [story, setStory] = useState('')
  const [coverpage, setCoverpage] = useState('')
  const [error, setError] = useState('')

  const genres = ['Fantasy', 'Horror', 'Mystery', 'Adventure', 'Romance', 'Sci-Fi']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setError('Please login to upload a novel')
      return
    }

    try {
      const db = getFirestore(app)
      const docRef = await addDoc(collection(db, 'Novels'), {
        title,
        author: user.uid,
        genre,
        Story: story,
        NovelCoverpage: coverpage || null
      })
      router.push(`/novel/${docRef.id}`)
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Please login to upload novels</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upload New Novel</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <select
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Story Description</label>
            <textarea
              required
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cover Image URL (Optional)</label>
            <input
              type="url"
              value={coverpage}
              onChange={(e) => setCoverpage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload Novel
          </button>
        </div>
      </form>
    </div>
  )
}