import React, {useState} from 'react';
import {Image, View, StyleSheet, TouchableOpacity, TouchableHighlight, Modal} from "react-native";
import FilterModal from "../FilterModal";

const FilterButton = (props) => {
    const [displayFilter, setDisplayFilter] = useState(false)
    return (
        <TouchableHighlight onPress={() => setDisplayFilter(true)}>
            <View style={styles.container}>
                <Modal hasBackdrop={false} animationType={'fade'} visible={displayFilter}
                       onRequestClose={() => { setDisplayFilter(false)} }>
                    <FilterModal setEvents={props.setEvents} setFilter={props.setFilter}/>
                </Modal>
                <Image source={require("../../assets/filter.png")}/>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "82%",
        aspectRatio: 1.2,
    }
})

export default FilterButton;