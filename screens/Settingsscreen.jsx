import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Switch,
} from 'react-native'
import { ThemeContext } from '../context/ThemeContext'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SettingsScreen() {
    const { colors, isDarkMode, toggleTheme } = useContext(ThemeContext)

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { borderBottomColor: colors.card }]}>
                <Text style={[styles.headerText, { color: colors.text }]}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
})