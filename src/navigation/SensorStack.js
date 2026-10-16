import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SensorScreen from '../screens/SensorScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function SensorStack() {
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
      <Stack.Screen name="Sensor" component={SensorScreen} options={{ title: 'Acelerometro' }} />
    </Stack.Navigator>
  );
}
