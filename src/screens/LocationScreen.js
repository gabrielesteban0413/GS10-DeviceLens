import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useLocation from '../hooks/useLocation';
import AppButton from '../components/AppButton';
import InfoCard from '../components/InfoCard';
import StatRow from '../components/StatRow';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { permissionLabel } from '../utils/permissions';
import { formatCoordinate } from '../services/locationService';

export default function LocationScreen() {
  const { status, coords, address, loading, error, requestPermission, fetchLocation } = useLocation();
  const granted = status === 'granted';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Sucursales</Text>
        <Text style={styles.subtitle}>Encuentra cajeros y atención al cliente cerca de ti</Text>
      </View>

      <InfoCard icon="shield-checkmark-outline" title="GPS del Dispositivo">
        <StatRow label="Estado" value={permissionLabel(status)} />
        <StatRow label="Precisión" value="Alta" />
      </InfoCard>

      {!granted ? (
        <View style={styles.permissionBox}>
          <EmptyState icon="map-outline" title="Ubicación requerida" description="Activa el GPS para encontrar la sucursal más cercana." />
          <AppButton title="Activar Ubicación" icon="location" onPress={requestPermission} />
        </View>
      ) : (
        <>
          <AppButton title={loading ? 'Buscando...' : 'Buscar Sucursal'} icon="navigate" onPress={fetchLocation} loading={loading} />
          
          {error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={20} color={colors.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {coords && (
            <InfoCard icon="location-outline" title="Coordenadas de Búsqueda">
              <StatRow label="Latitud" value={formatCoordinate(coords.latitude)} />
              <StatRow label="Longitud" value={formatCoordinate(coords.longitude)} />
              <StatRow label="Precisión" value={coords.accuracy ? coords.accuracy.toFixed(2) + ' m' : 'N/A'} />
            </InfoCard>
          )}

          {address && (
            <InfoCard icon="business-outline" title="Zona Detectada">
              <StatRow label="Ciudad" value={address.city || address.subregion || 'N/A'} />
              <StatRow label="Región" value={address.region || 'N/A'} />
              <StatRow label="País" value={address.country || 'N/A'} />
            </InfoCard>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.lg, marginTop: spacing.md },
  title: { ...typography.display, color: colors.primaryDark, fontSize: 28 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 4 },
  permissionBox: { backgroundColor: colors.surface, borderRadius: 24, padding: spacing.md },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: '#FEF2F2', borderRadius: 12, padding: spacing.md, marginBottom: spacing.md },
  errorText: { ...typography.caption, color: colors.danger, flex: 1 }
});
