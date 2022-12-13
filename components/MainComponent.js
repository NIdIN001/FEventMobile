import React, {useState} from 'react';
import {Switch, Text, View, StyleSheet, Image, Modal} from "react-native";
import CustomSwitch from "./CustomSwitch";
import EventList from "./EventList";
import AddEventButton from "./buttons/addEventButton";
import FilterButton from "./buttons/FilterButton";
import AddEvent from "./AddEvent";


const MainComponent = () => {
    const [view, setView] = useState(false)
    const [create, setCreate] = useState(false)
    const [filterDict, setFilterDict] = useState({})
    return (
        <View style={styles.mainComponent}>
            <Modal animationType={"slide"} visible={create}>
                <AddEvent callback={setCreate}/>
            </Modal>
            <View style={styles.topPanel}>
                <AddEventButton callback={setCreate}/>
                <CustomSwitch callback={setView}/>
                <FilterButton setFilter={setFilterDict}/>
            </View>
            {view ? <EventList filter={filterDict}/> : <Text>Карты пока нет :(</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    mainComponent: {
        height: "100%",
        width: "100%",
    },
    topPanel: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "rgba(72, 72, 84, 1)",
        height: "5%",
        marginTop: "10%",
        alignItems: "center",
        marginBottom: "10%",
        shadowRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOpacity: 0.25,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {width: 0, height: 4},
    }
})

export default MainComponent;