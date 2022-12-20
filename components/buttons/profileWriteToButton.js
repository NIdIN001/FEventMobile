import React from 'react';
import {Button, Image, StyleSheet, Text, View} from "react-native";
import {Link} from "react-router-native";
import profileStyles from "../../styles/ProfileStyles";

const ProfileWriteToButton = (props) => {
    return (
        <Link
            to={props.link}
            style={styles.butmes}
        >
            <View style={styles.flex}>
                <Text style={styles.txt}>Написать в </Text>
                <Image style={styles.icon} source={props.image}></Image>
            </View>
        </Link>


    );
};

let styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    txt: {
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 13,
        color: "#000000",
        paddingTop: '4%',
        paddingLeft: '5%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
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

    icon: {

        width: 24,
        height: 24,
        marginTop: '3%'
    }
})

export default ProfileWriteToButton;