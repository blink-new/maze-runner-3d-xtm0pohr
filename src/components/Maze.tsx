import { useMemo } from 'react'
import { usePlane } from '@react-three/cannon'
import { Wall } from './Wall'
import { Goal } from './Goal'
import { Checkpoint } from './Checkpoint'
import { Trap } from './Trap'

const mazeLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

export function Maze() {
  const mazeElements = useMemo(() => {
    const elements: JSX.Element[] = []
    const wallSize = 2
    
    mazeLayout.forEach((row, z) => {
      row.forEach((cell, x) => {
        const posX = (x - row.length / 2) * wallSize
        const posZ = (z - mazeLayout.length / 2) * wallSize
        
        switch (cell) {
          case 1: // Wall
            elements.push(
              <Wall 
                key={`wall-${x}-${z}`}
                position={[posX, 1, posZ]}
                size={[wallSize, 2, wallSize]}
              />
            )
            break
          case 2: // Checkpoint
            elements.push(
              <Checkpoint 
                key={`checkpoint-${x}-${z}`}
                position={[posX, 1, posZ]}
                id={1}
              />
            )
            break
          case 3: // Goal
            elements.push(
              <Goal 
                key={`goal-${x}-${z}`}
                position={[posX, 1, posZ]}
              />
            )
            break
          default: // Path
            if (Math.random() < 0.1) { // 10% chance to place a trap on a path
              elements.push(
                <Trap 
                  key={`trap-${x}-${z}`}
                  position={[posX, 0.1, posZ]}
                  size={[wallSize * 0.8, 0.2, wallSize * 0.8]}
                />
              )
            }
            break
        }
      })
    })
    
    return elements
  }, [])
  
  return (
    <group>
      {mazeElements}
      <Floor />
    </group>
  )
}

function Floor() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshLambertMaterial color="#2c2c2c" />
    </mesh>
  )
}
