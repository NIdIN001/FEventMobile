import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {Link} from "react-router-native";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import ProfileTopButton from "../../components/buttons/profileTopButton";
import axios from "axios";
import Cookies from "js-cookie";

const Friends = () => {
    const [fontsLoaded] = useFonts({
        'RubikMonoOne': require('../../assets/fonts/RubikMonoOne-Regular.ttf'),
    });

    const [friends, setFriends] = useState([])
    let listFriends;

    useEffect(() => {



        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }

        prepare();

    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }

    let accessToken = 'accessToken=' + Cookies.get("token");
    let refreshToken = 'refreshToken=' + Cookies.get("refresh");
    let url = "http://localhost:8080/friends/CONFIRMED";

    (async function get(){
        axios("http://localhost:8080/friends/CONFIRMED",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: {
                    accessToken,
                    refreshToken,
                }
            },
        }).then(async response => {
            console.log(response.data["data"])
            response.data["data"].forEach(fr => {
                let a = friends
                let b = fr["login"]
                a.push(fr["login"])
                setFriends(a)
                document.getElementById("frrr").innerHTML += "<option style={styles.option1}>" + b + "</option>"

            })
            listFriends = friends.map((fr) =>
                <option style={styles.option}>{fr}</option>
            );

            console.log(friends)
        })
            .catch(error => console.log("error", error));
    })();


    return (
        <View style={styles.background} onLayout={onLayoutRootView}>
            <Link to={'/main'} style={styles.back}>
                <Image style={styles.backarrow} source={require("../../assets/profile/backarrow.png")}></Image>
            </Link>
            <Text style={styles.header}>Друзья</Text>
            <View style={styles.btnadd}>
                <Link to={"/friends/add"} >
                    <p>Добавление в друзья</p>
                </Link>
            </View>
            <form style={styles.inblock}>
                <select style={styles.list} size="10" id="frrr">
                    {listFriends}
                </select>
            </form>
        </View>
    );
};

let styles = StyleSheet.create({
    background: {
        backgroundColor: '#484854',
        flex: 1,
        flexDirection: 'column'
    },

    flex: {
        flexDirection: "row"
    },

    header: {
        top: '3%',
        width: '100%',
        position: "absolute",
        fontFamily: "RubikMonoOne",
        fontSize: 16,
        color: "#D9D9D9",
        justifyContent: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
        textAlign: 'center'
    },

    back: {
        top: '2%',
        marginLeft: '5%',
        width: '32px',
        height: '32px'
    },

    backarrow: {

        marginLeft: '5%',
        width: '32px',
        height: '32px'
    },

    form: {
        padding: '10%',
        paddingTop: '30%',
        paddingLeft: '20%'
    },

    input: {
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 18,
        color: "#000000",
        fontWeight: "bold",
        padding: '2%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
        backgroundColor: "#D9D9D9",
        borderWidth: '1px',
        marginBottom: '10%',
        width: '80%'
    },

    inblock: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '5%',
        flexDirection: "row",
        justifyContent: "space-around"
    },

    button: {
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 18,
        color: "#000000",
        fontWeight: "bold",
        padding: '2%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2,
        backgroundColor: "#844E36",
        borderWidth: '1px',
        marginBottom: '10%'
    },

    link1: {
        marginLeft: "5%",
        marginTop: '2%'
    },

    btnadd: {
        backgroundColor: "#844E36",
        width: '45%',
        top: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        boxShadow: 4,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        justifyContent: "space-around",
        fontFamily: "Roboto",
        fontSize: 18,
        color: "#000000",
        paddingBottom: '5px'
    },

    option1: {
        boxSizing: 'border-box',
        paddingTop: '10%',
        paddingRight: '3%',
        paddingLeft: '3%',
        paddingBottom: '10%',
        fontSize: 30,
        fontFamily: "Roboto",
        backgroundColor: 'D9D9D9',
        borderWidth: '1px',
    },
    list: {
        width: '300px',
        paddingTop: '20px',
        margin: '0 auto'
    },


})

export default Friends;