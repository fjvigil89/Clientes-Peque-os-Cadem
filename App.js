import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box, ScrollView } from 'native-base';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login-componnent';
import Lost from './components/lost-password';
import ListaFactura from './components/list-facturas';
import Detalle from './components/detalle-factura';
import Inventario from './components/inventario';

export default function App() {
  const [sessionId, setSessionId] = useState("lalala")

  const pepe=(x)=>{
    console.log("aqui esta", x);
    setSessionId(x)
  }
  const Drawer = createDrawerNavigator();
  const HomeStack = createStackNavigator();
  function HomeStackNavigator() {
    return (
      <HomeStack.Navigator initialRouteName="Login">
        <HomeStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Lost"
          component={Lost}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="List"
          component={ListaFactura}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Detalle"
          component={Detalle}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Inventario"
          component={Inventario}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    );
  }
  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <NativeBaseProvider>
      <StatusBar style="light" backgroundColor='#F08626' />
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});
