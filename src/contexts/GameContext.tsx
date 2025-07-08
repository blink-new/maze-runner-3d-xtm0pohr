import { createContext, useContext, useReducer, ReactNode } from 'react'

interface GameState {
  isPlaying: boolean
  isPaused: boolean
  isDead: boolean
  startTime: number | null
  elapsedTime: number
  checkpoints: number[]
  currentCheckpoint: number
  position: [number, number, number]
  isComplete: boolean
  bestTime: number | null
}

type GameAction = 
  | { type: 'START_GAME' }
  | { type: 'STOP_GAME' }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'REACH_CHECKPOINT'; payload: number }
  | { type: 'UPDATE_POSITION'; payload: [number, number, number] }
  | { type: 'COMPLETE_MAZE' }
  | { type: 'RESET_GAME' }
  | { type: 'PLAYER_DIED' }

const initialState: GameState = {
  isPlaying: false,
  isPaused: false,
  isDead: false,
  startTime: null,
  elapsedTime: 0,
  checkpoints: [],
  currentCheckpoint: 0,
  position: [0, 0, 0],
  isComplete: false,
  bestTime: null
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isPlaying: true,
        startTime: Date.now(),
        isDead: false,
        isPaused: false
      }
    case 'STOP_GAME':
      return {
        ...state,
        isPlaying: false,
        isPaused: false
      }
    case 'UPDATE_TIME':
      return {
        ...state,
        elapsedTime: action.payload
      }
    case 'REACH_CHECKPOINT':
      return {
        ...state,
        checkpoints: [...state.checkpoints, action.payload],
        currentCheckpoint: action.payload
      }
    case 'UPDATE_POSITION':
      return {
        ...state,
        position: action.payload
      }
    case 'COMPLETE_MAZE': {
      const newBestTime = state.bestTime ? Math.min(state.bestTime, state.elapsedTime) : state.elapsedTime
      return {
        ...state,
        isComplete: true,
        isPlaying: false,
        bestTime: newBestTime
      }
    }
    case 'RESET_GAME':
      return {
        ...initialState,
        bestTime: state.bestTime
      }
    case 'PLAYER_DIED':
      return {
        ...state,
        isPlaying: false,
        isDead: true
      }
    default:
      return state
  }
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}