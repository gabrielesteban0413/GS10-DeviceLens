import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { platformName, platformIcon } from '../utils/platform';

const features = [
  {
    key: 'camera',
    icon: 'camera-outline',
    accent: '#2563EB',
    title: 'Camara',
    description: 'Captura fotografias con la camara nativa del dispositivo.'
  },
  {
    key: 'location',
    icon: 'location-outline',
    accent: '#10B981',
    title: 'Ubicacion',
    description: 'Obtiene coordenadas GPS y direccion aproximada.'
  },
  {
    key: 'sensor',
    icon: 'pulse-outline',
    accent: '#F59E0B',
    title: 'Acelerometro',
    description: 'Visualiza el movimiento en los tres ejes.'
  }
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.badge}>
            <Ionicons name={platformIcon()} size={14} color={colors.primary} />
            <Text style={styles.badgeText}>{platformName()}</Text>
          </View>
        </View>
        <Text style={styles.heroTitle}>Panel principal</Text>
        <Text style={styles.heroSubtitle}>
          Accede a las funcionalidades nativas y al sensor del dispositivo.
        </Text>
      </View>

      <Text style={styles.sectionLabel}>MODULOS</Text>

      {features.map((feature) => (
        <Pressable
          key={feature.key}
          onPress={() => navigation.navigate('Details', { feature })}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={[styles.cardIcon, { backgroundColor: feature.accent + '1A' }]}>
            <Ionicons name={feature.icon} size={22} color={feature.accent} />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardDescription}>{feature.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>
      ))}
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
  hero: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.sm
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill
  },
  badgeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600'
  },
  heroTitle: {
    ...typography.display,
    color: colors.text,
    marginBottom: spacing.xs
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.textMuted
  },
  sectionLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md
  },
  cardPressed: {
    opacity: 0.85
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardBody: {
    flex: 1
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: 2
  },
  cardDescription: {
    ...typography.caption,
    color: colors.textMuted
  }
});
