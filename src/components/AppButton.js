import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function AppButton({ title, onPress, icon, variant = 'primary', loading = false, disabled = false }) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const backgroundColor = isPrimary ? colors.primary : isDanger ? colors.danger : colors.surface;
  const textColor = isPrimary || isDanger ? '#FFFFFF' : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor },
        pressed && !disabled && styles.pressed,
        (disabled || loading) && styles.disabled
      ]}
    >
      {loading ? <ActivityIndicator color={textColor} /> : (
        <View style={styles.content}>
          {icon && <Ionicons name={icon} size={20} color={textColor} />}
          <Text style={[styles.label, { color: textColor }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: { paddingVertical: 16, paddingHorizontal: spacing.lg, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', minHeight: 56, marginBottom: spacing.sm },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { ...typography.subtitle, fontWeight: '800' }
});
