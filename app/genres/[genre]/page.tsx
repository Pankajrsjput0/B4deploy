'use client'

import { useState, useEffect } from 'react'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { app } from '../../../firebaseConfig'
import Link from 'next/link'
import Image from 'next/image'

export default function GenrePage({ params }: { params: { genre: string } }) {
  const [novels, setNovels] = useState<any[]>([])

  useEffect(() => {
    const fetchNovels = async () => {
      const db = getFirestore(app)
      const q = query(
        collection(db, 'Novels'),
        where('genre', '==', params.genre.charAt(0).toUpperCase() + params.genre.slice(1))
      )
      const querySnapshot = await getDocs(q)
      const novelsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNovels(novelsData)
    }

    fetchNovels()
  }, [params.genre])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{params.genre} Novels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {novels.map((novel) => (
          <Link href={`/novel/${novel.id}`} key={novel.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {novel.NovelCoverpage ? (
                <Image
                  src={novel.NovelCoverpage}
                  alt={novel.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="font-bold">{novel.title}</h3>
                    <p>{novel.author}</p>
                  </div>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{novel.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{novel.Story}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}