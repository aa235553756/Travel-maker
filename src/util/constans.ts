
interface PositionData {
  latitude: number
  longitude: number
}

// !geoPromise
export const geoPromise = new Promise<PositionData>((reslove, reject) => {
  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      reslove({ latitude, longitude })
    },
    () => {
      reject()
    }
  )
})