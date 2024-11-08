'use client'

import { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { app } from '../../../../firebaseConfig'
import Link from 'next/link'

export default function ChapterPage({
  params,
}: {
  params: { novelId: string; chapterId: string }
}) {
  const [chapter, setChapter] = useState<any>(null)
  const [novel, setNovel] = useState<any>(null)

  useEffect(() => {
    const fetchChapter = async () => {
      const db = getFirestore(app)
      const novelDoc = await getDoc(doc(db, 'Novels', params.novelId))
      const chapterDoc = await getDoc(
        doc(db, 'Novels', params.novelId, 'Chapters', params.chapterId)
      )

      if (novelDoc.exists() && chapterDoc.exists()) {
        setNovel({ id: novelDoc.id, ...novelDoc.data() })
        setChapter({ id: chapterDoc.id, ...chapterDoc.data() })
      }
    }

    fetchChapter()
  }, [params.novelId, params.chapterId])

  if (!chapter || !novel) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/novel/${params.novelId}`}
          className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
        >
          ← Back to Novel
        </Link>
        <h1 className="text-3xl font-bold mb-2">{novel.title}</h1>
        <h2 className="text-xl font-semibold mb-6">
          Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
        </h2>
        <div className="prose max-w-none">
          {chapter.Content.split('\n').map((paragraph: string, index: number) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}