import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, Image, StyleSheet, Text, View} from "react-native";
import {Link} from "react-router-native";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';
import startStyles from "../../styles/StartStyles";
import profileStyles from "../../styles/ProfileStyles";
import StartSmallButton from "../../components/buttons/startSmallButton";
import ProfileSetButton from "../../components/buttons/profileSetButton";
import ProfileWriteToButton from "../../components/buttons/profileWriteToButton";
import ProfileTopButton from "../../components/buttons/profileTopButton";
import axios from "axios";
import {showMessage} from "react-native-flash-message";
import Cookies from "js-cookie";
import { Storage } from 'expo-storage'
import BottomTabs from "../../components/BottomTabs";


const Profile = () => {
    const [login, setLogin] = useState("login");
    const [city, setCity] = useState("city");
    const [user, setUser] = useState([]);



    const [fontsLoaded] = useFonts({
        //'RubikMonoOne': require('../../assets/fonts/RubikMonoOne-Regular.ttf'),
        //'OpenSans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    });

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

    /*let accessToken = 'accessToken=' + Cookies.get("token");
    let refreshToken = 'refreshToken=' + Cookies.get("refresh");*/

    let url = "";
    axios.get('http://192.168.0.103:8080/user/profile-info', {
        "Content-Type": "application/json",
        "Token": Cookies.get("token")
    }).then(async res => {
        console.log(res)
        if (res.data.errorStatus === "OK") {
            console.log("OK")
            console.log(res.data.data);
            setLogin(res.data.data.login);
            setCity(res.data.data.city);
            Cookies.set("user", JSON.stringify(res.data.data))
            await Storage.setItem({
                key: `user`,
                value: JSON.stringify(res.data.data)
            })
            //localStorage.user =  JSON.stringify(res.data.data);
            //
            console.log(Cookies.get("user"))
            const item = JSON.parse(
                await Storage.getItem({key: `user`})
            )
            console.log("item: " + item)

            showMessage({
                message: "Успешный заход в профиль!",
                type: "success",
            });
        } else {
            console.log(res)
            showMessage({
                message: res.data,
                type: "danger",
            });
        }
    })
        .catch(err => {
            console.error(err.name)
            console.error(err.stack)
            console.error(err.message)
            Alert.alert(
                err.message,
                "Технические шоколадки! Проверьте доступ к интернету.")
        });

return (
        <View style={startStyles.background}>
            {/*<Text>asf</Text>*/}
            {/*<Text>hg</Text>*/}
            {/*<Text>gh</Text>*/}
            <View style={profileStyles.topblock}>
                <View style={profileStyles.flex}>
                    <Text style={profileStyles.header}>ПРОФИЛЬ</Text>
                    <View style={profileStyles.flex2}>
                        <ProfileTopButton link={"/profile/edit"} image={require("../../assets/profile/edit.png")}>
                        </ProfileTopButton>
                        <ProfileTopButton link={"/profile/share"} image={require("../../assets/profile/share.png")}>
                        </ProfileTopButton>

                    </View>
                </View>
                <View style={profileStyles.flexleft}>
                    <Image style={profileStyles.avatar} source={require("../../assets/logo.png")}></Image>
                    <View style={profileStyles.nameblock}>
                        <Text style={profileStyles.name}>{login}</Text>
                        <Text style={profileStyles.name}>Рейтинг</Text>
                    </View>
                </View>
                <View style={profileStyles.flex1}>
                    <ProfileWriteToButton link={"/profile/whatsapp"} image={require("../../assets/profile/whatsapp.png")}>
                    </ProfileWriteToButton>
                    <ProfileWriteToButton link={"/profile/telegram"} image={require("../../assets/profile/telegram.png")}>
                    </ProfileWriteToButton>
                </View>

            </View>

            <View style={profileStyles.nextblock}>
                <View style={profileStyles.next1block}>
                    <Text style={profileStyles.h2}>Витрина достижений</Text>
                </View>

                <ProfileSetButton link={"/profile/history"} image={require("../../assets/profile/history.png")}
                                  title1={'История'} title2={'Посмотреть посещенные ивенты'}/>

                <ProfileSetButton link={"/profile/place"} image={require("../../assets/profile/place.png")}
                                  title1={city} title2={'Выбрать город'}/>

                <ProfileSetButton link={"/profile/settings"} image={require("../../assets/profile/settings.png")}
                                  title1={'Настройки'} title2={'Изменить настройки приложения'}/>

                <ProfileSetButton link={"/profile/help"} image={require("../../assets/profile/help.png")}
                                  title1={'Помощь'} title2={'Связаться с нами'}/>
            </View>
        <BottomTabs/>
        </View>
    );
};

export default Profile;