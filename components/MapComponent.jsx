import React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { View, Text } from 'react-native';
import { globalstyles } from "../styles/Globalstyles";

export const MapComponent = ({
    mapRef,
    hotspots,
    userLocation,
    colors,
    isDarkMode,
    mapStyle,
    onMarkerPress,
    onUserMarkerPress
}) => {
    return (
        <MapView
            ref={mapRef}
            style={globalstyles.map}
            showsUserLocation={true}
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
                    coordinate={{ latitude: Number(spot.latitude), longitude: Number(spot.longitude) }}
                    pinColor="red"
                    onPress={onMarkerPress}
                >
                    <Callout tooltip>
                        <View style={[globalstyles.callout, { backgroundColor: colors.card, borderColor: colors.text }]}>
                            <Text style={[globalstyles.mapTitle, { color: colors.text }]}>{spot.name}</Text>
                        </View>
                    </Callout>
                </Marker>
            ))}

            {userLocation && (
                <Marker
                    coordinate={{
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                    }}
                    title="Jij bent hier"
                    onPress={onUserMarkerPress}
                />
            )}
        </MapView>
    );
};