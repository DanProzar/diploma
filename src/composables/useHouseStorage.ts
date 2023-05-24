import { v4 as uuid } from 'uuid'
import type { IRHouseFormSubmitData } from '~/types'

export class RHouseStorage {
  public readonly supabase = useSuperbase()
  public readonly auth = useAuth()

  constructor () {
    this.doesUserHaveHouses = this.doesUserHaveHouses.bind(this)
    this.isHouseExists = this.isHouseExists.bind(this)
    this.addImages = this.addImages.bind(this)
    this.editImages = this.editImages.bind(this)
    this.removeImage = this.removeImage.bind(this)

    this.removeAllHouseImages = this.removeAllHouseImages.bind(this)
  }

  public async doesUserHaveHouses () {
    const { error, data } = await this.supabase.storage
      .from('media/houses')
      .list(this.auth.user.value!.id.toString())

    if (error) {
      console.error(error.message)
      return false
    }

    return !!data?.length
  }

  public async isHouseExists (id: string) {
    const { error, data: availableData } = await this.supabase.storage
      .from(`media/houses/${this.auth.user.value!.id.toString()}`)
      .list(id)

    if (error) {
      console.error(error.message)
      return false
    }

    return !!availableData?.length
  }

  public async addImages (id: string, data: IRHouseFormSubmitData['media']) {
    const haveHouses = await this.doesUserHaveHouses()
    const isHouseExists = await this.isHouseExists(id)

    if (haveHouses && isHouseExists) {
      return false
    }

    const pathes = await Promise.all(data.map(async (item) => {
      const { data: successData, error } = await this.supabase.storage
        .from(`media/houses/${this.auth.user.value!.id.toString()}/${id}`)
        .upload(
          `${item.name}.png`,
          item.file,
        )

      return !error && successData?.path
    }))

    if (
      pathes.every(p => typeof p === 'string')
      && pathes.length === data.length
    ) {
      return true
    }

    return false
  }

  public async editImages (id: number, data: IRHouseFormSubmitData['media']) {
    const messagesToAdd = data.filter(item => typeof item.file === 'object')

    const pathes = await Promise.all(messagesToAdd.map(async (item) => {
      const { data: successData, error } = await this.supabase.storage
        .from(`media/houses/${this.auth.user.value!.id.toString()}/${id}`)
        .upload(
          `${item.name}.png`,
          item.file,
        )

      return !error && successData?.path
    }))

    if (
      pathes.every(p => typeof p === 'string')
      && pathes.length === data.length
    ) {
      return true
    }

    return false
  }

  public async removeImage (path: string) {
    const { data, error } = await this.supabase
      .storage
      .from('media')
      .remove([`houses/${path}`])

    if (!data || error) {
      return false
    }

    return true
  }

  public async removeAllHouseImages (id: number) {
    const { data: listImages } = await this.supabase
      .storage
      .from('media')
      .list(`houses/${this.auth.user.value!.id}/${id}`)

    if (!listImages) {
      return null
    }

    const data = await Promise.all(listImages?.map(async (image) => {
      const { error, data } = await this.supabase
        .storage
        .from('media')
        .remove([`houses/${this.auth.user.value!.id}/${id}/${image.name}`])

      return data
    }))

    return data
  }
}

export function useHouseStorage () {
  return new RHouseStorage()
}
