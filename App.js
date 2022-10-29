import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Route, Link, Routes} from "react-router-native";
import LogInScreen from "./pages/LogInScreen";
import StartScreen from "./pages/StartScreen";
import RegisterScreen from "./pages/RegisterScreen";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
      <View style={{ flex: 1 }}>
          <NativeRouter>
              <Routes>
                  <Route exact path="/" element={<StartScreen/>} />
                  <Route exact path="/log-in" element={<LogInScreen/>} />
                  <Route exact path="/register" element={<RegisterScreen/>} />
              </Routes>
          </NativeRouter>
          <FlashMessage position="top" />
      </View>

  );
}

