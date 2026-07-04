import React, { useEffect, useRef, useState, useContext } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import { StyleSheet, View, Text } from 'react-native'
import * as Location from 'expo-location'
import { ThemeContext } from '../context/ThemeContext'
import { globalstyles } from "../styles/Globalstyles";

export default function Homescreen({ route }) {
    const { colors, isDarkMode, mapStyle } = useContext(ThemeContext)

    const [hotspots, setHotspots] = useState([])
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const [trackUser, setTrackUser] = useState(true)
    const mapRef = useRef(null)

    const jsonUrl = "https://gist.githubusercontent.com/lisa-mao/f194bcefafda7e15f7498694c211d78b/raw/7e7482b3eb00ad86371f129930553a90e7b32c4c/mcdonalspots.json"

    useEffect(() => {
        const targetLocation = route.params?.location

        if (targetLocation && mapRef.current) {
            setTrackUser(false)

            mapRef.current.animateToRegion({
                latitude: Number(targetLocation.latitude),
                longitude: Number(targetLocation.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000)
        }
    }, [route.params?.location])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied")
                return
            }

            let currentLocation = await Location.getCurrentPositionAsync({})
            setLocation(currentLocation)

            if (!route.params?.location) {
                const { latitude, longitude } = currentLocation.coords
                mapRef.current?.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }, 1000)
            }

            try {
                const response = await fetch(jsonUrl)
                const data = await response.json()
                setHotspots(data)
            } catch (error) {
                console.error("Fout bij het ophalen van json data", error)
            }
        })()
    }, [])

    return (
        <View style={[globalstyles.container, { backgroundColor: colors.background }]}>
            <MapView
                ref={mapRef}
                style={globalstyles.map}
                showsUserLocation={true}
                followsUserLocation={trackUser}
                onPanDrag={() => setTrackUser(false)}
                userInterfaceStyle={isDarkMode ? 'dark' : 'light'}
                customMapStyle={mapStyle}
                initialRegion={{
                    latitude: 51.9225,
                    longitude: 4.47917,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {hotspots.map((spot, index) => (
                    <Marker
                        key={`${index}-${spot.name}`}
                        coordinate={{
                            latitude: Number(spot.latitude),
                            longitude: Number(spot.longitude)
                        }}
                        pinColor="red"
                        onPress={() => setTrackUser(false)}
                    >
                        <Callout tooltip>
                            <View style={[globalstyles.callout, { backgroundColor: colors.card, borderColor: colors.text }]}>
                                <Text style={[globalstyles.mapTitle, { color: colors.text }]}>{spot.name}</Text>
                                <Text style={[globalstyles.description, { color: colors.text, opacity: 0.7 }]}>
                                    {spot.address || spot.description}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}

                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Jij bent hier"
                        onPress={() => setTrackUser(true)}
                    />
                )}
            </MapView>
        </View>
    )
}

