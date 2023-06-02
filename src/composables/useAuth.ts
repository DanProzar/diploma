import type { Subscription, User } from '@supabase/supabase-js'
import type { Ref } from 'vue'

import type { IRLoginData, IRegisterData } from '@/types'

const watchStates = [
  'INITIAL_SESSION',
  'SIGNED_IN',
  'PASSWORD_RECOVERY',
  'USER_UPDATED',
]

export class RAuth {
  public readonly user: Ref<User | null> = useState('r-user', () => null)
  public readonly supabase = useSuperbase()

  public readonly registerErrorMessage: Ref<string | false> = ref(false)
  public readonly loginErrorMessage: Ref<string | false> = ref(false)

  public static watcher: Subscription | null = null

  constructor () {
    this.signUp = this.signUp.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.resetPasswordWithEmail = this.resetPasswordWithEmail.bind(this)

    this.updateUserWithNewPassword = this.updateUserWithNewPassword.bind(this)

    if (!RAuth.watcher) {
      RAuth.watcher = this.supabase.auth.onAuthStateChange(
        async (action, session) => {
          if (watchStates.includes(action) && session?.user) {
            this.user.value = session.user
          } else if (action === 'SIGNED_OUT') {
            this.user.value = null
          }
        },
      ).data.subscription
    }
  }

  public async signUp (formData: IRegisterData): Promise<boolean> {
    if (!formData) {
      return false
    }

    this.registerErrorMessage.value = false

    const { error, data: responseData } = await this.supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          surname: formData.surname,
          phone: normalizePhoneNumber(formData.phone),
        },
      },
    })

    if (error) {
      this.registerErrorMessage.value = error.message

      return false
    }

    if (!responseData.user) {
      return false
    }

    const { error: insertError } = await this.supabase
      .from('householders')
      .insert([
        {
          name: formData.name,
          surname: formData.surname,
          phone: normalizePhoneNumber(formData.phone),
          email: formData.email,
          user_id: responseData.user.id,
        },
      ])

    if (insertError) {
      console.error(insertError.message)
      return false
    }

    return true
  }

  public async signIn (formData: IRLoginData): Promise<boolean> {
    if (!formData) {
      return false
    }

    this.loginErrorMessage.value = false

    const { error, data: responseData } = await this.supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      this.loginErrorMessage.value = error.message

      return false
    }

    if (!responseData.user) {
      return false
    }

    return true
  }

  public async resetPasswordWithEmail (email: string) {
    const { data, error } = await this.supabase
      .auth
      .resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/account?redirect=1`,
      })

    if (error) {
      console.error(error.message)
      return false
    }

    if (!data) {
      return false
    }

    return true
  }

  public async updateUserWithNewPassword (password: string) {
    const { data, error } = await this.supabase
      .auth
      .updateUser({ password })

    if (error) {
      console.error(error.message)
      return false
    }

    if (!data) {
      return false
    }

    return true
  }

  public async signOut (): Promise<boolean> {
    const { error } = await this.supabase.auth.signOut()

    if (error) {
      console.error(error.message)
      return false
    }

    return true
  }
}

export function useAuth () {
  return new RAuth()
}
