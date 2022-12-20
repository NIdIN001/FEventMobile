import React from 'react';
import mainStyles from "../styles/MainStyles";
import BottomTab from "./bottomTab";
import {View} from "react-native";

const BottomTabs = () => {
    return (
        <View style={mainStyles.bottomTabs}>
            <BottomTab svg={require("../assets/main.png")} name={"Главная"} link={"/main"}/>
            <BottomTab svg={require("../assets/mesta.png")} name={"Места"} link={"/profile/place"}/>
            <BottomTab svg={require("../assets/friends.png")} name={"Друзья"} link={"/friends"}/>
            <BottomTab svg={require("../assets/profile.png")} name={"Профиль"} link={"/profile"}/>
        </View>
    );
};

export default BottomTabs;