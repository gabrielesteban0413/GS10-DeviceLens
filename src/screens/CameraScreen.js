import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [facing, setFacing] = useState('back');

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={48} color={colors.textMuted} />
        <Text style={styles.permissionTitle}>Permiso de camara requerido</Text>
        <Text style={styles.permissionText}>
          La aplicacion necesita acceso a la camara para tomar fotografias.
        </Text>
        <View style={styles.permissionAction}>
          <AppButton
            title="Conceder permiso"
            icon="lock-open-outline"
            onPress={requestPermission}
          />
        </View>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    setPhoto(result.uri);
  };

  const toggleFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.preview}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.previewImage} />
        ) : (
          <CameraView ref={cameraRef} style={styles.previewImage} facing={facing} />
        )}
      </View>

      <View style={styles.actions}>
        <AppButton title="Capturar" icon="camera" onPress={takePicture} />
        <AppButton
          title="Cambiar camara"
          icon="camera-reverse-outline"
          variant="secondary"
          onPress={toggleFacing}
        />
        <AppButton
          title="Limpiar"
          icon="trash-outline"
          variant="ghost"
          onPress={() => setPhoto(null)}
          disabled={!photo}
        />
      </View>

      <Text style={styles.caption}>
        {photo
          ? 'Fotografia capturada correctamente.'
          : 'Enfoca el objetivo y presiona capturar para tomar una fotografia.'}
      </Text>
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
  preview: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: '#000000',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border
  },
  previewImage: {
    flex: 1,
    width: '100%'
  },
  actions: {
    marginBottom: spacing.sm
  },
  caption: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center'
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background
  },
  permissionTitle: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.md,
    textAlign: 'center'
  },
  permissionText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm
  },
  permissionAction: {
    width: '100%',
    marginTop: spacing.lg
  }
});
