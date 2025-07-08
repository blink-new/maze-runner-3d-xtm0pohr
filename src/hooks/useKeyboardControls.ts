import { useEffect, useState } from 'react'

interface KeyboardState {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
}

export function useKeyboardControls() {
  const [keys, setKeys] = useState<KeyboardState>({
    forward: false,
    backward: false,
    left: false,
    right: false
  })
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          setKeys(prev => ({ ...prev, forward: true }))
          break
        case 'KeyS':
        case 'ArrowDown':
          setKeys(prev => ({ ...prev, backward: true }))
          break
        case 'KeyA':
        case 'ArrowLeft':
          setKeys(prev => ({ ...prev, left: true }))
          break
        case 'KeyD':
        case 'ArrowRight':
          setKeys(prev => ({ ...prev, right: true }))
          break
      }
    }
    
    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          setKeys(prev => ({ ...prev, forward: false }))
          break
        case 'KeyS':
        case 'ArrowDown':
          setKeys(prev => ({ ...prev, backward: false }))
          break
        case 'KeyA':
        case 'ArrowLeft':
          setKeys(prev => ({ ...prev, left: false }))
          break
        case 'KeyD':
        case 'ArrowRight':
          setKeys(prev => ({ ...prev, right: false }))
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  
  return keys
}