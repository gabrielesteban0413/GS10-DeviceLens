import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useAccelerometer from '../hooks/useAccelerometer';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function SensorScreen() {
  const { reading, available, magnitude } = useAccelerometer(200);
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    // Si la magnitud supera cierto umbral (movimiento brusco), activa alerta
    if (magnitude > 2.5 && !isAlert) {
      setIsAlert(true);
      setTimeout(() => setIsAlert(false), 3000);
    }
  }, [magnitude, isAlert]);

  if (!available) {
    return (
      <View style={styles.container}>
        <Ionicons name="warning" size={64} color={colors.textMuted} />
        <Text style={styles.title}>Sensor no disponible</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isAlert && { backgroundColor: '#fde8e8' }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Seguridad</Text>
        <Text style={styles.headerSubtitle}>Monitoreo de movimiento en tiempo real</Text>
      </View>

      <View style={styles.sensorContainer}>
        <View style={[styles.circle, isAlert && { borderColor: colors.danger }]}>
          <Ionicons 
            name={isAlert ? "alert-circle" : "shield-checkmark"} 
            size={80} 
            color={isAlert ? colors.danger : colors.primary} 
          />
        </View>
        <Text style={[styles.statusText, isAlert && { color: colors.danger }]}>
          {isAlert ? 'ALERTA DE MOVIMIENTO' : 'PROTEGIDO'}
        </Text>
        <Text style={styles.descText}>
          {isAlert ? 'Se detectó un movimiento brusco en el dispositivo.' : 'El dispositivo está estable. El acelerómetro monitorea caídas o robos.'}
        </Text>
      </View>

      <View style={styles.dataCard}>
        <Text style={styles.dataTitle}>Telemetría del Sensor</Text>
        <View style={styles.dataRow}>
          <View style={styles.dataPoint}><Text style={styles.dataLabel}>Eje X</Text><Text style={styles.dataValue}>{reading.x.toFixed(2)}</Text></View>
          <View style={styles.dataPoint}><Text style={styles.dataLabel}>Eje Y</Text><Text style={styles.dataValue}>{reading.y.toFixed(2)}</Text></View>
          <View style={styles.dataPoint}><Text style={styles.dataLabel}>Eje Z</Text><Text style={styles.dataValue}>{reading.z.toFixed(2)}</Text></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md, paddingTop: spacing.xl },
  header: { marginBottom: spacing.xl, marginTop: spacing.md },
  headerTitle: { ...typography.display, color: colors.primaryDark, fontSize: 28 },
  headerSubtitle: { ...typography.body, color: colors.textMuted },
  sensorContainer: { alignItems: 'center', marginVertical: spacing.lg },
  circle: { width: 180, height: 180, borderRadius: 90, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: colors.primarySoft, shadowColor: colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  statusText: { ...typography.title, color: colors.primary, marginTop: spacing.lg, letterSpacing: 2 },
  descText: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.sm, paddingHorizontal: spacing.lg },
  dataCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.xl },
  dataTitle: { ...typography.subtitle, color: colors.primaryDark, marginBottom: spacing.md, textAlign: 'center' },
  dataRow: { flexDirection: 'row', justifyContent: 'space-around' },
  dataPoint: { alignItems: 'center' },
  dataLabel: { ...typography.caption, color: colors.textMuted },
  dataValue: { ...typography.title, color: colors.primary, fontSize: 20 }
});
