'use client'

import { useState } from 'react'
import { useAuth } from '../../components/AuthContext'
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore'
import { app } from '../../../firebaseConfig'
import { useRouter } from 'next/navigation'

export default function UploadChapter({ params }: { params: { novelId: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [chapterTitle, setChapterTitle] = useState('')
  const [chapterNumber, setChapterNumber] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setError('Please login to upload a chapter')
      return
    }

    try {
      const db = getFirestore(app)
      const novelRef = doc(db, 'Novels', params.novelId)
      await addDoc(collection(novelRef, 'Chapters'), {
        chapterTitle,
        chapterNumber: parseInt(chapterNumber),
        Content: content,
        uploadDate: new Date().toISOString()
      })
      router.push(`/novel/${params.novelId}`)
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Please login to upload chapters</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upload New Chapter</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Chapter Title</label>
            <input
              type="text"
              required
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Chapter Number</label>
            <input
              type="number"
              required
              value={chapterNumber}
              onChange={(e) => setChapterNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload Chapter
          </button>
        </div>
      </form>
    </div>
  )
}