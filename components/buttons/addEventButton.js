import React from 'react';
import {View, StyleSheet, Image} from "react-native";

const AddEventButton = (props) => {
    return (
        <View style={styles.container} onTouchEnd={()=> {props.callback(true)}}>
            <Image style={styles.plus} source={require("../../assets/plus.png")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D9D9D9",
        height: "82%",
        aspectRatio: 1.2,
        padding: "2%"
    },
    plus: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    }
})

export default AddEventButton;