import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const loadFavorites = async () => {
            const saved = await AsyncStorage.getItem('@app_favorites')
            if (saved) setFavorites(JSON.parse(saved))
        }
        loadFavorites()
    }, [])

    const toggleFavorite = async (id) => {
        let newFavorites;
        if (favorites.includes(id)) {
            newFavorites = favorites.filter(favId => favId !== id)
        } else {
            newFavorites = [...favorites, id]
        }
        setFavorites(newFavorites)
        await AsyncStorage.setItem('@app_favorites', JSON.stringify(newFavorites))
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}