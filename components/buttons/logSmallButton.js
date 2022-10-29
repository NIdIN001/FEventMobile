import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {Link} from "react-router-native";

const StartSmallButton = (props) => {
    return (
        <View style={styles.button}>
            <Link to={props.link}>
                <Image style={styles.image}
                       source={props.image}/>
            </Link>
        </View>
    );
};


const styles = StyleSheet.create({
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