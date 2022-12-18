import React from 'react';
import {Button, Image, StyleSheet, Text, View} from "react-native";
import {Link} from "react-router-native";
import profileStyles from "../../styles/ProfileStyles";

const ProfileSetButton = (props) => {
    return (
        <Link
            to={props.link}
            style={styles.next2block}
        >
                <View style={styles.flex}>
                    <View style={styles.flex}>
                        <Image style={styles.icon} source={props.image}></Image>
                        <View style={styles.place}>
                            <Text style={styles.h3}>{props.title1}</Text>
                            <Text style={styles.h4}>{props.title2}</Text>
                        </View>
                    </View>
                    <Image style={styles.icon} source={require("../../assets/profile/arrow.png")}></Image>
                </View>
        </Link>


    );
};

let styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    h3: {
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#000000",
        fontWeight: "bold",
        paddingTop: '10px',
        paddingLeft: '10px',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
    },

    h4: {
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 13,
        color: "#000000",
        paddingTop: '3px',
        paddingLeft: '10px',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
    },

    next2block: {
        backgroundColor: '#D9D9D9',
        height: '15%',
        width: '100%',
        borderWidth: '1px'
    },

    icon: {
        marginLeft: '10px',
        width: '32px',
        height: '32px',
        top: '33%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2
    },

    place: {
        width: '100%',
    }
})

export default ProfileSetButton;