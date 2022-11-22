import React, {useCallback, useEffect} from 'react';
import mainStyles from "../styles/MainStyles";
import {Text, View} from "react-native";
import BottomTabs from "../components/bottomTabs";
import MainComponent from "../components/MainComponent";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const MainScreen = () => {
    const [fontsLoaded] = useFonts({
        'OpenSans': require('../assets/fonts/OpenSans-Regular.ttf'),
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
        <View style={mainStyles.background}>
            <MainComponent/>
            <View style={mainStyles.bottomTabs}>
                <BottomTabs svg={require("../assets/main.png")} name={"Главная"}/>
                <BottomTabs svg={require("../assets/mesta.png")} name={"Места"}/>
                <BottomTabs svg={require("../assets/friends.png")} name={"Друзья"}/>
                <BottomTabs svg={require("../assets/profile.png")} name={"Профиль"}/>
            </View>
        </View>
    );
};

export default MainScreen;