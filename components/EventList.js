import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, StatusBar} from "react-native";
import EventItem from "./EventItem";

const EventList = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <View style={styles.list}>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                    <EventItem image={require("../assets/icon.png")}/>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        height: "100%",
        width: "100%",
        flexWrap: 'wrap',
        alignItems: "flex-start",
        flexDirection: 'row',
        justifyContent: "space-around",
        flexGrow: 1
    },
    scrollview: {
        marginHorizontal: 10,
        marginBottom: "62%"
    },
    container: {
    },
})
export default EventList;