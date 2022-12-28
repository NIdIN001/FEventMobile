import React, {useCallback, useEffect, useState} from 'react';
import {
    Alert,
    Button,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from "react-native";
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
    const [user, setUser] = useState({})
    const [places, setPlaces] = useState([]);
    const [login, setLogin] = useState('');
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [city, setCity] = useState(user.city);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    useEffect(() => {
        Storage.getItem({key: `user`}).then(
            res=>setUser(JSON.parse(res))
        )
        setLogin(user["login"])
        setCity(user["city"])
        setPhoneNumber(user["phoneNumber"])
        setFirstName(user["firstName"])
        setLastName(user["lastName"])
        setCity(user["city"])
        console.log("qwerr")
        console.log(user["login"])
    }, [])

    console.log("console user")
    console.log(user)
    let navigate = useNavigate();


    console.log(firstName)
    console.log(city)

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
    let accessToken = 'accessToken=' + Cookies.get("accessToken");
    let refreshToken = 'refreshToken=' + Cookies.get("refreshToken");
    function saveCity(data) {
        console.log("data")
        data = {"login": user["login"],
            "lastName": user["lastName"],
            "firstName": user["firstName"],
            "city": data.city,
            "phoneNumber": user["phoneNumber"]}
        console.log(data)
        axios(`http://192.168.0.103:8080/user/change-profile-info`, {
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



    let url = 'http://192.168.0.103:8080/city';
    let name;
    function setName(text){
        name = text;

        axios(url,{
            method: "POST",
            data: {"cityName": name},
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async response => {

            console.log(response)
            let b = []
            let i = 0
            response['data']['data'].forEach(s => {
                if (i < 6) {
                    b.push(s['cityName'])
                    i += 1
                }
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

            {places?.map(pl =>
                <Pressable style={styles.option} onPress={function (){setCity(pl)}}>
                    <Text style={styles.option}>{pl}</Text>
                </Pressable>
            )}



            <TouchableHighlight style={logStyles.button}
                                onPress={() => {saveCity({
                                    "login": login,
                                    "lastName": lastName,
                                    "firstName": firstName,
                                    "city": city,
                                    "phoneNumber": phoneNumber})}}>
                <Text style={logStyles.text} >Сохранить</Text>
            </TouchableHighlight>
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

        marginTop: 30,
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
        marginTop: 30,
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