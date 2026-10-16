import { Linking } from 'react-native';

export async function openAppSettings() {
  await Linking.openSettings();
}

export function permissionLabel(status) {
  if (status === 'granted') return 'Concedido';
  if (status === 'denied') return 'Denegado';
  if (status === 'undetermined') return 'Pendiente';
  return 'Desconocido';
}
