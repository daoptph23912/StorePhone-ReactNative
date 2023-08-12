import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const IntroduceScreen = ({navigation}) => {

    setTimeout(()=>{
        navigation.navigate("LogIn");
        clearTimeout(this);
    },2500);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#E2FFF1", "#50D0D2"]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../images/applogo.png")}
        />
        <Text style={styles.title}>Amazing Posts</Text>
      </View>
    </LinearGradient>
  );
};

export default IntroduceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 120,
        height: 120,
    },
    title: {
        fontSize: 30,
        fontFamily: 'AndikaNewBasic',
        width: '100%'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});