import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Switch,
} from 'react-native'
import { ThemeContext } from '../context/ThemeContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalstyles } from "../styles/Globalstyles";

export default function SettingsScreen() {
    const { colors, isDarkMode, toggleTheme } = useContext(ThemeContext)

    return (
        <SafeAreaView style={[globalstyles.container, { backgroundColor: colors.background }]}>
            <View style={[globalstyles.header, { borderBottomColor: colors.card }]}>
                <Text style={[globalstyles.headerText, { color: colors.text }]}>
                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#34D399' }}
                    thumbColor={isDarkMode ? '#F59E0B' : '#f4f3f4'}
                    onValueChange={toggleTheme}
                    value={isDarkMode}
                />
            </View>
        </SafeAreaView>
    )
}
