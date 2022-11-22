import {StyleSheet} from "react-native";

const regStyles = StyleSheet.create({
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
        height: '25%',
    },
    logo: {
        height: '100%',
        resizeMode: "contain"
    },
    fields: {
        width: '100%',
        height: '58%',
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    socialNetworks: {
        width: '64%',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textInput: {
        width: "64%",
        fontFamily: "Roboto",
        fontSize: 20,
        color: "#ACACAC",
        backgroundColor: "#D9D9D9",
        lineHeight: 25,
        letterSpacing: 0,
        textAlign: "center",
        borderRadius: 10,
        padding: 6
    },
    forgot: {
        fontFamily: 'RubikMonoOne',
        fontStyle: "normal",
        fontSize: 12,
        lineHeight: 15,

        color: "#D9D9D9",

        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 4},
        textShadowRadius: 4
    },
    button: {
        backgroundColor: "#86B3D2",
        boxShadow: 4,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        width: '64%',
        alignItems: "center",
        padding: 6
    },
    text: {
        fontFamily: 'RubikMonoOne',
        fontSize: 20,
        lineHeight: 25,
        color: '#FFFFFF',
    }
})

export default regStyles;