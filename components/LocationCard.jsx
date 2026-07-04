import {Linking, Text, TouchableOpacity, View} from "react-native";
import {globalstyles} from "../styles/Globalstyles";
import React from "react";
export const LocationCard = ({ item, navigation, isFav, toggleFavorite, colors }) => {
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