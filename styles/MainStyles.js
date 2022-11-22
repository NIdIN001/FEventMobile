import {Dimensions, StyleSheet} from "react-native";

const mainStyles = StyleSheet.create({
    background: {
        backgroundColor: '#484854',
        flex: 1,
        justifyContent: "space-around",
        alignItems: 'center',
        flexDirection: 'column'
    },
    bottomTabs: {
        height: "15%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        right: 0
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

})

export default mainStyles;