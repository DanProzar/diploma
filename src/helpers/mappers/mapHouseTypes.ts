import { useI18n } from 'vue-i18n'
import { R_HOUSE_TYPE } from '../../types'

export function mapTypeTranslations (type: R_HOUSE_TYPE) {
  const { t } = useI18n()

  switch (type) {
    case R_HOUSE_TYPE.Rooms: return t('houses.types.rooms')
    case R_HOUSE_TYPE.SeparateRoom: return t('houses.types.separate_room')
    case R_HOUSE_TYPE.SleepingPlaces: return t('houses.types.sleeping_places')
    case R_HOUSE_TYPE.WholeHouse: return t('houses.types.whole_house')
    default: return type
  }
}
