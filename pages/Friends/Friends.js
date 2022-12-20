import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {Link} from "react-router-native";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import ProfileTopButton from "../../components/buttons/profileTopButton";
import axios from "axios";
import Cookies from "js-cookie";
import BottomTabs from "../../components/BottomTabs";

function Form(props) {
    return null;
}

function Select(props) {
    return null;
}

const Friends = () => {
    const [fontsLoaded] = useFonts({
        'RubikMonoOne': require('../../assets/fonts/RubikMonoOne-Regular.ttf'),
    });

    const [friends, setFriends] = useState([])
    const [friendsFull, setFriendsFull] = useState([])
    // let listFriends = friends.map((fr) =>
    //     <Text style={styles.option} key={fr} value={fr} onClick={function (){}}>{fr}</Text>
    // )

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
        get();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }

    let accessToken = 'accessToken=' + Cookies.get("accessToken");
    let refreshToken = 'refreshToken=' + Cookies.get("refreshToken");
    let url = "http://localhost:8080/friends/CONFIRMED";

    async function get(){
        axios("http://192.168.0.103:8080/friends/CONFIRMED",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async response => {
            console.log(response.data["data"])
            response.data["data"].forEach(fr => {
                let a = friends
                let b = fr["from"]['login']
                a.push(fr["from"])
                setFriends(a)
                //document.getElementById("frrr").innerHTML += "<option style={styles.option1} id=b>" + b + "</option>"

            })
            console.log(friends)
        })
            .catch(error => console.log("error", error));
    }

    function setName(){
        console.log("setName")
        axios.get("http://192.168.0.103:8080/friends/CONFIRMED", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: {
                    accessToken,
                    refreshToken,
                }
            },

        }).then(async response => {

            let a = await response
            console.log(a)
            let b = []
            let c = []
            a.data.data.forEach(s => {
                b.push(s["from"]['login'])
                c.push(s["from"])
            })
            console.log(b)
            console.log(c)
            setFriends(b)
            setFriendsFull(c)
            console.log(friends)
        })
            .catch(error => console.log("error", error));
    }

    return (
        <View style={styles.background} onLayout={onLayoutRootView}>
            <Link to={'/main'} style={styles.back}>
                <Image style={styles.backarrow} source={require("../../assets/profile/backarrow.png")}></Image>
            </Link>
            <Pressable style={styles.header} onPress={setName}>
                <Text style={styles.header} onClick={function (){setName()}}>Друзья</Text>
            </Pressable>

            <View style={styles.btnadd}>
                <Link to={"/friends/add"} >
                    <Text>Добавление в друзья</Text>
                </Link>
            </View>
            {friendsFull?.map(fr => <Text style={styles.option1}>{fr.login}</Text>)}
            <BottomTabs/>
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
        //top: '3%',
        marginTop: '12%',
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
        marginTop: '10%',
       // top: '2%',
        marginLeft: '5%',
        width: 32,
        height: 32
    },

    backarrow: {

        marginLeft: '5%',
        width: 32,
        height: 32
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
        borderWidth: 1,
        marginBottom: '10%',
        width: '80%'
    },

    inblock: {
        marginTop: '10%',
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
        borderWidth: 1,
        marginBottom: '10%'
    },

    link1: {
        marginLeft: "5%",
        marginTop: '2%'
    },

    btnadd: {
        marginTop: '5%',
        backgroundColor: "#844E36",
        width: '45%',
        //top: '2%',
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
        paddingBottom: 5
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
        borderWidth: 1,
    },
    list: {
        width: 300,
        paddingTop: 20,
        margin: '0 auto'
    },


})

export default Friends;