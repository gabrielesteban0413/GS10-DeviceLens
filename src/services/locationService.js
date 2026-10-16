import * as Location from 'expo-location';

export async function requestForegroundPermission() {
  const response = await Location.requestForegroundPermissionsAsync();
  return response.status;
}

export async function getCurrentPosition() {
  return Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High
  });
}

export async function reverseGeocode(coordinates) {
  return Location.reverseGeocodeAsync(coordinates);
}

export function formatCoordinate(value) {
  return Number(value).toFixed(6);
}
