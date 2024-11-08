'use client'

import { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { app } from '../firebaseConfig'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [carouselImages, setCarouselImages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  const genres = [
    { name: 'Fantasy', image: 'https://images.app.goo.gl/YaFgac1tbx48vpVe9' },
    { name: 'Horror', image: 'https://images.app.goo.gl/PNFkqMVYA28Sj3QQ7' },
    { name: 'Mystery', image: 'https://images.app.goo.gl/8RXi5jjRg1gXpxKFA' },
    { name: 'Adventure', image: 'https://images.app.goo.gl/sbo4Ar2WsEEwAaGb6' },
    { name: 'Romance', image: 'https://images.app.goo.gl/gRk3ocrzm7ozQeaL7' },
    { name: 'Sci-Fi', image: 'https://images.app.goo.gl/SQVMpLYhniWDkNNF9' }
  ]

  useEffect(() => {
    const fetchCarouselImages = async () => {
      const db = getFirestore(app)
      const photoDoc = await getDocs(collection(db, 'Homepagephoto'))
      if (!photoDoc.empty) {
        const images = photoDoc.docs[0].data()
        setCarouselImages([images.P1, images.P2, images.P3, images.P4, images.P5, images.P6])
      }
    }

    fetchCarouselImages()

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 6)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Carousel Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        {genres.map((genre, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={carouselImages[index] || genre.image}
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {genres.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Genres Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Popular Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <Link
              href={`/genres/${genre.name.toLowerCase()}`}
              key={genre.name}
              className="relative h-40 group overflow-hidden rounded-lg"
            >
              <Image
                src={genre.image}
                alt={genre.name}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{genre.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}