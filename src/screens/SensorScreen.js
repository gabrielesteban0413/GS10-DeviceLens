import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import useAccelerometer from '../hooks/useAccelerometer';
import InfoCard from '../components/InfoCard';
import StatRow from '../components/StatRow';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function SensorScreen() {
  const { reading, active, available, magnitude } = useAccelerometer(200);

  if (!available) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="pulse-outline"
          title="Acelerometro no disponible"
          description="El dispositivo no cuenta con este sensor."
        />
      </View>
    );
  }

  const normalize = (value) => Math.min(Math.abs(value) / 2, 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <InfoCard icon="pulse-outline" title="Acelerometro">
        <StatRow label="Estado" value={active ? 'Activo' : 'Inactivo'} />
        <StatRow label="Intervalo" value="200 ms" />
        <StatRow label="Magnitud total" value={magnitude.toFixed(3)} />
      </InfoCard>

      <InfoCard icon="analytics-outline" title="Lecturas por eje">
        <StatRow label="Eje X" value={reading.x.toFixed(3)} />
        <StatRow label="Eje Y" value={reading.y.toFixed(3)} />
        <StatRow label="Eje Z" value={reading.z.toFixed(3)} />
      </InfoCard>

      <InfoCard icon="stats-chart-outline" title="Intensidad">
        <View style={styles.barGroup}>
          <Bar label="X" value={normalize(reading.x)} color={colors.primary} />
          <Bar label="Y" value={normalize(reading.y)} color={colors.success} />
          <Bar label="Z" value={normalize(reading.z)} color={colors.warning} />
        </View>
      </InfoCard>

      <InfoCard icon="information-circle-outline" title="Interpretacion">
        <Text style={styles.note}>
          Los valores representan la aceleracion del dispositivo sobre cada eje,
          expresada en unidades de gravedad.
        </Text>
      </InfoCard>
    </ScrollView>
  );
}

function Bar({ label, value, color }) {
  const width = Math.round(value * 100);
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            { width: width + '%', backgroundColor: color }
          ]}
        />
      </View>
    </View>
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
  note: {
    ...typography.body,
    color: colors.textMuted
  },
  barGroup: {
    gap: spacing.sm,
    paddingVertical: spacing.sm
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  barLabel: {
    ...typography.caption,
    color: colors.textMuted,
    width: 18,
    fontWeight: '600'
  },
  barTrack: {
    flex: 1,
    height: 10,
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    overflow: 'hidden'
  },
  barFill: {
    height: '100%',
    borderRadius: radius.pill
  }
});
