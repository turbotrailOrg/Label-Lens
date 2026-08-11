import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Settings } from 'lucide-react-native';

import WelcomeScreen from './src/screens/WelcomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={({ navigation }) => ({
            headerTitle: '',
            headerTransparent: true,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsBtn}>
                <Settings color="#1F2937" size={24} />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen 
          name="Scanner" 
          component={ScannerScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ headerShown: false, presentation: 'modal' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  settingsBtn: {
    padding: 8,
  }
});
