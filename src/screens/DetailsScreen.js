import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InfoCard from '../components/InfoCard';
import StatRow from '../components/StatRow';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { platformName, isIOS, isAndroid } from '../utils/platform';

const hints = {
  camera: [
    { label: 'Permiso Android', value: 'CAMERA' },
    { label: 'Permiso iOS', value: 'NSCameraUsageDescription' },
    { label: 'Libreria', value: 'expo-camera' }
  ],
  location: [
    { label: 'Permiso Android', value: 'ACCESS_FINE_LOCATION' },
    { label: 'Permiso iOS', value: 'NSLocationWhenInUseUsageDescription' },
    { label: 'Libreria', value: 'expo-location' }
  ],
  sensor: [
    { label: 'Sensor', value: 'Accelerometer' },
    { label: 'Libreria', value: 'expo-sensors' },
    { label: 'Unidad', value: 'Gravedad' }
  ]
};

export default function DetailsScreen({ route }) {
  const { feature } = route.params || {};
  const accent = feature && feature.accent ? feature.accent : colors.primary;
  const rows = hints[feature && feature.key] || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: accent + '1A' }]}>
          <Ionicons
            name={feature && feature.icon ? feature.icon : 'apps-outline'}
            size={28}
            color={accent}
          />
        </View>
        <Text style={styles.title}>{feature ? feature.title : 'Detalle'}</Text>
        <Text style={styles.description}>
          {feature ? feature.description : ''}
        </Text>
      </View>

      <InfoCard icon="phone-portrait-outline" title="Plataforma actual">
        <StatRow label="Sistema" value={platformName()} />
        <StatRow
          label="Identificador"
          value={isIOS ? 'ios' : isAndroid ? 'android' : 'desconocido'}
        />
      </InfoCard>

      <InfoCard icon="construct-outline" title="Configuracion tecnica">
        {rows.map((row) => (
          <StatRow key={row.label} label={row.label} value={row.value} />
        ))}
      </InfoCard>
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
  header: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md
  },
  title: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center'
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs
  }
});
