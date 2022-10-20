import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Route, Link, Routes} from "react-router-native";
import LogInScreen from "./pages/LogInScreen";
import StartScreen from "./pages/StartScreen";

export default function App() {
  return (
      <NativeRouter>
          <Routes>
            <Route exact path="/" element={<StartScreen/>} />
            <Route exact path="/log-in" element={<LogInScreen/>} />
          </Routes>
      </NativeRouter>
  );
}

