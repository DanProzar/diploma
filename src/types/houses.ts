
export interface IRHouseLocation {
  lat: string | number
  lng: string| number
}

export interface IRHouseMarker {
  position: IRHouseLocation
}

export enum R_HOUSE_TYPE {
  SleepingPlaces = 'sleeping-places',
  SeparateRoom = 'separate-room',
  WholeHouse = 'whole-house',
  Rooms = 'rooms'
}

export enum R_HOUSE_TERM {
  CoupleNights = 'couple_nights',
  SeveralDays = 'several_days',
  FewWeeks = 'few_weeks',
  ToVictory = 'to_victory',
  AnyTerm = 'any_term',
}

export interface IRHouseData {
  id?: number
  created_at?: string
  householder_id?: string
  title: string
  description: string
  location: IRHouseLocationData
  count_people: number
  type: R_HOUSE_TYPE | null
  term: R_HOUSE_TERM | null
  has_refugees: boolean
  media?: string[]
  transformed_media?: string[]
  place_id?: string
}

export interface IRCheckboxGroupItem {
  label: string
  value: string | number
}

export interface IRHouseImage {
  url: string
}

export interface IRHouseLocationData {
  houseNumber: string | null
  street: string | null
  city: string | null
  district: string | null
  coords: {
    lat: string | null
    lng: string | null
  } | null
}

export interface IRHouseAddress {
  address: IRHouseLocationData
  place_id: string
}

export interface IRHouseFormSubmitData {
  data: IRHouseData
  media?: {
    name: string
    file: File | string
  }[]
}

export interface IRHouseAccount {
  id: string
  data: {
    name: string
    surname: string
    email: string
    phone: string
  }
}
