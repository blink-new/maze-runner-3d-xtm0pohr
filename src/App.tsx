import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Physics } from '@react-three/cannon'
import { MazeGame } from './components/MazeGame'
import { GameUI } from './components/GameUI'
import { GameProvider } from './contexts/GameContext'
import { LoadingScreen } from './components/LoadingScreen'
import { DeathScreen } from './components/DeathScreen'

function App() {
  return (
    <GameProvider>
      <div className="h-screen w-full relative overflow-hidden bg-gray-900">
        <Canvas
          shadows
          camera={{ 
            position: [0, 1.7, 10], 
            fov: 75,
            near: 0.1,
            far: 100
          }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.82, 0]}>
              <MazeGame />
            </Physics>
          </Suspense>
        </Canvas>
        <GameUI />
        <LoadingScreen />
        <DeathScreen />
      </div>
    </GameProvider>
  )
}

export default App