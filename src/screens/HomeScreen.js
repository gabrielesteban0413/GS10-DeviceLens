import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      {/* Figuras de fondo */}
      <View style={styles.circleTopLeft} />
      <View style={styles.circleTopRight} />

      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color={colors.surface} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Hola, Gabriel!</Text>
            <Text style={styles.subGreeting}>Bienvenido a GID Bank</Text>
          </View>
          <View style={styles.bellIcon}>
            <Ionicons name="notifications-outline" size={24} color={colors.primary} />
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Disponible</Text>
          <Text style={styles.balanceAmount}>$ 12.450,00</Text>
          <View style={styles.balanceFooter}>
            <Text style={styles.cardNumber}>**** 6986</Text>
            <Text style={styles.cardExp}>24/2000</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Acciones Rápidas</Text>
        
        <View style={styles.actionsGrid}>
          <Pressable style={styles.actionItem} onPress={() => navigation.navigate('CameraTab')}>
            <View style={styles.actionIcon}><Ionicons name="scan" size={24} color={colors.primary} /></View>
            <Text style={styles.actionText}>Escanear</Text>
          </Pressable>
          <Pressable style={styles.actionItem} onPress={() => navigation.navigate('LocationTab')}>
            <View style={styles.actionIcon}><Ionicons name="location" size={24} color={colors.primary} /></View>
            <Text style={styles.actionText}>Sucursales</Text>
          </Pressable>
          <Pressable style={styles.actionItem} onPress={() => navigation.navigate('SensorTab')}>
            <View style={styles.actionIcon}><Ionicons name="shield-checkmark" size={24} color={colors.primary} /></View>
            <Text style={styles.actionText}>Seguridad</Text>
          </Pressable>
          <Pressable style={styles.actionItem}>
            <View style={styles.actionIcon}><Ionicons name="card" size={24} color={colors.primary} /></View>
            <Text style={styles.actionText}>Tarjetas</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Movimientos Recientes</Text>
        
        <View style={styles.transactionCard}>
          <View style={styles.transactionRow}>
            <View style={styles.transactionIcon}><Ionicons name="cart" size={20} color={colors.surface} /></View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Supermercado</Text>
              <Text style={styles.transactionDate}>Hoy, 14:30</Text>
            </View>
            <Text style={styles.transactionAmount}>-$50.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.transactionRow}>
            <View style={[styles.transactionIcon, { backgroundColor: colors.accent }]}><Ionicons name="cash" size={20} color={colors.primary} /></View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Transferencia</Text>
              <Text style={styles.transactionDate}>Ayer, 09:15</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: colors.success }]}>+$300.00</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors.background, overflow: 'hidden' },
  circleTopLeft: { position: 'absolute', top: -60, left: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: colors.accent, opacity: 0.5 },
  circleTopRight: { position: 'absolute', top: 150, right: -80, width: 220, height: 220, borderRadius: 110, backgroundColor: colors.accent, opacity: 0.4 },
  container: { flex: 1 },
  content: { padding: spacing.md, paddingTop: spacing.xl, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  headerText: { flex: 1 },
  greeting: { ...typography.title, color: colors.primaryDark, fontSize: 20 },
  subGreeting: { ...typography.caption, color: colors.textMuted },
  bellIcon: { padding: spacing.xs },
  balanceCard: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.xl, shadowColor: colors.primaryDark, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 8 },
  balanceLabel: { ...typography.caption, color: colors.primarySoft, marginBottom: 4 },
  balanceAmount: { ...typography.display, color: colors.surface, marginBottom: spacing.md },
  balanceFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  cardNumber: { ...typography.body, color: colors.primarySoft, letterSpacing: 2 },
  cardExp: { ...typography.body, color: colors.primarySoft },
  sectionLabel: { ...typography.subtitle, color: colors.primaryDark, marginBottom: spacing.md },
  actionsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  actionItem: { alignItems: 'center', width: '22%' },
  actionIcon: { width: 60, height: 60, borderRadius: 20, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs, shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  actionText: { ...typography.caption, color: colors.primaryDark, fontWeight: '600', textAlign: 'center' },
  transactionCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  transactionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
  transactionIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  transactionInfo: { flex: 1 },
  transactionTitle: { ...typography.subtitle, color: colors.primaryDark, fontSize: 15 },
  transactionDate: { ...typography.caption, color: colors.textMuted, fontSize: 12 },
  transactionAmount: { ...typography.subtitle, color: colors.danger, fontSize: 15 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs }
});
