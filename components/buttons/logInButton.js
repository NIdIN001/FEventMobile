import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import {Link} from "react-router-native";

const LogInButton = (props) => {
    return (
        <Link
            to={props.link}
            style={styles.link}
        >
            <View style={styles.button}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </Link>
    );
};

let styles = StyleSheet.create({
    link: {
        width: "80%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "#86B3D2",
        boxShadow: 4,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        width: '80%',
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

export default LogInButton;