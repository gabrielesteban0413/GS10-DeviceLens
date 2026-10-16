import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationScreen from '../screens/LocationScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function LocationStack() {
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
      <Stack.Screen name="Location" component={LocationScreen} options={{ title: 'Ubicacion' }} />
    </Stack.Navigator>
  );
}
