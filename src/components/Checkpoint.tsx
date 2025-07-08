import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { useGame } from '../contexts/GameContext'

interface CheckpointProps {
  position: [number, number, number]
  id: number
}

export function Checkpoint({ position, id }: CheckpointProps) {
  const meshRef = useRef<Mesh>(null)
  const { state, dispatch } = useGame()
  
  const isReached = state.checkpoints.includes(id)
  
  // Pulsing animation
  useFrame((frameState) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.scale.setScalar(1 + Math.sin(frameState.clock.elapsedTime * 3) * 0.1)
      
      // Check if player is close to checkpoint
      if (!isReached) {
        const playerPos = new Vector3(...state.position)
        const checkpointPos = new Vector3(...position)
        const distance = playerPos.distanceTo(checkpointPos)
        
        if (distance < 1.2 && state.isPlaying) {
          dispatch({ type: 'REACH_CHECKPOINT', payload: id })
        }
      }
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.3]} />
      <meshStandardMaterial 
        color={isReached ? "#00ff00" : "#0088ff"}
        emissive={isReached ? "#00ff00" : "#0088ff"}
        emissiveIntensity={0.2}
        roughness={0.2}
        metalness={0.7}
      />
      {/* Light effect */}
      <pointLight
        position={[0, 0.5, 0]}
        color={isReached ? "#00ff00" : "#0088ff"}
        intensity={0.3}
        distance={2}
      />
    </mesh>
  )
}