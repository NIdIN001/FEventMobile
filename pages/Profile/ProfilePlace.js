import React, {useCallback, useEffect} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from "react-native";
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


const Profile = () => {
    const [fontsLoaded] = useFonts({
        'RubikMonoOne': require('../../assets/fonts/RubikMonoOne-Regular.ttf'),
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





    let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    let token = "33e779796a501b9be3d6ca1d589fb950d4d0cf90";
    let name;
    let options
    function setName(text){
        name = text;

    //     options = {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //             "Authorization": "Token " + token
    //         },
    //         body: JSON.stringify({query: name})
    //     }
    //
    //     fetch(url, options)
    //         .then(response => response.text())
    //         .then(result => console.log(result))
    //         .catch(error => console.log("error", error));
         console.log(name)
    }

    return (
        <View style={styles.background} onLayout={onLayoutRootView}>
            <Link to={'/profile'} style={styles.back}>
                <Image style={styles.backarrow} source={require("../../assets/profile/backarrow.png")}></Image>
            </Link>
            <Text style={styles.header}>ВЫБЕРИТЕ ГОРОД</Text>

            <View style={styles.inblock}>
                <TextInput style={styles.input} placeholder={'Начните вводить название города...'} onChangeText={function(text) {setName(text)}}></TextInput>
            </View>




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
        backgroundColor: "#844E36",
        borderWidth: '1px'
    },

    inblock: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '5%',

    }


})

export default Profile;