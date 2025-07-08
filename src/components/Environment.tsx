import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { DirectionalLight } from 'three'

export function Environment() {
  const lightRef = useRef<DirectionalLight>(null)
  
  // Subtle light animation for atmosphere
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })
  
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.3} color="#404040" />
      
      {/* Main directional light */}
      <directionalLight
        ref={lightRef}
        position={[10, 10, 10]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Atmospheric fog */}
      <fog attach="fog" args={['#1a1a1a', 5, 25]} />
      
      {/* Subtle point lights for atmosphere */}
      <pointLight
        position={[0, 8, 0]}
        intensity={0.2}
        color="#4a90e2"
        distance={15}
      />
      
      <pointLight
        position={[-10, 5, -10]}
        intensity={0.1}
        color="#8a4fe2"
        distance={12}
      />
      
      <pointLight
        position={[10, 5, 10]}
        intensity={0.1}
        color="#e24f8a"
        distance={12}
      />
    </>
  )
}