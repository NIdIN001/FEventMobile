import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {Link} from "react-router-native";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import ProfileTopButton from "../../components/buttons/profileTopButton";
import axios from "axios";
import Cookies from "js-cookie";
import {showMessage} from "react-native-flash-message";

function Form(props) {
    return null;
}

const ProfileEdit = () => {
    const [fontsLoaded] = useFonts({
        'RubikMonoOne': require('../../assets/fonts/RubikMonoOne-Regular.ttf'),
    });

    const [friends, setFriends] = useState([])
    const [addFr, setAddFr] = useState();
    let idUser = Cookies.get("id");
    let listFriends = friends.map((fr) =>
        <View style={styles.flex} key={fr['id']}>
            <Text>{fr['login']}</Text>
            <Image style={styles.icon} source={require("../../assets/gal.png")} onClick={function (){addFriend(fr['id'])}}></Image>
            <Image style={styles.icon} source={require("../../assets/krest.png")} onClick={function (){noAddFriend(fr['id'])}}></Image>
        </View>
    )

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

    function setName(){

        fetch("http://192.168.0.103:8080/friends/REQUEST", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: {
                    accessToken,
                    refreshToken,
                }
            },

        }).then(async response => {

            let a = await response.json()
            console.log(a)
            let b = []
            let c = []
            a['data'].forEach(s => {
                if(s['from']['id'] != idUser){
                    b.push(s["from"])
                }
            })
            setFriends(b)
            console.log(friends)
        })
            .catch(error => console.log("error", error));
    }


    function addFFriend(){
        console.log('add')
        console.log(addFr)
        axios("http://192.168.0.103:8080/friends/add",{
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
    }

    function addFriend(rr){
        console.log('add')
        console.log(rr)
        axios("http://192.168.0.103:8080/friends/accept",{
            method: "POST",
            data: {"friendId": rr},
            headers: {
                "Content-Type": "application/json",
                Cookie: {
                    accessToken,
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
    }

    function noAddFriend(){
        console.log('add')
        console.log(addFr)
        axios("http://192.168.0.103:8080/friends/delete/REQUEST",{
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
    }

    return (
        <View style={styles.background} onLayout={onLayoutRootView}>
            <Link to={'/friends'} style={styles.back}>
                <Image style={styles.backarrow} source={require("../../assets/profile/backarrow.png")}></Image>
            </Link>
            <Pressable style={styles.header} onPress={setName}>
                <Text style={styles.header} onClick={function (){setName()}}>Друзья</Text>
            </Pressable>
            <View style={styles.inblock}>
                <TextInput style={styles.input} placeholder={'Введите ID'} onChangeText={function(text) {setAddFr(text)}}></TextInput>
                <Pressable style={styles.link1} onPress={() => {addFFriend()}}><Text>Добавить</Text></Pressable>
            </View>
            <View style={styles.inblock}>
                <View style={styles.list} id="frrr">
                    {friends?.map((fr) =>
                        <View style={styles.flex} key={fr['id']}>
                            <Text>{fr['login']}</Text>
                            <Pressable style={styles.icon} onPress={() => addFriend(fr['id'])}>
                                <Image style={styles.icon} source={require("../../assets/gal.png")} onClick={function (){addFriend(fr['id'])}}></Image>

                            </Pressable>
                            <Pressable style={styles.icon} onPress={() => noAddFriend(fr['id'])}>
                                <Image style={styles.icon} source={require("../../assets/krest.png")} onClick={function (){noAddFriend(fr['id'])}}></Image>
                            </Pressable>
                        </View>)}
                </View>
            </View>
        </View>
    );
};

let styles = StyleSheet.create({
    background: {
        //paddingTop: '40%',
        backgroundColor: '#484854',
        flex: 1,
        flexDirection: 'column'
    },

    flex: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    icon: {
        marginLeft: 10,
        width: 32,
        height: 32,
//        top: '33%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 2
    },

    header: {
        //top: '3%',
        marginTop: '13%',
        marginLeft:'1%',
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
        //top: '2%',
        marginTop: '10%',
        marginLeft: '5%',
        width: 32,
        height: 32
    },

    backarrow: {

        marginLeft: '5%',
        width: 32,
        height: 32
    },

    list: {
        width: 300,
        paddingTop: 20,
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
        borderWidth: 1,
        marginBottom: '10%'
    }


})

export default ProfileEdit;