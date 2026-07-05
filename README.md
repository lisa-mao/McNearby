# McNearby 🍔

McNearby is een React Native applicatie die alle McDonald's locaties in Rotterdam in kaart brengt. Gebruikers kunnen locaties bekijken in een lijst of op een interactieve kaart, locaties toevoegen aan hun favorieten en de interface aanpassen tussen Light en Dark mode.

##  Over het project
Dit project is ontwikkeld als onderdeel van een mobile development opdracht. De focus ligt op modulaire architectuur, herbruikbare componenten en het efficiënt beheren van globale state.

### Belangrijkste functionaliteiten:
* **Interactieve Kaart:** Navigeer direct van de lijst naar de locatie op de kaart.
* **Data uit de Cloud:** Hotspot-gegevens worden opgehaald via een externe JSON API.
* **Favorieten:** Markeer locaties als favoriet; deze worden lokaal opgeslagen via `AsyncStorage` en blijven behouden na een herstart.
* **Thema-instellingen:** Wissel tussen Light en Dark mode via het instellingenscherm. De layout-voorkeur wordt opgeslagen.
* **Locatie-integratie:** Toon de huidige locatie van de gebruiker in combinatie met de hotspots.

## Technische Stack
* **Framework:** React Native (Expo)
* **State Management:** React Context API
* **Persistente Opslag:** `@react-native-async-storage/async-storage`
* **Kaarten:** `react-native-maps`
* **Locatie:** `expo-location`

## Architectuur
De applicatie is opgedeeld in logische modules voor maximale herbruikbaarheid:
* `/components`: Herbruikbare UI-elementen zoals `LocationCard` en `MapComponent`.
* `/context`: Beheer van globale state (`ThemeContext`, `FavoritesContext`).
* `/screens`: Hoofdschermen van de app (`ListScreen`, `Homescreen`, `SettingsScreen`).
* `/styles`: Centraal stylesheet voor een consistente professionele uitstraling.

## Installatie
1. Clone deze repository:
   ```bash
   git clone [https://github.com/jouw-gebruikersnaam/mcnearby.git](https://github.com/jouw-gebruikersnaam/mcnearby.git)
