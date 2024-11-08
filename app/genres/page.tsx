import Link from 'next/link'
import Image from 'next/image'

const genres = [
  { name: 'Fantasy', image: 'https://images.app.goo.gl/YaFgac1tbx48vpVe9' },
    { name: 'Horror', image: 'https://images.app.goo.gl/PNFkqMVYA28Sj3QQ7' },
      { name: 'Mystery', image: 'https://images.app.goo.gl/8RXi5jjRg1gXpxKFA' },
        { name: 'Adventure', image: 'https://images.app.goo.gl/sbo4Ar2WsEEwAaGb6' },
          { name: 'Romance', image: 'https://images.app.goo.gl/gRk3ocrzm7ozQeaL7' },
            { name: 'Sci-Fi', image: 'https://images.app.goo.gl/SQVMpLYhniWDkNNF9' },
            ]

            export default function Genres() {
              return (
                  <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-4">Genres</h1>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                      {genres.map((genre) => (
                                                <Link href={`/genres/${genre.name.toLowerCase()}`} key={genre.name} className="relative h-48">
                                                            <Image
                                                                          src={genre.image}
                                                                                        alt={genre.name}
                                                                                                      layout="fill"
                                                                                                                    objectFit="cover"
                                                                                                                                  className="rounded-lg"
                                                                                                                                              />
                                                                                                                                                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                                                                                                                                        <h3 className="text-white text-xl font-bold">{genre.name}</h3>
                                                                                                                                                                                    </div>
                                                                                                                                                                                              </Link>
                                                                                                                                                                                                      ))}
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                  )
                                                                                                                                                                                                                  }