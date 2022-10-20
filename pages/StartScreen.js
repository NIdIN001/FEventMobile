import React, {useCallback, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {Link} from "react-router-native";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';
import startStyles from "../styles/StartStyles";
import LogInButton from "../components/buttons/logInButton";
import StartSmallButton from "../components/buttons/startSmallButton";
import StartBottomButton from "../components/buttons/startBottomButton";

const StartScreen = () => {
    const [fontsLoaded] = useFonts({
        'RubikMonoOne': require('../assets/fonts/RubikMonoOne-Regular.ttf'),
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
    return (
        <View style={startStyles.background} onLayout={onLayoutRootView}>
            <Text style={startStyles.header}>FEvent</Text>
            <Text>{fontsLoaded}</Text>
            <View style={startStyles.viewLogo}>
                <Image style={startStyles.logo} source = {require('../assets/icon.png')} />
            </View>
            <View style={startStyles.fields}>
                <LogInButton title={"Войти"} link={"/log-in"}/>
                <View style={startStyles.socialNetworks}>
                    <StartSmallButton link={"/log-in"} image={require("../assets/google.png")}/>
                    <StartSmallButton link={"/log-in"} image={require("../assets/google.png")}/>
                    <StartSmallButton link={"/log-in"} image={require("../assets/google.png")}/>
                    <StartSmallButton link={"/log-in"} image={require("../assets/google.png")}/>
                </View>
                <LogInButton title={"Регистрация"} link={"/register"}/>
            </View>
            <StartBottomButton title={"Войти без регистрации"}/>
        </View>
    );
};

export default StartScreen;