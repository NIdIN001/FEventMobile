import React from 'react';
import {Image, View, StyleSheet} from "react-native";

const FilterButton = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/filter.png")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "82%",
        aspectRatio: 1.2,
    }
})

export default FilterButton;