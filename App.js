import React from 'react';
import {ThemeProvider} from './context/ThemeContext';
import HomeScreen from './screens/Homescreen';
import ListScreen from "./screens/Listscreen";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SettingsScreen from "./screens/Settingsscreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Locaties">
                        <Stack.Screen name="Locaties" component={ListScreen}/>
                        <Stack.Screen name="Kaart" component={HomeScreen}/>
                        <Stack.Screen name="Instellingen" component={SettingsScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}