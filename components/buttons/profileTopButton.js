import React from 'react';
import {Button, Image, StyleSheet, Text, View} from "react-native";
import {Link} from "react-router-native";
import profileStyles from "../../styles/ProfileStyles";

const ProfileTopButton = (props) => {
    return (
        <Link
            to={props.link}
            style={styles.butmes}
        >

            <Image style={styles.icon} source={props.image}></Image>

        </Link>


    );
};

let styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    butmes: {
        marginRight: '20%',
        width: 28,
        height: 28,
        backgroundColor: "#D9D9D9",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
        color: '#000000',
    },

    icon: {
        marginTop: '10%',
        width: 28,
        height: 28,
    }
})

export default ProfileTopButton;