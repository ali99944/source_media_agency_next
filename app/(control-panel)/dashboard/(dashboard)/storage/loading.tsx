import { CardLoader } from "@/src/components/shared/loaders";

export default function Loading() {
  return (
    <div className="container mx-auto p-4 rtl">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex space-x-2 space-x-reverse">
            <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse mr-2"></div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <CardLoader key={i} className="h-40" />
            ))}
          </div>
        </div>

        <div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <CardLoader key={i} className="h-40" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

