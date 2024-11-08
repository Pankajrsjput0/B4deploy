'use client'

import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { app } from '../../firebaseConfig'

export default function Profile() {
  const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)

      useEffect(() => {
          const auth = getAuth(app)
              const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                            setUser(user)
                                    const db = getFirestore(app)
                                            const userDoc = await getDoc(doc(db, 'users', user.uid))
                                                    if (userDoc.exists()) {
                                                              setProfile(userDoc.data())
                                                                      }
                                                                            } else {
                                                                                    setUser(null)
                                                                                            setProfile(null)
                                                                                                  }
                                                                                                      })

                                                                                                          return () => unsubscribe()
                                                                                                            }, [])

                                                                                                              if (!user) {
                                                                                                                  return <div className="container mx-auto px-4 py-8">Please log in to view your profile.</div>
                                                                                                                    }

                                                                                                                      return (
                                                                                                                          <div className="container mx-auto px-4 py-8">
                                                                                                                                <h1 className="text-3xl font-bold mb-4">Profile</h1>
                                                                                                                                      {profile ? (
                                                                                                                                              <div>
                                                                                                                                                        <p><strong>Username:</strong> {profile.username}</p>
                                                                                                                                                                  <p><strong>Email:</strong> {user.email}</p>
                                                                                                                                                                            <p><strong>Age:</strong> {profile.age}</p>
                                                                                                                                                                                      <p><strong>Interested Genres:</strong> {profile.interestedGenre.join(', ')}</p>
                                                                                                                                                                                              </div>
                                                                                                                                                                                                    ) : (
                                                                                                                                                                                                            <p>Loading profile...</p>
                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                        )
                                                                                                                                                                                                                        }