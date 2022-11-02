import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {Link, useNavigate} from "react-router-native";
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
import Cookies from "js-cookie";
import {showMessage} from "react-native-flash-message";
import logStyles from "../../styles/LogStyles";

const ProfileEdit = () => {
    const [fontsLoaded] = useFonts({
        'RubikMonoOne': require('../../assets/fonts/RubikMonoOne-Regular.ttf'),
    });
    let navigate = useNavigate();

    const user = JSON.parse(localStorage.user);

    const [login, setLogin] = useState(user.login);
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastName);
    const [city, setCity] = useState(user.city);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

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
    let editProfile = async (data) => {
        if (login !== "") {
            axios(`http://localhost:8080/user/change-profile-info`, {
                method: 'put',
                data: data,
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
                        message: "Изменение прошло успешно!",
                        type: "success",
                    });
                    navigate("/profile")
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
                        "Ошибка при изменении профиля",
                        "Технические шоколадки! Проверьте доступ к интернету.")
                })
        }
    }

    return (
        <View style={styles.background} onLayout={onLayoutRootView}>
            <Link to={'/profile'} style={styles.back}>
                <Image style={styles.backarrow} source={require("../../assets/profile/backarrow.png")}></Image>
            </Link>
            <Text style={styles.header}>ИЗМЕНЕНИЕ ПРОФИЛЯ</Text>

            <form style={styles.form}>
                <TextInput style={styles.input} placeholder={login ? login : 'Логин'} onChangeText={function(text) {setLogin(text)}}></TextInput>
                <TextInput style={styles.input} placeholder={firstName ? firstName : 'Имя'} onChangeText={function(text) {setFirstName(text)}}></TextInput>
                <TextInput style={styles.input} placeholder={lastName ? lastName : 'Фамилия'} onChangeText={function(text) {setLastName(text)}}></TextInput>
                <TextInput style={styles.input} placeholder={city ? city : 'Город'} onChangeText={function(text) {setCity(text)}}></TextInput>
                <TextInput style={styles.input} placeholder={phoneNumber ? phoneNumber : 'Номер'} onChangeText={function(text) {setPhoneNumber(text)}}></TextInput>

                <TouchableHighlight style={logStyles.button}
                                    onPress={() => {editProfile({"login": login,
                                        "firstName": firstName,
                                        "lastName": lastName,
                                        "city": city,
                                        "phoneNumber": phoneNumber})}}>
                    <Text style={logStyles.text} >Сохранить</Text>
                </TouchableHighlight>
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
        marginBottom: '10%'
    },

    inblock: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '5%',

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
    }


})

export default ProfileEdit;