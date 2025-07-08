import { useRef, useEffect } from 'react'
import { useSphere } from '@react-three/cannon'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useKeyboardControls } from '../hooks/useKeyboardControls'

const PLAYER_SPEED = 5

export function Player() {
  const { camera } = useThree()
  const keys = useKeyboardControls()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 10],
    name: 'player', // Add name to the physics body
  }))

  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity])

  useFrame(() => {
    camera.position.copy(ref.current.position)

    const direction = new Vector3()
    const frontVector = new Vector3(0, 0, (keys.backward ? 1 : 0) - (keys.forward ? 1 : 0))
    const sideVector = new Vector3((keys.left ? 1 : 0) - (keys.right ? 1 : 0), 0, 0)

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(PLAYER_SPEED).applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)
  })

  return <mesh ref={ref} />
}