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
import { SafeAreaView } from 'react-native-safe-area-context'

const jsonURL = "https://gist.githubusercontent.com/lisa-mao/f194bcefafda7e15f7498694c211d78b/raw/7e7482b3eb00ad86371f129930553a90e7b32c4c/mcdonalspots.json"

export default function ListScreen({ navigation }) {
    const { colors, isDarkMode, toggleTheme } = useContext(ThemeContext)

    const [locations, setLocations] = useState([])
    const [loadingData, setLoadingData] = useState(true)
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

    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.title, { color: colors.text }]}>{item.naam || item.name}</Text>
            <Text style={[styles.address, { color: colors.text }]}> {item.adres || item.address}</Text>
            {item.beoordeling || item.rating ? (
                <Text style={[styles.rating, { color: colors.text }]}>Beoordeling: {item.beoordeling || item.rating}</Text>
            ) : null}

            <View style={styles.buttonContainer}>
                {item.website && (
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={() => Linking.openURL(item.website)}
                    >
                        <Text style={styles.buttonText}>Website</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.primary , flex: item.website ? 0.48 : 1 }]}
                    onPress={() => navigation.navigate('Kaart', { location: item })}
                >
                    <Text style={styles.buttonText}>Navigeer op kaart</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.primary } ]}
                    onPress={() => navigation.navigate('Instellingen')}
                >
                    <Text style={[styles.buttonText, {padding: 5} ]}>Instellingen</Text>
                </TouchableOpacity>
            </View>

            {loadingData ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : error ? (
                <View style={styles.centered}>
                    <Text style={{ color: colors.text }}>{error}</Text>
                </View>
            ) : (
                <FlatList
                    data={locations}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listPadding}
                />
            )}
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
    listPadding: {
        padding: 15,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    address: {
        fontSize: 14,
        marginBottom: 4,
        opacity: 0.8,
    },
    rating: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center'

    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
})