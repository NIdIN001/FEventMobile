import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Route, Link, Routes} from "react-router-native";
import LogInScreen from "./pages/LogInScreen";
import StartScreen from "./pages/StartScreen";
import RegisterScreen from "./pages/RegisterScreen";
import FlashMessage from "react-native-flash-message";
import MainScreen from "./pages/MainScreen";

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
                  <Route exact path="/main" element={<MainScreen/>} />
              </Routes>
          </NativeRouter>
          <FlashMessage position="top" />
      </View>

  );
}

