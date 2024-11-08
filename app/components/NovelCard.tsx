import Image from 'next/image'
import Link from 'next/link'

interface NovelCardProps {
  id: string
  title: string
  author: string
  coverImage?: string
  story: string
}

export default function NovelCard({ id, title, author, coverImage, story }: NovelCardProps) {
  return (
    <Link href={`/novel/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="font-bold">{title}</h3>
              <p>{author}</p>
            </div>
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{story}</p>
        </div>
      </div>
    </Link>
  )
}