import {StyleSheet} from "react-native";

const profileStyles = StyleSheet.create({
    topblock: {
        backgroundColor: '#844E36',
        height: '28%',
        width: '100%',
        //marginTop:0,
        //position: 'absolute', //
    },

    avatar: {
        marginTop: '2%',
        marginLeft: '6%',
        width: 64,
        height: 64,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2

    },

    icon: {
        marginLeft: '5%',
        width: 32,
        height: 32,
        //top: '25%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2
    },

    nameblock: {
        paddingLeft: '6%',
        fontFamily: "OpenSans",
        fontSize: 11,
        color: "#D9D9D9",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2
    },

    name: {
        paddingTop: '30%',
        fontFamily: "Roboto",
        fontSize: 13,
        color: "#D9D9D9",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
        fontWeight: 'bold'
    },

    flex: {
        display:'flex', ///
        flexDirection: "row",
        justifyContent: "space-between"
    },

    flexleft: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },

    flex1: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },

    flex2: {
        display:"flex",
        marginTop: '6%',
        paddingRight: '6%',
        flexDirection: "row",
        justifyContent: "space-around"
    },

    butmes: {

        width: 125,
        height: 24,
        backgroundColor: "#D9D9D9",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
        fontFamily: "Roboto",
        fontSize: 12,
        textAlign: "center",
        color: '#000000',
    },

    header: {
        paddingTop: '6%',
        paddingLeft: '6%',
        paddingRight: '6%',
        fontFamily: "RubikMonoOne",
        fontSize: 13,
        color: "#D9D9D9",
       //display: 'flex', //
        justifyContent: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,


    },

    nextblock: {
        backgroundColor: '#D9D9D9',
        height: '60%',
        width: '100%',
        //top: '28%',
        //position: 'absolute', ///
        borderWidth: 1,
        flexDirection: 'column'
    },

    next1block: {
        backgroundColor: '#D9D9D9',
        height: '40%',
        width: '100%',
        borderWidth: 1
    },

    h2: {
        textAlign: "center",
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#000000",
        fontWeight: "bold",
        paddingTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
    },

    h3: {
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#000000",
        fontWeight: "bold",
        paddingTop: 10,
        paddingLeft: '5%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
    },

    h4: {
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 13,
        color: "#000000",
        fontWeight: "bold",
        paddingTop: 6,
        paddingLeft: '5%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
    },

    next2block: {
        backgroundColor: '#D9D9D9',
        height: '15%',
        width: '100%',
        borderWidth: 1
    },
})

export default profileStyles;