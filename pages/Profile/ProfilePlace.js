import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {Link, useNavigate} from "react-router-native";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import logStyles from "../../styles/LogStyles";
import axios from "axios";
import {showMessage} from "react-native-flash-message";
import Cookies from "js-cookie";
import {Storage} from "expo-storage";
import BottomTabs from "../../components/BottomTabs";


function Form(props) {
    return null;
}

const Profile = () => {
    const [places, setPlaces] = useState([]);

    const [user, setUser] = useState({})
    Storage.getItem({key: `user`}).then(
        res=>setUser(res)
    )
    let navigate = useNavigate();

    const [login, setLogin] = useState(user.login);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [city, setCity] = useState(user.city);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);


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

    let listPlaces = places.map((place) =>
        <Text style={styles.option} key={place} value={place} onClick={function (){setCity(place)}}>{place}</Text>
    )
    let accessToken = 'accessToken=' + Cookies.get("token");
    let refreshToken = 'refreshToken=' + Cookies.get("refresh");
    function saveCity(data) {
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



    let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    let token = "33e779796a501b9be3d6ca1d589fb950d4d0cf90";
    let name;
    let options
    function setName(text){
        name = text;

        options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: name})
        }

        fetch(url, options)
            .then(async response => {
                let a = await response.json()
                let b = []
                a['suggestions'].forEach(s => {
                    b.push(s['value'])
                })
                console.log(b)
                setPlaces(b)
            })
            .catch(error => console.log("error", error));
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

            <View >
                <Form onSubmit={saveCity}>
                    <FlatList style={styles.list} size="10" id="select_">
                        {listPlaces}
                    </FlatList>
                    <TouchableHighlight style={logStyles.button}
                                        onPress={() => {saveCity({
                                            "login": login,
                                            "lastName": lastName,
                                            "firstName": "Dima",
                                            "city": city,
                                            "phoneNumber": phoneNumber})}}>
                        <Text style={logStyles.text} >Сохранить</Text>
                    </TouchableHighlight>
                </Form>
            </View>
            <BottomTabs/>
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

      //  top: '3%',
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
        marginLeft: '5%',
        width: 32,
        height: 32
    },

    backarrow: {

        marginLeft: '5%',
        width: 32,
        height: 32
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
        borderWidth: 1
    },

    inblock: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '5%',

    },

    list: {
        width: 300,
        paddingTop: 20,
        margin: '0 auto'
    },

    option: {
        boxSizing: 'border-box',
        paddingTop: '3%',
        paddingRight: '3%',
        paddingLeft: '3%',
        paddingBottom: '3%',
        fontSize: 16,
        fontFamily: "Roboto",
        backgroundColor: 'D9D9D9',
        borderWidth: 1,
    }
})

export default Profile;