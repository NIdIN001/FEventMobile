import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, Modal, TouchableHighlight} from "react-native";
import EventModal from "./EventModal";

const EventItem = (props) => {
    //const [ageConstrains, setAgeConstrains] = useState('')
    const [displayFullInfo, setDisplayFullInfo] = useState(false)
    let ageConstrains = ''
    if (props.event.ageMin !== undefined || props.event.ageMax !== undefined) {
        ageConstrains = 'Для людей'
        if (props.event.ageMin !== undefined) {
            ageConstrains = ageConstrains + ' с ' + props.event.ageMin
        }
        if (props.event.ageMax !== undefined) {
            ageConstrains = ageConstrains + ' до ' + props.event.ageMax
        }
        ageConstrains = ageConstrains + ' лет'
    }
    return (
        <TouchableHighlight onPress={() => setDisplayFullInfo(true)}>

        <View style={styles.container}>
            <Modal hasBackdrop={false} animationType={'fade'} visible={displayFullInfo}
                   onRequestClose={() => { setDisplayFullInfo(false); } }>
                <EventModal event={props.event} callback={setDisplayFullInfo}/>
            </Modal>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", height: "100%"}}>
                {/*<TouchableHighlight style={styles.imageContainer}
                                    onPress={() => setDisplayFullInfo(true)}>*/}
                    <Image style={styles.image} source={props.image}/>
                {/*</TouchableHighlight>*/}
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.nameText}>{props.event.name}</Text>
                <View style={styles.descriptionContainer}>
                    <View style={styles.pairDataContainer}>
                        <Text style={styles.dataText}>Начало: {props.event.datetimeStart}</Text>
                    </View>
                    {/*<View style={styles.pairDataContainer}>
                        <Text style={styles.dataText}>Конец: {props.event.datetimeEnd}</Text>
                    </View>*/}
{/*                    {
                        ageConstrains !== '' ?
                        <View style={styles.pairDataContainer}>
                            <Text style={styles.descriptionText}>{ageConstrains}</Text>
                        </View> : <></>
                    }*/}

                    {/*<View style={styles.pairDataContainer}>
                        <Text style={styles.descriptionText}>{props.event.maxMembers === undefined? "" : "До " + props.event.maxMembers + " участников"}</Text>
                    </View>*/}
                    <View style={styles.pairDataContainer}>
                        <Text style={styles.descriptionText}>{props.event.isOnline ? "Онлайн" : "Оффлайн"}</Text>
                        {/*<Text style={styles.descriptionText}>{props.event.isPrivate ? "Доступно для друзей" : "Доступно для всех"}</Text>*/}
                    </View>
                    <View style={styles.pairDataContainer}>
                        <Text style={styles.descriptionText}>Участники: {props.event.membersCount} из {props.event.maxMembers}</Text>
                    </View>
                </View>
            </View>
        </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        aspectRatio: 5/2,
        width: "100%",
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
    imageContainer: {
        width: "65%",
        height: "110%"
    },
    image: {
        position: "relative",
        width: "42%",
        height: "42%",
        marginLeft: "-4%",
        marginTop: "32%"
    },
    bottomContainer: {
        //marginTop: "-50%",
        //backgroundColor: "#123456"
        display:"flex",
        flexDirection: "column",
        //flexWrap:"wrap",
        marginTop: "6%"
    },
    descriptionContainer: {
        display:"flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "65%",
        marginLeft: "5%",
        marginRight: "5%"
    },
    pairDataContainer: {
        height: "60%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    nameText: {
        fontFamily: "Roboto",
        color: "#000000",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "5%"
    },
    descriptionText: {
     //   display:"flex",
     //   flexDirection: "column",
        height: "40%",
        overflow: "hidden",
        textAlign: "left"
    },
    dataText: {
        height: "40%",
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