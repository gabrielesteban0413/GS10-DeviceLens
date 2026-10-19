import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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

  if (!permission) return <View style={styles.container} />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="qr-code-outline" size={64} color={colors.primary} />
        <Text style={styles.permissionTitle}>Escáner Deshabilitado</Text>
        <Text style={styles.permissionText}>Concede permisos de cámara para escanear códigos QR de pago.</Text>
        <View style={styles.permissionAction}>
          <AppButton title="Activar Cámara" icon="camera" onPress={requestPermission} />
        </View>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    setPhoto(result.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.previewImage} />
        ) : (
          <CameraView ref={cameraRef} style={styles.previewImage} facing={facing}>
            <View style={styles.overlay}>
              <View style={styles.scanBox} />
            </View>
          </CameraView>
        )}
      </View>

      <View style={styles.bottomBar}>
        {photo ? (
           <AppButton title="Escanear otro" icon="refresh" onPress={() => setPhoto(null)} />
        ) : (
          <>
            <Text style={styles.instruction}>Apunta al código QR del comercio</Text>
            <AppButton title="Capturar Código" icon="scan" onPress={takePicture} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  preview: { flex: 1, margin: spacing.md, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: '#000' },
  previewImage: { flex: 1, width: '100%' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  scanBox: { width: 250, height: 250, borderWidth: 2, borderColor: colors.accent, borderRadius: 24, backgroundColor: 'transparent' },
  bottomBar: { padding: spacing.lg, paddingBottom: spacing.xxl, backgroundColor: colors.background },
  instruction: { ...typography.body, color: colors.primaryDark, textAlign: 'center', marginBottom: spacing.md, fontWeight: '600' },
  permissionContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, backgroundColor: colors.background },
  permissionTitle: { ...typography.title, color: colors.primaryDark, marginTop: spacing.md },
  permissionText: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.sm, marginBottom: spacing.lg },
  permissionAction: { width: '100%' }
});
