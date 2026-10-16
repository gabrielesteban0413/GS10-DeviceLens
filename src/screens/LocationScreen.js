import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useLocation from '../hooks/useLocation';
import AppButton from '../components/AppButton';
import InfoCard from '../components/InfoCard';
import StatRow from '../components/StatRow';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { permissionLabel } from '../utils/permissions';
import { formatCoordinate } from '../services/locationService';

export default function LocationScreen() {
  const {
    status,
    coords,
    address,
    loading,
    error,
    requestPermission,
    fetchLocation
  } = useLocation();

  const granted = status === 'granted';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <InfoCard icon="shield-checkmark-outline" title="Estado del permiso">
        <StatRow label="Permiso" value={permissionLabel(status)} />
        <StatRow label="Precision" value="Alta" />
      </InfoCard>

      {!granted ? (
        <View style={styles.permissionBox}>
          <EmptyState
            icon="location-outline"
            title="Permiso de ubicacion requerido"
            description="Concede el permiso para obtener tus coordenadas actuales."
          />
          <AppButton
            title="Solicitar permiso"
            icon="lock-open-outline"
            onPress={requestPermission}
          />
        </View>
      ) : (
        <>
          <AppButton
            title={loading ? 'Obteniendo ubicacion' : 'Obtener ubicacion'}
            icon="navigate-outline"
            onPress={fetchLocation}
            loading={loading}
          />

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {coords ? (
            <InfoCard icon="location-outline" title="Coordenadas">
              <StatRow label="Latitud" value={formatCoordinate(coords.latitude)} />
              <StatRow label="Longitud" value={formatCoordinate(coords.longitude)} />
              <StatRow
                label="Altitud"
                value={coords.altitude ? coords.altitude.toFixed(2) + ' m' : 'No disponible'}
              />
              <StatRow
                label="Precision"
                value={coords.accuracy ? coords.accuracy.toFixed(2) + ' m' : 'No disponible'}
              />
            </InfoCard>
          ) : null}

          {address ? (
            <InfoCard icon="map-outline" title="Direccion aproximada">
              <StatRow
                label="Ciudad"
                value={address.city || address.subregion || 'No disponible'}
              />
              <StatRow label="Region" value={address.region || 'No disponible'} />
              <StatRow label="Pais" value={address.country || 'No disponible'} />
              <StatRow
                label="Codigo postal"
                value={address.postalCode || 'No disponible'}
              />
            </InfoCard>
          ) : null}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl
  },
  permissionBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#FEF2F2',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: spacing.md,
    marginBottom: spacing.md
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    flex: 1
  }
});
