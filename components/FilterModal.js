import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import Checkbox from 'expo-checkbox';

const FilterModal = (props) => {
    console.log(props)
    const [isOnline, setOnline] = useState(false);
    const [isOffline, setOffline] = useState(false);
    const [isForAll, setPrivate] = useState(false);
    const [isFriends, setFriends] = useState(false);

    const [ageMin, setAgeMin] = useState(null)
    const [ageMax, setAgeMax] = useState(null)
    const [category, setCategory] = useState(null)

    let collectParameters = () => {
        let dict = {}
        if (isOnline && !isOffline) {
            dict["isOnline"] = true
        }
        if (!isOnline && isOffline) {
            dict["isOnline"] = true
        }
        if (!isForAll && isFriends) {
            dict["isPrivate"] = true
        }
        if (isForAll && !isFriends) {
            dict["isPrivate"] = true
        }
        if (ageMin !== null) {
            dict["ageMin"] = ageMin
        }
        if (ageMax !== null) {
            dict["ageMax"] = ageMax
        }
        if (category !== null) {
            dict["category"] = category
        }
        return dict
    }
    return (
        <View style={styles.container}>
            <View style={styles.fieldContainer}>
                <Text style={styles.descriptionText}>Какое событие вы хотите посетить?</Text>
                <View style={styles.field}>
                    <Checkbox value={isOnline} onValueChange={setOnline} style={styles.checkbox} />
                    <Text style={styles.descriptionText}> Онлайн событие</Text>
                </View>
                <View style={styles.field}>
                    <Checkbox value={isOffline} onValueChange={setOffline} style={styles.checkbox} />
                    <Text style={styles.descriptionText}> Оффлайн событие</Text>
                </View>
                <View style={styles.field}>
                    <Checkbox value={isForAll} onValueChange={setPrivate} style={styles.checkbox} />
                    <Text style={styles.descriptionText}> Общедоступное событие</Text>
                </View>
                <View style={styles.field}>
                    <Checkbox value={isFriends} onValueChange={setFriends} style={styles.checkbox} />
                    <Text style={styles.descriptionText}> Только для друзей</Text>
                </View>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.descriptionText}>Мимальный возраст</Text>
                <View style={styles.field}>
                    <TextInput style={styles.input}
                               placeholder={"5"}
                               placeholderTextColor="#FFFFFF"
                               keyboardType={"numeric"}
                               editable={true}
                               onChangeText={(value) => setAgeMin(parseInt(value))}/>
                    <Text style={{color: "#FFFFFF", alignSelf:"center"}}>лет</Text>
                </View>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.descriptionText}>Максимальный возраст</Text>
                <View style={styles.field}>
                    <TextInput style={styles.input}
                               placeholder={"5"}
                               placeholderTextColor="#FFFFFF"
                               keyboardType={"numeric"}
                               editable={true}
                               onChangeText={(value) => setAgeMax(parseInt(value))}/>
                    <Text style={{color: "#FFFFFF", alignSelf:"center"}}>лет</Text>
                </View>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.descriptionText}>Категория события</Text>
                <View style={styles.field}>
                    <TextInput style={styles.input}
                               placeholder={"Введте категорию"}
                               placeholderTextColor="#FFFFFF"
                               editable={true}
                               onChangeText={(value) => setCategory(value)}/>
                    {/*<Text style={styles.descriptionText}>лет</Text>*/}
                </View>
            </View>

            <View style={styles.fieldContainer}>
                <Pressable style={styles.button} onPress={() => {props.setFilter(collectParameters())}}>
                    <Text style={styles.buttonText}>Применить фильтр</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(72, 72, 84, 1)",
        // borderColor: "#FFFFFF",
        // borderRadius: 4,
        // paddingHorizontal: "20%",
        // paddingVertical: "100%",
        // marginTop:"-40%",
        //marginBottom: "-50%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        //flexGrow: 1,
    },
    fieldContainer: {
        width: "100%",
        maxHeight: "100%",
        display: "flex",
        justifyContent:"center",
        alignItems: "flex-start",
        marginTop: "15%",
        marginLeft:"10%",
    },
    field:{
        display:"flex",
        flexDirection:"row",
        paddingTop:"5%",
        //justifyContent:"space-between",
    },
    descriptionText: {
        color: "#FFFFFF",
    },
    input:{
        width:150,
        height:30,
        borderStyle:"solid",
        borderColor: "#FFFFFF",
        borderWidth:1,
        borderRadius:8,
        color: "#FFFFFF",
        textAlign:"center",
        marginRight: 8,
    },
    checkbox:{
        marginRight: 8,
        borderStyle:"solid",
        borderColor: "#FFFFFF",
        borderWidth:2,
        borderRadius:5,
    },
    button: {
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "rgb(49,49,49)",
        backgroundColor: "rgb(211,152,175)",
        height: 60,
        width: "90%",
        marginBottom:40,
        //marginLeft:"17%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText:{
        color: "#ffffff",
        fontFamily: "Roboto",
        fontSize: 17,
    },
});
export default FilterModal;