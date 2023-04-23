import { AUTH_TYPE } from '@/types'

export interface IAuthState {
  chosenMethod: AUTH_TYPE
}

export function useAuth () {
  const state = useState<IAuthState>('auth-state', () => ({
    chosenMethod: AUTH_TYPE.Login,
  }))

  return {
    state,
  }
}
