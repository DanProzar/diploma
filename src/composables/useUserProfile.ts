import type { User, UserAttributes } from '@supabase/supabase-js'
import type { IEditProfileData } from '@/types'

export class RUserProfile {
  public readonly supabase = useSuperbase()
  private readonly auth = useAuth()

  public readonly user: ComputedRef<User | null>

  public readonly editProfileErrorMessage: Ref<string> = ref('')

  public constructor () {
    this.user = computed(() => this.auth.user.value)

    this.isAvatarSet = this.isAvatarSet.bind(this)
    this.editProfile = this.editProfile.bind(this)
  }

  public async isAvatarSet (): Promise<boolean> {
    const { data: avatarList } = await this.supabase.storage.from('media').list('avatars')

    if (!avatarList) {
      return false
    }

    return avatarList.some(avatar => avatar.name === this.user.value?.id)
  }

  public async editProfile (editData: IEditProfileData): Promise<boolean> {
    if (typeof editData !== 'object' || editData === null) {
      return false
    }

    this.editProfileErrorMessage.value = ''

    let dataToUpdate: UserAttributes = {}

    for (const [key, value] of Object.entries(editData)) {
      switch (key) {
        case 'phone':
        case 'name':
        case 'surname': {
          if (!dataToUpdate.data) {
            dataToUpdate.data = {}
          }

          const v = key === 'phone' ? normalizePhoneNumber(value!.toString()) : value

          dataToUpdate.data = Object.assign(dataToUpdate.data, {
            [key]: v,
          })
        } break
        case 'email':
          dataToUpdate = Object.assign(dataToUpdate, {
            [key]: value,
          })
      }
    }

    const { data: responseData, error } = await this.supabase.auth.updateUser(dataToUpdate)

    if (error) {
      this.editProfileErrorMessage.value = error.message
      return false
    }

    const { error: insertError } = await this.supabase
      .from('householders')
      .update([
        {
          ...dataToUpdate.data,
          email: dataToUpdate.email,
        },
      ])
      .eq('user_id', responseData.user.id)

    if (insertError) {
      console.error(insertError.message)
      return false
    }

    return true
  }
}

export function useUserProfile () {
  return new RUserProfile()
}
