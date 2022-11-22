import React from 'react';
import {Image, Text, View} from "react-native";
import {StyleSheet} from "react-native";
import startStyles from "../styles/StartStyles";
import api from "js-cookie";

const BottomTabs = (props) => {
    return (
        <View style={styles.background}>
            <Image source={props.svg} />
            <Text>{props.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        width: "25%",
        height: "100%",
        backgroundColor: "#844E36",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#000000",
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {

    },
    text: {
        fontFamily: "Open Sans"
    }
})

export default BottomTabs;