import React, {useEffect, useRef, useState} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location'

export default function App() {
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const mapRef = useRef(null)

    useEffect(() => {
        (async () => {
            let {status} =await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied")
                return
            }

            let currentLocation = await Location.getCurrentPositionAsync({})
            const {latitude, longitude} = currentLocation.coords
            setLocation(currentLocation)

            mapRef.current?.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000)
        })()
    }, [])
  return (
      <View style={styles.container}>
        <MapView
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={{
                latitude: 51.9225,
                longitude: 4.47917,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {location && (
                <Marker coordinate={{
                    latitude:location.latitude,
                    longitude: location.longitude,

                }}
                        title="You are here"
                        />
            )}
        </MapView>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
