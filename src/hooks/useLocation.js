import { useCallback, useEffect, useState } from 'react';
import {
  requestForegroundPermission,
  getCurrentPosition,
  reverseGeocode
} from '../services/locationService';

export default function useLocation() {
  const [status, setStatus] = useState(null);
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestPermission = useCallback(async () => {
    const result = await requestForegroundPermission();
    setStatus(result);
    return result;
  }, []);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await getCurrentPosition();
      setCoords(position.coords);
      const places = await reverseGeocode({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      setAddress(places && places.length ? places[0] : null);
      return position;
    } catch (err) {
      setError(err.message || 'No se pudo obtener la ubicacion');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return {
    status,
    coords,
    address,
    loading,
    error,
    requestPermission,
    fetchLocation
  };
}
