import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Route, Link, Routes} from "react-router-native";
import LogInScreen from "./pages/LogInScreen";
import StartScreen from "./pages/StartScreen";
import RegisterScreen from "./pages/RegisterScreen";
import FlashMessage from "react-native-flash-message";
import Profile from "./pages/Profile/Profile";
import ProfilePlace from "./pages/Profile/ProfilePlace";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import MainScreen from "./pages/MainScreen";
import Friends from "./pages/Friends/Friends";
import FriendsAdd from "./pages/Friends/FriendsAdd";

export default function App() {
    // попытка загружать переменные из файла не увенчалась успехом
    // const apiUrl = process.env.REACT_APP_API_URL;
    // console.log(process.env)
    // console.log(process.env.REACT_APP_API_URL)
    // console.log(apiUrl)
    return (
      <View style={{ flex: 1 }}>
          <NativeRouter>
              <Routes>
                  <Route exact path="/" element={<StartScreen/>} />
                  <Route exact path="/log-in" element={<LogInScreen/>} />
                  <Route exact path="/register" element={<RegisterScreen/>} />
                  <Route exact path="/profile" element={<Profile/>} />
                  <Route exact path="/friends" element={<Friends/>} />
                  <Route exact path="/friends/add" element={<FriendsAdd/>} />
                  <Route exact path="/profile/place" element={<ProfilePlace/>} />
                  <Route exact path="/profile/edit" element={<ProfileEdit/>} />
                  <Route exact path="/main" element={<MainScreen/>} />
              </Routes>
          </NativeRouter>
          <FlashMessage position="top" />
      </View>

  );
}

