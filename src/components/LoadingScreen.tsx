import { useState, useEffect } from 'react'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (!isLoading) return null
  
  return (
    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white text-2xl font-bold mb-2">
          Maze Runner 3D
        </div>
        <div className="text-gray-400 text-sm">
          Loading immersive experience...
        </div>
      </div>
    </div>
  )
}