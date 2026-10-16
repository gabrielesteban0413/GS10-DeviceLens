import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function AppButton({
  title,
  onPress,
  icon,
  variant = 'primary',
  loading = false,
  disabled = false
}) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const isGhost = variant === 'ghost';

  const backgroundColor = isPrimary
    ? colors.primary
    : isDanger
    ? colors.danger
    : isGhost
    ? 'transparent'
    : colors.surface;

  const textColor = isPrimary || isDanger ? '#FFFFFF' : colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor: isGhost ? colors.border : backgroundColor
        },
        pressed && !disabled && styles.pressed,
        (disabled || loading) && styles.disabled
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {icon ? <Ionicons name={icon} size={18} color={textColor} /> : null}
          <Text style={[styles.label, { color: textColor }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minHeight: 48,
    marginBottom: spacing.sm
  },
  pressed: {
    opacity: 0.85
  },
  disabled: {
    opacity: 0.5
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  label: {
    ...typography.subtitle
  }
});
