import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();
const THEME_STORAGE_KEY = '@app_layout_mode';

const lightMapStyle = []
const darkMapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] },
    { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },
    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212634" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] },
    { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },
    { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d1c4" }] },
    { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3931" }] },
    { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] },
    { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }
]

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loadingTheme, setLoadingTheme] = useState(true);

    useEffect(() => {
        const loadSavedTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme !== null) {
                    setIsDarkMode(savedTheme === 'dark');
                }
            } catch (error) {
                console.error("Fout bij laden van thema:", error);
            } finally {
                setLoadingTheme(false);
            }
        };

        loadSavedTheme();
    }, []);

    const toggleTheme = async () => {
        try {
            const newMode = !isDarkMode;
            setIsDarkMode(newMode);
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
        } catch (error) {
            console.error("Fout bij opslaan van thema:", error);
        }
    };

    const theme = {
        isDarkMode,
        toggleTheme,
        loadingTheme,
        colors: {
            background: isDarkMode ? '#121212' : '#FFFFFF',
            text: isDarkMode ? '#F8FAFC' : '#0F172A',
            card: isDarkMode ? '#1E293B' : '#F1F5F9',
            primary: isDarkMode ? '#28517e' : '#82a4c5'
        },

        mapStyle: isDarkMode ? darkMapStyle : lightMapStyle
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}