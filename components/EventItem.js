import React from 'react';
import {View, StyleSheet, Image, Text} from "react-native";

const EventItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", height: "100%"}}>
                <Image style={styles.image} source={props.image}/>
                {/*<View style={styles.verticalTextContainer}>*/}
                {/*    <Text>a</Text>*/}
                {/*    <Text>a</Text>*/}
                {/*    <Text>a</Text>*/}
                {/*    <Text>a</Text>*/}
                {/*</View>*/}
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.nameText}>props.name</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>props.descriptionprops.descriptionprops.descriptionprops.descriptionprops.descriptionprops.descriptionprops.descriptionprops.description</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1,
        width: "40%",
        backgroundColor: "#D9D9D9",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderWidth: 1,
        marginBottom: "5%"
    },
    image: {
        position: "relative",
        width: "40%",
        height: "40%",
        marginLeft: "-4%",
        marginTop: "6%"
    },
    bottomContainer: {
        marginTop: "-40%",
        //backgroundColor: "#123456"
    },
    descriptionContainer: {
        height: "65%",
        marginLeft: "5%",
        marginRight: "5%"
    },
    nameText: {
        fontFamily: "Roboto",
        color: "#000000",
        textAlign: "center",
        fontWeight: "bold"
    },
    descriptionText: {
        height: "40%",
        overflow: "hidden",
        textAlign: "left"
    },
    verticalTextContainer: {
        display: "flex",
        flexDirection: "column"
    },
    text: {
        fontFamily: "Roboto",
        color: "rgba(132, 78, 54, 1)"
    }
})

export default EventItem;