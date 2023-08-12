import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import ContainerScreen from "./src/screens/containerScreen/ContainerScreen";
import SplashScreen from "./src/screens/splashScreens/SplashScreen";

import { useState } from "react";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    AndikaNewBasic: require("./assets/fonts/AndikaNewBasic.ttf"),
    "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  // const [isLoading, setIsLoading] = useState(true);

  // setTimeout(() => {
  //   setIsLoading(false);
  //   clearTimeout(this);
  // }, 3000);

  // if (isLoading) {
  //   return (
  //     <SplashScreen />
  //   )
  // }
  return <ContainerScreen />;
}

const styles = StyleSheet.create({
  container: {},
});
