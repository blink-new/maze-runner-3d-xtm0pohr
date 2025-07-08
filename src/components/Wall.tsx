import { useBox } from '@react-three/cannon'

export function Wall({ position, size }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: size,
  }))

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#4a4a4a" roughness={0.8} metalness={0.2} />
    </mesh>
  )
}
