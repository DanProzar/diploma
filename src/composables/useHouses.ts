import { type App } from 'vue'
import { type IRCheckboxGroupItem, type IRHouseData, type IRHouseFormSubmitData, R_HOUSE_TERM, R_HOUSE_TYPE } from '@/types'
import { mapTermTranslations, mapTypeTranslations } from '@/helpers'

export const houseKey = 'house-inject-key'

export class RHouses {
  public readonly supabase = useSuperbase()
  public readonly profile = useUserProfile()
  public readonly storage = useHouseStorage()

  public readonly houses: Ref<IRHouseData[]> = useState('r-houses', () => [])
  public readonly allHouses: Ref<IRHouseData[]> = ref([])
  public readonly allImages: Ref<any[]> = ref([])

  public readonly houseIdToDelete: Ref<number | null> = useState('house-to-delete', () => null)
  public readonly houseIdToEdit: Ref<number | null> = useState('house-to-edit', () => null)

  public readonly types = ref<IRCheckboxGroupItem[]>(Object
    .values(R_HOUSE_TYPE)
    .map(type => ({
      label: mapTypeTranslations(type),
      value: type,
    })),
  )

  public readonly terms = ref<IRCheckboxGroupItem[]>(Object
    .values(R_HOUSE_TERM)
    .map(term => ({
      label: mapTermTranslations(term),
      value: term,
    })),
  )

  constructor () {
    this.add = this.add.bind(this)
    this.deleteHouse = this.deleteHouse.bind(this)
    this.edit = this.edit.bind(this)
    this.get = this.get.bind(this)
    this.getHouseImages = this.getHouseImages.bind(this)
    this.loadUserHouses = this.loadUserHouses.bind(this)
    this.getAllHouses = this.getAllHouses.bind(this)
    this.getAllHouseImages = this.getAllHouseImages.bind(this)
    this.transformImages = this.transformImages.bind(this)
  }

  public readonly editHouseData = computed(() => {
    return this.houses.value.find((house) => {
      return house.id?.toString() === this.houseIdToEdit.value?.toString()
    })
  })

  public transformImages (house: IRHouseData, user_id: string) {
    house.media = house.media.map((image) => {
      return useCdnURL(
        `houses/${user_id}/${house.id}/${image}.png`,
      )
    })
  }

  public async loadUserHouses () {
    const { data, error } = await this.supabase
      .from('houses')
      .select('*')
      .eq('householder_id', this.profile.user.value?.id)

    if (error || !data) {
      console.error(error.message)
      return false
    }

    const houses = Array.from(data) as IRHouseData[]

    houses.forEach((house) => {
      this.transformImages(house, this.profile.user.value!.id)
    })

    this.houses.value = houses as IRHouseData[]

    return true
  }

  public async add ({ data, media }: IRHouseFormSubmitData) {
    const { error } = await this.supabase
      .from('houses')
      .insert({
        ...data,
        media: media.map(image => image.name),
        householder_id: this.profile.user.value?.id,
      })

    if (error) {
      console.error(error.message)
      return false
    }

    const { data: selectData, error: selectError } = await this.supabase
      .from('houses')
      .select('id')
      .eq('householder_id', this.profile.user.value?.id)
      .eq('place_id', data.place_id)

    if (selectError) {
      console.error(selectError.message)
      return false
    }

    const success = await this.storage.addImages(selectData[0].id, media)

    return success
  }

  public async deleteHouse (id: number) {
    const { error } = await this.supabase
      .from('houses')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error.message)
      return false
    }

    await this.storage.removeAllHouseImages(id)

    return true
  }

  public async edit ({ data, media }: IRHouseFormSubmitData) {
    const { error } = await this.supabase
      .from('houses')
      .update({
        ...data,
        media: media.map(image => image.name),
      })
      .eq('householder_id', this.profile.user.value?.id)

    if (error) {
      console.error(error.message)
      return false
    }

    const success = await this.storage.editImages(data.id!, media)

    return success
  }

  public async get (id: string) {
    const { error, data } = await this.supabase
      .from('houses')
      .select('*')
      .eq('id', id)

    if (error) {
      console.error(error.message)
      return false
    }

    if (!data) {
      return false
    }

    const house = data[0] as IRHouseData

    this.transformImages(house, house.householder_id!)

    return house
  }

  public async getHouseImages (id: string, options: {
    limit?: number
  } = {}) {
    const { data, error } = await this.supabase
      .storage
      .from('media')
      .list(`houses/${this.profile.user.value!.id}/${id}`, options)

    if (!data || error) {
      return null
    }

    return data.map(item => item.name)
  }

  public async getAllHouses () {
    const { error, data } = await this.supabase
      .from('houses')
      .select('*')

    if (error) {
      console.error(error.message)
      return false
    }

    if (!data) {
      return false
    }

    this.allHouses.value = data as IRHouseData[]
  }

  public async getAllHouseImages () {
    const { data } = await this.supabase
      .storage
      .getBucket('media')

    if (!data) {
      return []
    }

    this.allImages.value = data
  }

  install (app: App) {
    app.provide(houseKey, this)
    app.config.globalProperties.$houseState = this
  }
}

export function useHouses () {
  return new RHouses()
}
