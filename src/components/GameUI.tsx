import { useGame } from '../contexts/GameContext'
import { Button } from './ui/button'
import { Card } from './ui/card'

export function GameUI() {
  const { state, dispatch } = useGame()
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <>
      {/* Game HUD */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Timer */}
        <div className="absolute top-4 left-4 pointer-events-auto">
          <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
            <div className="p-3">
              <div className="text-white text-xl font-mono">
                {formatTime(state.elapsedTime)}
              </div>
              {state.bestTime && (
                <div className="text-yellow-400 text-sm font-mono">
                  Best: {formatTime(state.bestTime)}
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Checkpoint indicator */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
            <div className="p-3">
              <div className="text-white text-sm">
                Checkpoints: {state.checkpoints.length}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Controls hint */}
        {!state.isPlaying && !state.isComplete && (
          <div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto cursor-pointer"
            onClick={() => dispatch({ type: 'START_GAME' })}
          >
            <Card className="bg-black/60 backdrop-blur-sm border-gray-600 hover:bg-black/80 hover:border-yellow-500 transition-colors">
              <div className="p-4 text-center">
                <div className="text-white text-lg font-semibold mb-2">
                  Maze Runner 3D
                </div>
                <div className="text-gray-300 text-sm mb-3">
                  Click to start • Use WASD or arrow keys to move
                </div>
                <div className="text-gray-400 text-xs">
                  Navigate through the maze and reach the golden goal
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {/* Completion screen */}
        {state.isComplete && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
            <Card className="bg-black/80 backdrop-blur-sm border-yellow-500">
              <div className="p-6 text-center">
                <div className="text-yellow-400 text-3xl font-bold mb-4">
                  🎉 Maze Completed!
                </div>
                <div className="text-white text-xl mb-2">
                  Time: {formatTime(state.elapsedTime)}
                </div>
                <div className="text-blue-400 text-lg mb-4">
                  Checkpoints: {state.checkpoints.length}
                </div>
                {state.bestTime && (
                  <div className="text-yellow-400 text-lg mb-4">
                    Best Time: {formatTime(state.bestTime)}
                  </div>
                )}
                <Button 
                  onClick={() => dispatch({ type: 'RESET_GAME' })}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Play Again
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
      
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-4 h-4 border border-white/50 rounded-full bg-white/10 backdrop-blur-sm"></div>
      </div>
    </>
  )
}