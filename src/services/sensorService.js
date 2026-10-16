import { Accelerometer } from 'expo-sensors';

export async function isAccelerometerAvailable() {
  return Accelerometer.isAvailableAsync();
}

export function setUpdateInterval(interval) {
  Accelerometer.setUpdateInterval(interval);
}

export function subscribe(callback) {
  return Accelerometer.addListener(callback);
}

export function magnitude(reading) {
  const { x, y, z } = reading;
  return Math.sqrt(x * x + y * y + z * z);
}
