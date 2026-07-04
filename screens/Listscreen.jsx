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
        const isFav = favorites.includes(item.id || item.name)

        return (
            <View style={[globalstyles.card, {backgroundColor: colors.card}]}>
                <Text style={[globalstyles.title, {color: colors.text}]}>{item.naam || item.name}</Text>
                <Text style={[globalstyles.address, {color: colors.text}]}> {item.adres || item.address}</Text>

                {item.beoordeling || item.rating ? (
                    <Text
                        style={[globalstyles.rating, {color: colors.text}]}>Beoordeling: {item.beoordeling || item.rating}</Text>
                ) : null}

                <View style={globalstyles.buttonContainer}>
                    {item.website && (
                        <TouchableOpacity
                            style={[globalstyles.button, {backgroundColor: colors.primary}]}
                            onPress={() => Linking.openURL(item.website)}
                        >
                            <Text style={globalstyles.buttonText}>Website</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[globalstyles.button, {backgroundColor: colors.primary, flex: item.website ? 0.48 : 1}]}
                        onPress={() => navigation.navigate('Kaart', {location: item})}
                    >
                        <Text style={globalstyles.buttonText}>Navigeer op kaart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavorite(item.id || item.name)}>
                        <Text style={{fontSize: 24, paddingHorizontal: 10}}>
                            {isFav ? '💙' : '🤍'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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

