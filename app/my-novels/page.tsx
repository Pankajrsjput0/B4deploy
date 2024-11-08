'use client'

import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Link from 'next/link'
import Image from 'next/image'

export default function MyNovels() {
  const [user, setUser] = useState(null)
    const [novels, setNovels] = useState([])

      useEffect(() => {
          const auth = getAuth(app)
              const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                            setUser(user)
                                    const db = getFirestore(app)
                                            const novelsRef = collection(db, 'Novels')
                                                    const q = query(novelsRef, where('author', '==', user.uid))
                                                            const querySnapshot = await getDocs(q)
                                                                    const userNovels = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                                                                            setNovels(userNovels)
                                                                                  } else {
                                                                                          setUser(null)
                                                                                                  setNovels([])
                                                                                                        }
                                                                                                            })

                                                                                                                return () => unsubscribe()
                                                                                                                  }, [])

                                                                                                                    if (!user) {
                                                                                                                        return <div className="container mx-auto px-4 py-8">Please log in to view your novels.</div>
                                                                                                                          }

                                                                                                                            return (
                                                                                                                                <div className="container mx-auto px-4 py-8">
                                                                                                                                      <h1 className="text-3xl font-bold mb-4">My Novels</h1>
                                                                                                                                            {novels.length === 0 ? (
                                                                                                                                                    <p>You haven't uploaded any novels yet.</p>
                                                                                                                                                          ) : (
                                                                                                                                                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                                                                                                                            {novels.map(novel => (
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
                                                                                                                                                                                                                                                                                                                                                                                          <p>Genre: {novel.genre}</p>
                                                                                                                                                                                                                                                                                                                                                                                                      </Link>
                                                                                                                                                                                                                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                                                                                                                                                                                                                    }