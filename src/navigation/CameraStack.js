import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from '../screens/CameraScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function CameraStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Camara' }} />
    </Stack.Navigator>
  );
}
