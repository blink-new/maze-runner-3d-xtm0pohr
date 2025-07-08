import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { useGame } from '../contexts/GameContext'

interface GoalProps {
  position: [number, number, number]
}

export function Goal({ position }: GoalProps) {
  const meshRef = useRef<Mesh>(null)
  const { state, dispatch } = useGame()
  
  // Glowing animation
  useFrame((frameState) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(frameState.clock.elapsedTime * 2) * 0.1
      
      // Check if player is close to goal
      const playerPos = new Vector3(...state.position)
      const goalPos = new Vector3(...position)
      const distance = playerPos.distanceTo(goalPos)
      
      if (distance < 1.5 && state.isPlaying) {
        dispatch({ type: 'COMPLETE_MAZE' })
      }
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.5, 0.5, 0.1, 8]} />
      <meshStandardMaterial 
        color="#ffd700"
        emissive="#ffd700"
        emissiveIntensity={0.3}
        roughness={0.1}
        metalness={0.8}
      />
      {/* Glow effect */}
      <pointLight
        position={[0, 0.5, 0]}
        color="#ffd700"
        intensity={0.5}
        distance={3}
      />
    </mesh>
  )
}