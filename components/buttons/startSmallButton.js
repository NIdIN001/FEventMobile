import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {Link} from "react-router-native";

const StartSmallButton = (props) => {
    let stylesButt = props.styles;
    if (!stylesButt) {
        stylesButt = smallButtonStyles;
    }
    return (
        <View style={stylesButt.button}>
            <Link to={props.link}>
                <Image style={stylesButt.image}
                       source={props.image}/>
            </Link>
        </View>
    );
};

const smallButtonStyles = StyleSheet.create({
    button: {
        width: 37,
        height: 37,
        backgroundColor: '#86B3D2',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    }
})
export default StartSmallButton;