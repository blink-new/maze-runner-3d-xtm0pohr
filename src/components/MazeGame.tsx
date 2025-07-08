import { useRef } from 'react'
import { PointerLockControls, OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Maze } from './Maze'
import { Player } from './Player'
import { Environment } from './Environment'
import { useGame } from '../contexts/GameContext'

export function MazeGame() {
  const { state, dispatch } = useGame()
  const orbitControlsRef = useRef<OrbitControlsImpl | null>(null)

  const pointerLockAllowed = (() => {
    if (window.self !== window.top) return false
    return typeof document.body.requestPointerLock === 'function'
  })()

  return (
    <>
      {pointerLockAllowed ? (
        <PointerLockControls
          onLock={() => !state.isPlaying && dispatch({ type: 'START_GAME' })}
          onUnlock={() => state.isPlaying && dispatch({ type: 'STOP_GAME' })}
        />
      ) : (
        <OrbitControls ref={orbitControlsRef} enablePan={false} enableZoom={false} />
      )}
      <Environment />
      <Maze />
      <Player />
    </>
  )
}
