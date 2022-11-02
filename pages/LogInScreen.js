import React, {useCallback, useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from "react-native";
import logStyles from "../styles/LogStyles";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import StartSmallButton from "../components/buttons/startSmallButton";
const testServer = `${process.env.REACT_APP_BASE_BACK_URL}`;
import axios from "axios";
import Cookies from "js-cookie";
import {showMessage} from "react-native-flash-message";
import {useNavigate} from "react-router-native";

const LogInScreen = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")

    let navigate = useNavigate();

    let logInFunction = async (data) => {
        if (login !== "" && password !== "") {
            console.log(`http://localhost:8080/authenticate/login`);
            axios(`http://localhost:8080/authenticate/login`, {
                method: 'post',
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => {
                console.log(res)
                if (res.data.errorStatus === "OK") {
                    Cookies.set("token", res.data.data.jwtPair.accessToken);
                    Cookies.set("refresh", res.data.data.jwtPair.refreshToken);
                    console.log( 'cookieeee')
                    console.log( Cookies.get("token"))
                    showMessage({
                        message: "Авторизация прошла успешно!",
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
                    "Ошибка при регистрации",
                    "Технические шоколадки! Проверьте доступ к интернету.")
            })
        }
    }

    return (
        <View style={logStyles.background}>
            <Text style={logStyles.header}>FEvent</Text>
            <View style={logStyles.viewLogo}>
                <Image style={logStyles.logo} source = {require('../assets/icon.png')} />
            </View>
            <View style={logStyles.fields}>
                <TextInput autoComplete={"username"}
                           placeholder={"Логин"}
                           editable={true}
                           style={logStyles.textInput}
                           onChangeText={(value) => setLogin(value)}/>

                <TextInput autoComplete={"password"}
                           placeholder={"Пароль"}
                           editable={true}
                           style={logStyles.textInput}
                           onChangeText={(value) => setPassword(value)}/>
                <TouchableHighlight style={logStyles.button}
                                    onPress={() => {logInFunction({"login": login, "password": password})}}>
                    <Text style={logStyles.text} >Войти</Text>
                </TouchableHighlight>
                <View style={logStyles.socialNetworks}>
                    <StartSmallButton styles={smallButtonStyles} link={"/log-in"} image={require("../assets/google.png")}/>
                    <StartSmallButton styles={smallButtonStyles} link={"/log-in"} image={require("../assets/google.png")}/>
                    <StartSmallButton styles={smallButtonStyles} link={"/log-in"} image={require("../assets/google.png")}/>
                    <StartSmallButton styles={smallButtonStyles} link={"/log-in"} image={require("../assets/google.png")}/>
                </View>
                <Text style={logStyles.forgot}>Забыли пароль?</Text>
            </View>
        </View>
    );
};

const smallButtonStyles = StyleSheet.create({
    button: {
        width: 37,
        height: 37,
        backgroundColor: '#D9D9D9',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    }
})

export default LogInScreen;