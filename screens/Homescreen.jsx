import React, { useEffect, useRef, useState, useContext } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { ThemeContext } from '../context/ThemeContext';

export default function Homescreen() {
    const { colors, isDarkMode } = useContext(ThemeContext);

    const [hotspots, setHotspots] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const mapRef = useRef(null);

    const jsonUrl = "https://gist.githubusercontent.com/lisa-mao/f194bcefafda7e15f7498694c211d78b/raw/7e7482b3eb00ad86371f129930553a90e7b32c4c/mcdonalspots.json";

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);

            const { latitude, longitude } = currentLocation.coords;

            mapRef.current?.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000);

            try {
                const response = await fetch(jsonUrl);
                const data = await response.json();
                setHotspots(data);
            } catch (error) {
                console.error("Fout bij het ophalen van json data", error);
            }
        })();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <MapView
                ref={mapRef}
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                userInterfaceStyle={isDarkMode ? 'dark' : 'light'}
                customMapStyle={isDarkMode ? darkMapStyle : []}
                initialRegion={{
                    latitude: 51.9225,
                    longitude: 4.47917,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {hotspots.map((spot, index) => (
                    <Marker
                        key={spot.id || index.toString()}
                        coordinate={{
                            latitude: Number(spot.latitude),
                            longitude: Number(spot.longitude)
                        }}
                        pinColor="red"
                    >

                        <Callout tooltip>
                            <View style={[styles.callout, { backgroundColor: colors.card, borderColor: colors.text }]}>
                                <Text style={[styles.title, { color: colors.text }]}>{spot.name}</Text>
                                <Text style={[styles.description, { color: colors.text, opacity: 0.7 }]}>
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
                    />
                )}
            </MapView>
        </View>
    );
}

//De officiële Google Maps Dark Mode JSON style
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
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    callout: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        minWidth: 160,
        maxWidth: 220,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
    },
});