import React, {useCallback, useEffect} from 'react';
import {Image, Text, View} from "react-native";
import startStyles from "../styles/StartStyles";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LogInButton from "../components/buttons/logInButton";

const LogInScreen = () => {
    // const [fontsLoaded] = useFonts({
    //     'RubikMonoOne': require('../assets/fonts/RubikMonoOne-Regular.ttf'),
    // });
    //
    // useEffect(() => {
    //     async function prepare() {
    //         await SplashScreen.preventAutoHideAsync();
    //     }
    //     prepare();
    // }, []);
    //
    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);
    //
    // if (!fontsLoaded) {
    //     return null;
    // }
    return (
        <View style={startStyles.background}>

        </View>
    );
};

export default LogInScreen;