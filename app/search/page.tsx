'use client'

import { useState } from 'react'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Link from 'next/link'
import Image from 'next/image'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])

      const handleSearch = async (e) => {
          e.preventDefault()
              const db = getFirestore(app)
                  const novelsRef = collection(db, 'Novels')
                      const q = query(novelsRef, where('title', '>=', searchTerm), where('title', '<=', searchTerm + '\uf8ff'))
                          const querySnapshot = await getDocs(q)
                              const searchResults = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                                  setResults(searchResults)
                                    }

                                      return (
                                          <div className="container mx-auto px-4 py-8">
                                                <h1 className="text-3xl font-bold mb-4">Search Novels</h1>
                                                      <form onSubmit={handleSearch} className="mb-8">
                                                              <input
                                                                        type="text"
                                                                                  value={searchTerm}
                                                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                                                                      placeholder="Search for novels..."
                                                                                                                className="w-full p-2 border border-gray-300 rounded"
                                                                                                                        />
                                                                                                                                <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Search</button>
                                                                                                                                      </form>
                                                                                                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                                                                                                    {results.map(novel => (
                                                                                                                                                              <Link href={`/novel/${novel.id}`} key={novel.id} className="border p-4 rounded">
                                                                                                                                                                          {novel.NovelCoverpage ? (
                                                                                                                                                                                        <Image src={novel.NovelCoverpage} alt={novel.title} width={200} height={300} className="mb-2" />
                                                                                                                                                                                                    ) : (
                                                                                                                                                                                                                  <div className="w-[200px] h-[300px] bg-gray-200 flex items-center justify-center mb-2">
                                                                                                                                                                                                                                  <div className="text-center">
                                                                                                                                                                                                                                                    <h3 className="font-bold">{novel.title}</h3>
                                                                                                                                                                                                                                                                      <p>{novel.author}</p>
                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                            <h3 className="font-bold">{novel.title}</h3>
                                                                                                                                                                                                                                                                                                                                        <p>By {novel.author}</p>
                                                                                                                                                                                                                                                                                                                                                  </Link>
                                                                                                                                                                                                                                                                                                                                                          ))}
                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                      )
                                                                                                                                                                                                                                                                                                                                                                      }