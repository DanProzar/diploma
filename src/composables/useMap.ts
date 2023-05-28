import type { IRHouseAddress, IRHouseLocation, IRHouseLocationData } from '~/types'

export function useMap () {
  const apiKey = useRuntimeConfig().public.google.maps.api

  function convertAddressComponents (addressComponents: any): Omit<IRHouseLocationData, 'coords'> {
    const autofillParams: any = {}

    addressComponents.forEach((component: any) => {
      const types = component.types

      // Extract specific address component types
      if (types.includes('street_number')) {
        autofillParams.street_number = component.long_name
      } else if (types.includes('route')) {
        autofillParams.route = component.long_name
      } else if (types.includes('locality')) {
        autofillParams.locality = component.long_name
      } else if (types.includes('administrative_area_level_1')) {
        autofillParams.administrative_area_level_1 = component.long_name
      } else if (types.includes('postal_code')) {
        autofillParams.postal_code = component.long_name
      } else if (types.includes('country')) {
        autofillParams.country = component.long_name
        autofillParams.country_code = component.short_name
      }
    })

    const data = Object.assign(
      {},
      {
        houseNumber: autofillParams.street_number,
        street: autofillParams.route,
        district: autofillParams.administrative_area_level_1,
        city: autofillParams.locality,
      },
    )

    return data
  }

  async function getMarkerAddress (position: IRHouseLocation) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${apiKey}&language=uk`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK') {
      return data.results[0]
    } else {
      return null
    }
  }

  async function getLocationInfo (location: IRHouseLocation): Promise<IRHouseAddress> {
    const address = await getMarkerAddress(location)

    return {
      address: {
        ...(convertAddressComponents(address.address_components) || {}),
        coords: {
          lat: location.lat.toString(),
          lng: location.lng.toString(),
        },
      },
      place_id: address.place_id,
    }
  }

  const mapCenter = reactive({
    lat: 48.2258,
    lng: 31.1056,
  })

  function transformCoords (coords: IRHouseLocationData['coords']) {
    return {
      position: {
        lat: Number(coords?.lat),
        lng: Number(coords?.lng),
      },
    }
  }

  function formatAddress (location: IRHouseLocationData) {
    return `${location.street} ${location.houseNumber}, ${location.city}, ${location.district}`
  }

  return {
    convertAddressComponents,
    getMarkerAddress,
    getLocationInfo,
    formatAddress,
    transformCoords,
    mapCenter,
  }
}
