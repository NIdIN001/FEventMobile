import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from "react-native";
import {Link} from "react-router-native";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import ProfileTopButton from "../../components/buttons/profileTopButton";
import axios from "axios";
import Cookies from "js-cookie";
import {showMessage} from "react-native-flash-message";

const ProfileEdit = () => {
    const [fontsLoaded] = useFonts({
        'RubikMonoOne': require('../../assets/fonts/RubikMonoOne-Regular.ttf'),
    });

    const [friends, setFriends] = useState([])
    const [addFr, setAddFr] = useState();


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
    let url = "http://localhost:8080/friends/REQUEST";

    let listFriends;
    (async function get(){
        axios(url,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: {
                    accessToken,
                    refreshToken,
                }
            },
        }).then(async response => {
            console.log(213123123)
            console.log(friends)
            console.log(response)
            listFriends = [];
            document.getElementById("frrr").innerHTML = ''

            console.log(response.data["data"])
            response.data["data"].forEach(fr => {
                let a = friends
                let b = fr["login"]
                a.push(fr["login"])
                setFriends(a)
                document.getElementById("frrr").innerHTML += "<option style={styles.option} id=b>" + b + "</option>"
            })

            console.log(friends)
        })
            .catch(error => console.log("error", error));

        listFriends = friends.map((fr) =>
            <option style={styles.option}>{fr}</option>
        )
    })();



    function addFriend(){
        console.log('add')
        console.log(addFr)
        axios("http://localhost:8080/friends/add",{
            method: "POST",
            data: {"friendId": addFr},
            headers: {
                "Content-Type": "application/json",
                Cookie: {
                    accessToken,
                    refreshToken,
                }
            },
        }).then(res => {
            console.log(res)
            if (res.data.errorStatus === "OK") {
                showMessage({
                    message: "Заявка отправлена!",
                    type: "success",
                });
            }
            else {
                showMessage({
                    message: res.data.errorMessage,
                    type: "danger",
                });
            }
        })
            .catch(error => console.log("error", error));
        console.log(name)
    }

    return (
        <View style={styles.background} onLayout={onLayoutRootView}>
            <Link to={'/friends'} style={styles.back}>
                <Image style={styles.backarrow} source={require("../../assets/profile/backarrow.png")}></Image>
            </Link>
            <Text style={styles.header}>Добавление в друзья</Text>
            <View style={styles.inblock}>
                <TextInput style={styles.input} placeholder={'Введите ID'} onChangeText={function(text) {setAddFr(text)}}></TextInput>
                <button style={styles.link1} onClick={function() {addFriend()}}>Добавить</button>
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

    list: {
        width: '300px',
        paddingTop: '20px',
        margin: '0 auto'
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
        marginTop: '2%',
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
    }


})

export default ProfileEdit;