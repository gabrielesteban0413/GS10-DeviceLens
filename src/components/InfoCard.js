import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function InfoCard({ icon, title, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {icon && <View style={styles.iconWrap}><Ionicons name={icon} size={20} color={colors.primary} /></View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md, shadowColor: colors.primaryDark, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 15, elevation: 4 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  iconWrap: { width: 36, height: 36, borderRadius: radius.md, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  title: { ...typography.subtitle, color: colors.primary },
  body: { gap: spacing.xs }
});
