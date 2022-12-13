import React, {useState} from 'react';
import {Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import Cookies from "js-cookie";
import {showMessage} from "react-native-flash-message";

const EventModal = (props) => {
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
    const [curEvent, setCurEvent] = useState(props.event)
    console.log(props.event)

    let joinEventFunction = async () => {
        console.log('http://192.168.0.103:8080/user/join/'+curEvent.id);
        axios('http://192.168.0.103:8080/user/join/'+curEvent.id, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res)
            if (res.data.errorStatus === "OK") {
                showMessage({
                    message: "Присоединение к событию произошло успешно!",
                    type: "success",
                });
                props.callback(false)
            }
            else {
                showMessage({
                    message: res.data.errorMessage,
                    type: "danger",
                });
            }
        })
            .catch(err => {
                console.log(err)
                Alert.alert(
                    "Ошибка при создании события",
                    "Технические шоколадки! Проверьте доступ к интернету.")
            })

    }

    return (
        <ScrollView style={styles.scrollview}>
            {(curEvent === null || curEvent === undefined) ?
            null
            :
            <View style={styles.container}>
                <View style={styles.fieldContainer}>
                    <Image style={styles.image} source={require("../assets/icon.png")}/>
                </View>
                {/*<View style={{flex: 0.3}}>*/}
                <View style={styles.fieldContainer}>
                    <Text style={styles.nameText}>{props.event.name}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.descriptionText}>{props.event.description}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.dataText}>Начало: {props.event.datetimeStart}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.dataText}>Конец: {props.event.datetimeEnd}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.dataText}>Категория: {props.event.category}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.descriptionText}>{props.event.isOnline ? "Онлайн" : "Оффлайн"}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.descriptionText}>{props.event.maxMembers === undefined? "" : "До " + props.event.maxMembers + " участников"}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.descriptionText}>{props.event.isPrivate ? "Доступно для друзей" : "Доступно для всех"}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    {
                        ageConstrains !== '' ?
                            <Text style={styles.descriptionText}>{ageConstrains}</Text> : <></>
                    }
                </View>
                {/*</View>*/}
                <View style={styles.fieldContainer}>
                    <Pressable style={styles.button} onPress={joinEventFunction}>
                        <Text style={styles.buttonText}>+</Text>
                    </Pressable>
                </View>
            </View>
            }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(72, 72, 84, 1)",
        borderColor: "#FFFFFF",
        borderRadius: 4,
        paddingHorizontal: "20%",
        paddingVertical: "100%",
        marginTop:"-40%",
        //marginBottom: "-50%",
        display:"flex",
        justifyContent: "space-between",
        alignItems:"center",
        //flexGrow: 1,
    },
    fieldContainer: {
        width: "100%",
        maxHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    // description: {
    //     fontFamily: "OpenSans",
    //     textAlign: "left",
    //     fontSize: 14,
    //     color: "#844E36"
    // },
    cross: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    crossContainer: {
        height: '6%',
        aspectRatio: 1,
        resizeMode: "contain",
        left: 0,
    },
    scrollview: {
        backgroundColor: "rgba(72, 72, 84, 1)",
        height: "100%",
        //flex: 1,
        //flexGrow: 1,
        //marginBottom: "-50%",
    },
    image: {
        position: "relative",
        width: 200,
        height: 200,
        // marginLeft: "-40%",
        marginTop: "-66%"
    },
    nameText: {
        fontFamily: "Roboto",
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "5%"
    },
    descriptionText: {
        //flexGrow: 1,
        textAlign: "left",
        color: "#FFFFFF",
    },
    dataText: {
        height: "40%",
        color: "#FFFFFF",
    },
    // verticalTextContainer: {
    //     display: "flex",
    //     flexDirection: "column"
    // },
    text: {
        fontFamily: "Roboto",
        color: "rgba(132, 78, 54, 1)"
    },
    button: {
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "rgb(49,49,49)",
        backgroundColor: "rgb(211,152,175)",
        height: 100,
        width: 100,
        marginTop: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText:{
        color: "#ffffff",
        fontFamily: "Roboto",
        fontSize: 17,
    },
    title: {
        fontFamily: "Roboto",
        color: "rgba(132, 78, 54, 1)",
        fontSize: 30,
    },
})

export default EventModal;
