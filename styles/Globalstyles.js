import { StyleSheet } from "react-native";

export const globalstyles = StyleSheet.create({

    //list screen
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

    // homescreen / map
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
    mapTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
    },


})