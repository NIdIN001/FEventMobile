import {StyleSheet} from "react-native";

const startStyles = StyleSheet.create({
    header: {
        paddingTop: 20,
        fontFamily: "RubikMonoOne",
        fontSize: 60,
        color: "#844E36",
        display: 'flex',
        justifyContent: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 4},
        textShadowRadius: 4

    },
    background: {
        backgroundColor: '#484854',
        flex: 1,
        justifyContent: "space-around",
        alignItems: 'center',
        flexDirection: 'column'
    },
    viewLogo: {
        height: '35%',
    },
    logo: {
        height: '100%',
        resizeMode: "contain"
    },
    fields: {
        width: '100%',
        height: '18%',
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    socialNetworks: {
        width: '64%',
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default startStyles;