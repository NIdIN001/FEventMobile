import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, StatusBar, Alert} from "react-native";
import EventItem from "./EventItem";
import axios from "axios";
import Cookies from "js-cookie";
import {showMessage} from "react-native-flash-message";

const EventList = (props) => {
    console.log(props.filter)
    /*const [events, setEvents] = useState([
        {'id': 1, 'name': 'Новый год', 'description': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbb ' +
                'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb ' +
                'ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc ', 'datetimeStart': 'Sat 06.11.22 15:30 ', 'datetimeEnd': 'Sat 06.11.22 17:30',
            'maxMembers': 10, 'isOnline': false, 'isPrivate': false},
        {'id': 2, 'name': 'Новый год', 'description': 'a', 'datetimeStart': 'Sat 06.11.22 15:30 ', 'datetimeEnd': 'Sat 06.11.22 17:30',
            'maxMembers': 10, 'ageMin': 18, 'ageMax': 35, 'isOnline': false, 'isPrivate': false},
        {'id': 3, 'name': 'Новый год', 'description': 'a', 'datetimeStart': 'Sat 06.11.22 15:30 ', 'datetimeEnd': 'Sat 06.11.22 17:30',
            'maxMembers': 10, 'ageMin': 18, 'ageMax': 35, 'isOnline': false, 'isPrivate': false},
        {'id': 4, 'name': 'Новый год', 'description': 'a', 'datetimeStart': 'Sat 06.11.22 15:30 ', 'datetimeEnd': 'Sat 06.11.22 17:30',
            'ageMin': 18, 'ageMax': 35, 'isOnline': false, 'isPrivate': false},
    ])*/
    const [events, setEvents] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const [scrollViewHeight, setScrollViewHeight] = useState(0)
    const onContentSizeChange = (width, height) => {
        console.log('scrollview width : ' + width);
        console.log('scrollview height : ' + height);
        setScrollViewHeight(height)
    };

    const scrollHandler = (e) => {
        if (scrollViewHeight - e.nativeEvent.contentOffset.y < 100) {
            setFetching(true)
        }
    }

    useEffect(() => {
        if (fetching) {
            console.log("fetching")
            axios.get(`http://192.168.0.103:8080/event/view`,
                 {
                     params: props.filter,
                    "Content-Type": "application/json",
                    "Token": Cookies.get("token")
                }
            )
                .then(res => {
                    console.log(res)
                    if (res.data.errorStatus === "OK") {
                        console.log(res.data.data.eventFoundDto)
                        if (res.data.data.eventFoundDto !== []) {
                            setEvents([...events, ...res.data.data.eventFoundDto])
                            setCurrentPage(prevState => prevState + 1)
                        }
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
                        "Ошибка при получении списка событий",
                        "Технические шоколадки! Проверьте доступ к интернету.")
                })
                .finally(() => setFetching(false))
        }
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} onContentSizeChange={onContentSizeChange} onScroll={scrollHandler}>
                <View style={styles.list}>
                    {events?.map(a => <EventItem event={a} image={require("../assets/icon.png")}/>)}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        height: "100%",
        width: "100%",
        flexWrap: 'wrap',
        alignItems: "flex-start",
        flexDirection: 'row',
        justifyContent: "space-around",
        flexGrow: 1
    },
    scrollView: {
        marginHorizontal: 10,
        marginBottom: "62%"
    },
    container: {
    },
})
export default EventList;