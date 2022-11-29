import React, {useCallback, useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";
import regStyles from "../styles/RegisterStyles";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LogInButton from "../components/buttons/logInButton";
import startStyles from "../styles/StartStyles";
import StartSmallButton from "../components/buttons/startSmallButton";
const testServer = `${process.env.REACT_APP_BASE_BACK_URL}`;
import {useNavigate} from "react-router-native";
import axios from "axios";

import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import Cookies from "js-cookie";

const LogInScreen = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")


    let registerFunction = async (data) => {
        console.log(data)
        if (login !== "" && password !== "") {
            axios(`http://192.168.56.1:8080/user/register`, {
                method: 'post',
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => {
                console.log(res)
                if (res.data.errorStatus === "OK") {
                    console.log("OK")
                    showMessage({
                        message: "Регистрация прошла успешно!",
                        type: "success",
                    });
                    navigate("/")
                }
                else {
                    showMessage({
                        message: res.data.errorMessage,
                        type: "danger",
                    });
                }
            })
            .catch(err => {
                Alert.alert(
                    "Ошибка при регистрации",
                    "Технические шоколадки! Проверьте доступ к интернету.")
            })
        }
    }

    return (
        <View style={regStyles.background}>
            <Text style={regStyles.header}>FEvent</Text>
            <View style={regStyles.viewLogo}>
                <Image style={regStyles.logo} source = {require('../assets/icon.png')} />
            </View>
            <View style={regStyles.fields}>

                <TextInput autoComplete={"email"}
                           placeholder={"Почта"}
                           editable={true}
                           style={regStyles.textInput}
                           onChangeText={(value) => setEmail(value)}/>

                <TextInput autoComplete={"username"}
                           placeholder={"Логин"}
                           editable={true}
                           style={regStyles.textInput}
                           onChangeText={(value) => setLogin(value)}/>

                <TextInput autoComplete={"password-new"}
                           placeholder={"Пароль"}
                           editable={true}
                           style={regStyles.textInput}
                           onChangeText={(value) => setPassword(value)}/>
                <TextInput autoComplete={"password-new"}
                           placeholder={"Повторите пароль"}
                           editable={true}
                           style={regStyles.textInput}
                           onChangeText={(value) => setPasswordCheck(value)}/>
                <TextInput autoComplete={"name-given"}
                           placeholder={"Имя"}
                           editable={true}
                           style={regStyles.textInput}
                           onChangeText={(value) => setFirstName(value)}/>

                <TextInput autoComplete={"name-family"}
                           placeholder={"Фамилия"}
                           editable={true}
                           style={regStyles.textInput}
                           onChangeText={(value) => setLastName(value)}/>

                <TextInput autoComplete={"tel"}
                           placeholder={"Номер телефона (88002003040)"}
                           editable={true}
                           style={regStyles.textInput}
                           onChangeText={(value) => setPhone(value)}/>


                <TouchableHighlight style={regStyles.button}
                                    onPress={() => {
                                        registerFunction({"email": email,
                                            "login": login,
                                            "password": password,
                                            "passwordCheck": passwordCheck,
                                            "firstName": firstName,
                                            "lastName": lastName,
                                            "phoneNumber": phone})}
                                    }>
                    <Text style={regStyles.text}>Регистрация</Text>
                </TouchableHighlight  >
                <View style={regStyles.socialNetworks}>
                    <StartSmallButton styles={smallButtonStyles} link={"/log-in"} image={require("../assets/google.png")}/>
                    <StartSmallButton styles={smallButtonStyles} link={"/log-in"} image={require("../assets/google.png")}/>
                    <StartSmallButton styles={smallButtonStyles} link={"/log-in"} image={require("../assets/google.png")}/>
                    <StartSmallButton styles={smallButtonStyles} link={"/log-in"} image={require("../assets/google.png")}/>
                </View>
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