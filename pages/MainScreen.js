import React, {useCallback, useEffect} from 'react';
import mainStyles from "../styles/MainStyles";
import {Text, View} from "react-native";
import BottomTab from "../components/bottomTab";
import MainComponent from "../components/MainComponent";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import BottomTabs from "../components/BottomTabs";

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
            <BottomTabs/>
        </View>
    );
};

export default MainScreen;