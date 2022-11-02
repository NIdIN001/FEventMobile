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

export default function App() {
  return (
      <View style={{ flex: 1 }}>
          <NativeRouter>
              <Routes>
                  <Route exact path="/" element={<StartScreen/>} />
                  <Route exact path="/log-in" element={<LogInScreen/>} />
                  <Route exact path="/register" element={<RegisterScreen/>} />
                  <Route exact path="/profile" element={<Profile/>} />
                  <Route exact path="/profile/place" element={<ProfilePlace/>} />
                  <Route exact path="/profile/edit" element={<ProfileEdit/>} />
              </Routes>
          </NativeRouter>
          <FlashMessage position="top" />
      </View>

  );
}

