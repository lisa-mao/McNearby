import React, { useEffect, useRef, useState, useContext } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import { StyleSheet, View, Text } from 'react-native'
import * as Location from 'expo-location'
import { ThemeContext } from '../context/ThemeContext'
import { globalstyles } from "../styles/Globalstyles";
import {MapComponent} from "../components/MapComponent";

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
            <MapComponent
                mapRef={mapRef}
                hotspots={hotspots}
                userLocation={location}
                colors={colors}
                isDarkMode={isDarkMode}
                mapStyle={mapStyle}
                onMarkerPress={() => setTrackUser(false)}
                onUserMarkerPress={() => setTrackUser(true)}
            />
        </View>
    )
}

