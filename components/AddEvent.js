import React, {useState} from 'react';
import {View, StyleSheet, Image, TextInput, Platform, Button, Text, Pressable, ScrollView, Alert} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import axios from "axios";
import Cookies from "js-cookie";
import {showMessage} from "react-native-flash-message";

const AddEvent = (props) => {
    const [dateStartChose, setDateStartChose] = useState(false)
    const [dateFinishChose, setDateFinishChose] = useState(false)
    const [dateTimeStart, setDateTimeStart] = useState(new Date(Date.now()));
    const [dateTimeFinish, setDateTimeFinish] = useState(new Date(Date.now() + 3600));

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showFinish, setShowFinish] = useState(false);
    const [address, setAddress] = useState('')
    const [maxMembers, setMaxMembers] = useState(0)
    const [ageMin, setAgeMin] = useState(0)
    const [ageMax, setAgeMax] = useState(0)
    const [isOnline, setOnline] = useState(false);
    const [isPrivate, setPrivate] = useState(false);

    let collectData = () => {
        let data = {
            "name": name,
            "datetimeStart": dateTimeStart.toISOString(),
            "datetimeEnd": dateTimeFinish.toISOString(),
            "address": address,
            // "isOnline": isOnline,
            // "isPrivate": isPrivate
        }
        if (description !== '') {
            data = {...data, "description": description}
        }
        if (maxMembers >= 0) {
            data = {...data, "maxMembers": maxMembers}
        }
        if (ageMin >= 0) {
            data = {...data, "ageMin": ageMin}
        }
        if (ageMax >= 0) {
            data = {...data, "ageMax": ageMax}
        }
        return data
    }

    let AddEventFunction = async () => {
        let data = collectData()
        console.log(`http://192.168.0.103:8080/event/create`);
        axios(`http://192.168.0.103:8080/event/create`, {
            method: 'post',
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Token": Cookies.get("token")
            },
        }).then(res => {
            console.log(res)
            if (res.data.errorStatus === "OK") {
                showMessage({
                    message: "Событие добавлено успешно!",
                    type: "success",
                });
                props.callback(false)
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
                    "Ошибка при создании события",
                    "Технические шоколадки! Проверьте доступ к интернету.")
            })

    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDateTimeStart(currentDate);
        if (mode === 'date') {
            setMode('time')
            setShow(true)
        }
        setDateStartChose(true)
    };
    const onChangeFinish = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowFinish(false);
        setDateTimeFinish(currentDate);
        if (mode === 'date') {
            setMode('time')
            setShowFinish(true)
        }
        if (mode === 'time') {
            setDateFinishChose(true)
            setMode('date')
            setShowFinish(false)
        }
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(true);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };
    const showModeFinish = (currentMode) => {
        if (Platform.OS === 'android') {
            setShowFinish(true);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const showDatepickerFinish = () => {
        showModeFinish('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };

    const [name, setName] = useState('')

    const [description, setDescription] = useState('')

    return (
        <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
            <View style={styles.crossContainer} onTouchEnd={() => {props.callback(false)}}>
                <Image style={styles.cross} source={require("../assets/cross.png")}/>
            </View>
            <View style={{flex: 1, marginBottom: "10%", alignItems: "center"}}>
                    <View style={styles.list}>
                        {/*input fields*/}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textContainer}>Название</Text>
                            <TextInput style={styles.textContainer}
                                       placeholder={"Название"}
                                       editable={true}
                                       onChangeText={(value) => setName(value)}/>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <TextInput style={styles.description}
                                       placeholder={"Добавьте описание вашего события"}
                                       editable={true}
                                       multiline={true}
                                       onChangeText={(value) => setDescription(value)}/>

                        </View>
                        <View>
                            <Pressable style={styles.fieldContainer} onPress={showDatepicker}>
                                <Text style={styles.textContainer}>{dateStartChose ? dateTimeStart.toLocaleString() : "Когда начнется событие?"}</Text>
                            </Pressable>
                            <Pressable style={styles.fieldContainer} onPress={showDatepickerFinish}>
                                <Text style={styles.textContainer}>{dateFinishChose ? dateTimeFinish.toLocaleString() : "Когда закончится событие?"}</Text>
                            </Pressable>

                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dateTimeStart}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onChange}
                                />
                            )}
                            {showFinish && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dateTimeFinish}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onChangeFinish}
                                />
                            )}
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.textContainer}>Адрес</Text>
                            <TextInput style={styles.textContainer}
                                       placeholder={"Адрес"}
                                       editable={true}
                                       onChangeText={(value) => setAddress(value)}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textContainer}>Максимальное количество участников</Text>
                            <TextInput style={styles.textContainer}
                                       placeholder={"5"}
                                       keyboardType={"numeric"}
                                       editable={true}
                                       onChangeText={(value) => setMaxMembers(parseInt(value))}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textContainer}>Минимальный возраст участников</Text>
                            <TextInput style={styles.textContainer}
                                       placeholder={"5"}
                                       keyboardType={"numeric"}
                                       editable={true}
                                       onChangeText={(value) => setAgeMin(parseInt(value))}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textContainer}>Максимальный возраст участников</Text>
                            <TextInput style={styles.textContainer}
                                       placeholder={"5"}
                                       keyboardType={"numeric"}
                                       editable={true}
                                       onChangeText={(value) => setAgeMax(parseInt(value))}/>
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.textContainer}>Онлайн событие</Text>
                            <Checkbox value={isOnline} onValueChange={setOnline} />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.textContainer}>Приватное событие</Text>
                            <Checkbox value={isPrivate} onValueChange={setPrivate} />
                        </View>
                        <Pressable style={styles.fieldContainer} onPress={AddEventFunction}>
                            <Text style={styles.addText}>Добавить событие</Text>
                        </Pressable>
                    </View>
                {/*</ScrollView>*/}
            </View>
        </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(72, 72, 84, 1)",
        borderColor: "#000000",
        borderRadius: 4,
    },
    fieldContainer: {
        width: "100%",
        maxHeight: "60%",
        backgroundColor: "#D9D9D9",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    descriptionContainer: {
        width: "100%",
        minHeight: "30%",
        backgroundColor: "#D9D9D9",
        margin: 8,
        padding: 8,
        flexWrap: "wrap",
    },
    textContainer: {
        fontFamily: "OpenSans",
        textAlign: "left",
        fontSize: 14,
        margin: 8,
        color: "#844E36"
    },
    addText: {
        fontFamily: "OpenSans",
        textAlign: "center",
        fontSize: 16,
        margin: 8,
        color: "#844E36"
    },
    description: {
        fontFamily: "OpenSans",
        textAlign: "left",
        fontSize: 14,
        color: "#844E36"
    },
    cross: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    crossContainer: {
        height: '6%',
        aspectRatio: 1,
        resizeMode: "contain",
        left: 0,
    },
    scrollview: {
        height: "100%",
        // //marginHorizontal: 10,
        // marginBottom: 10,
        flex: 1,
        flexGrow: 1,

    },
    list: {
        height: "100%",
        width: "92%",
        flexGrow: 1,
        marginTop:"6%",
        marginBottom: "20%",
        flexWrap:"nowrap",
        alignContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: "space-around",
        marginHorizontal: 10,
    },
})

export default AddEvent;