import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();
const THEME_STORAGE_KEY = '@app_layout_mode';

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
        }
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}