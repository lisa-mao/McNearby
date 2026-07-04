import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Switch,
    TouchableOpacity,
    Linking,
    ActivityIndicator
} from 'react-native'
import { ThemeContext } from '../context/ThemeContext'
import { FavoritesContext } from '../context/FavouritesContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import {globalstyles} from "../styles/Globalstyles";
import {LocationCard }from "../components/LocationCard";

const jsonURL = "https://gist.githubusercontent.com/lisa-mao/f194bcefafda7e15f7498694c211d78b/raw/7e7482b3eb00ad86371f129930553a90e7b32c4c/mcdonalspots.json"

export default function ListScreen({ navigation }) {
    const { colors, isDarkMode, toggleTheme } = useContext(ThemeContext)

    const [locations, setLocations] = useState([])
    const [loadingData, setLoadingData] = useState(true)
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(jsonURL)
                if (!response.ok) {
                    throw new Error('Netwerkrespons was niet in orde')
                }
                const data = await response.json()
                setLocations(data)
            } catch (err) {
                console.error("Fout bij ophalen:", err)
                setError("Kon locaties niet laden.")
            } finally {
                setLoadingData(false)
            }
        };

        fetchLocations()
    }, [])

    const renderItem = ({ item }) => {
        return (
        <LocationCard
            item={item}
            isFav={favorites.includes(item.id || item.name)}
            toggleFavorite={toggleFavorite}
            navigation={navigation}
            colors={colors}
        />
        )
    }

    return (
        <SafeAreaView style={[globalstyles.container, { backgroundColor: colors.background }]}>
            <View style={globalstyles.header}>
                <TouchableOpacity
                    style={[globalstyles.button, { backgroundColor: colors.primary } ]}
                    onPress={() => navigation.navigate('Instellingen')}
                >
                    <Text style={[globalstyles.buttonText, {padding: 5} ]}>Instellingen</Text>
                </TouchableOpacity>
            </View>

            {loadingData ? (
                <View style={globalstyles.centered}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : error ? (
                <View style={globalstyles.centered}>
                    <Text style={{ color: colors.text }}>{error}</Text>
                </View>
            ) : (
                <FlatList
                    data={locations}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={globalstyles.listPadding}
                />
            )}
        </SafeAreaView>
    )}

