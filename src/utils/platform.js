import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

export function platformSelect(values) {
  return Platform.select(values);
}

export function platformValue(iosValue, androidValue, fallback) {
  if (isIOS) return iosValue;
  if (isAndroid) return androidValue;
  return fallback;
}

export function platformName() {
  if (isIOS) return 'iOS';
  if (isAndroid) return 'Android';
  return 'Desconocido';
}

export function platformIcon() {
  if (isIOS) return 'logo-apple';
  if (isAndroid) return 'logo-android';
  return 'globe-outline';
}
