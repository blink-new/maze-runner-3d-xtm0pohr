import { useBox } from '@react-three/cannon'
import { useGame } from '../contexts/GameContext'

export function Trap({ position, size }) {
  const { dispatch } = useGame()
  const [ref] = useBox(() => ({
    isTrigger: true,
    type: 'Static',
    position,
    args: size,
    onCollide: (e) => {
      if (e.body.name === 'player') {
        dispatch({ type: 'PLAYER_DIED' })
      }
    },
  }))

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}