import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import CameraStack from './CameraStack';
import LocationStack from './LocationStack';
import SensorStack from './SensorStack';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const tabConfig = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  CameraTab: { active: 'camera', inactive: 'camera-outline' },
  LocationTab: { active: 'location', inactive: 'location-outline' },
  SensorTab: { active: 'pulse', inactive: 'pulse-outline' }
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingTop: 6,
          height: 62
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600'
        },
        tabBarIcon: ({ color, size, focused }) => {
          const config = tabConfig[route.name];
          const name = focused ? config.active : config.inactive;
          return <Ionicons name={name} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Inicio' }} />
      <Tab.Screen name="CameraTab" component={CameraStack} options={{ title: 'Camara' }} />
      <Tab.Screen name="LocationTab" component={LocationStack} options={{ title: 'Ubicacion' }} />
      <Tab.Screen name="SensorTab" component={SensorStack} options={{ title: 'Sensor' }} />
    </Tab.Navigator>
  );
}
