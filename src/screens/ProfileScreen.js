import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarLarge}>
          <Ionicons name="person" size={40} color={colors.surface} />
        </View>
        <Text style={styles.name}>Gabriel Boada</Text>
        <Text style={styles.role}>Cliente Premium</Text>
      </View>

      <Text style={styles.sectionLabel}>Configuración de la Cuenta</Text>
      
      <View style={styles.menuCard}>
        <Pressable style={styles.menuItem}>
          <Ionicons name="person-outline" size={22} color={colors.primary} />
          <Text style={styles.menuText}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={styles.menuItem}>
          <Ionicons name="card-outline" size={22} color={colors.primary} />
          <Text style={styles.menuText}>Mis Tarjetas</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={22} color={colors.primary} />
          <Text style={styles.menuText}>Seguridad y Privacidad</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingTop: spacing.xl, paddingBottom: spacing.xxl },
  profileHeader: { alignItems: 'center', marginBottom: spacing.xl },
  avatarLarge: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md, shadowColor: colors.primaryDark, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 6 },
  name: { ...typography.title, color: colors.primaryDark },
  role: { ...typography.caption, color: colors.accent, fontWeight: '700', marginTop: 4, backgroundColor: colors.primaryDark, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
  sectionLabel: { ...typography.subtitle, color: colors.primaryDark, marginBottom: spacing.sm, marginLeft: 4 },
  menuCard: { backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.md, marginBottom: spacing.xl },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.lg },
  menuText: { ...typography.body, color: colors.primaryDark, flex: 1, marginLeft: spacing.md, fontWeight: '600' },
  divider: { height: 1, backgroundColor: colors.border },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, paddingVertical: spacing.md, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.danger, gap: spacing.sm },
  logoutText: { ...typography.subtitle, color: colors.danger }
});
