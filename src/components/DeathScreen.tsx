import { useGame } from '../contexts/GameContext'

export function DeathScreen() {
  const { state, dispatch } = useGame()

  if (!state.isDead) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-center items-center z-10">
      <h1 className="text-6xl font-bold text-red-600">You Died</h1>
      <button 
        className="mt-8 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
        onClick={() => dispatch({ type: 'RESET_GAME' })}
      >
        Restart
      </button>
    </div>
  )
}
