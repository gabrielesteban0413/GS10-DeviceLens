# Expo Native App

Aplicacion movil desarrollada con React Native y Expo que integra dos funcionalidades
nativas (camara y ubicacion) y un sensor del dispositivo (acelerometro), con navegacion
por pestañas y pilas, adaptacion al sistema operativo y compilacion de APK mediante EAS.

## Estructura del proyecto

expo-native-app
App.js
app.json
eas.json
babel.config.js
package.json
src
components
hooks
navigation
screens
services
theme
utils

## Requisitos

- Node.js 18 o superior
- npm o yarn
- Cuenta de Expo para generar el APK con EAS Build

## Instalacion

npm install

## Ejecucion en desarrollo

npm start

## Compilacion del APK

npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview

El perfil preview esta configurado con buildType apk, por lo que el archivo generado
es directamente instalable en dispositivos Android.

## Funcionalidades

- Camara: captura de fotografias y cambio entre camara frontal y trasera.
- Ubicacion: solicitud de permiso, coordenadas GPS y direccion aproximada.
- Acelerometro: lecturas en los tres ejes, magnitud total e indicadores visuales.
- Adaptacion por plataforma: permisos, identificadores y estilos segun Android o iOS.
- Navegacion: pestañas inferiores con pilas independientes y pantalla de detalle.
