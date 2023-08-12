import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FiledInput from "../components/filedInput/FiledInput";
import CustomButton from "../components/button/CustomButton";
import colors from "../colors/color";
import Constants from "expo-constants";
import { Platform } from "react-native";
// import Toast from 'react-native-simple-toast'

import { getUserWithId } from "../api/UserApi";
import { updateInfoUser } from "../api/UserApi";

const ChangePasswordScreen = ({ navigation, route }) => {
    const userId = route.params.userId;
  const [oldPass, setOldPass] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const changePassword = async () => {
    var user = await getUserWithId(route.params.userId);
    if(user.password !== oldPass){
        setError("*Old password incorrect");
        return false;
    }
    if(pass1 !== pass2){
        setError("*New password not match");
        return false;
    }

    await updateInfoUser({password: pass1},userId);

    Toast.show("Change password success", Toast.LONG);
    navigation.goBack();
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#663399", "#50D0D2"]}
      style={styles.changePassword}
    >
      <Pressable style={{ alignSelf: "baseline" }} onPress={goBack}>
        <View style={styles.gobackContainer}>
          <Image
            style={styles.imgLogo}
            source={require("../images/previous.png")}
          />
          <Text style={styles.label}>Menu</Text>
        </View>
      </Pressable>
      <Image style={styles.logo} source={require("../images/mbiileshop.jpg")} />
      <View style={styles.form}>
        <Text style={styles.title}>Change Password</Text>
        <Text
          style={{ color: "red", fontFamily: "AndikaNewBasic", fontSize: 15 }}
        >
          {error}
        </Text>
        <KeyboardAwareScrollView extraScrollHeight={50}>
        <FiledInput
            label={"Old Password"}
            password={true}
            icon={"lock"}
            value={oldPass}
            onTextChange={setOldPass}
          />
          <FiledInput
            label={"New Password1"}
            password={true}
            icon={"lock"}
            value={pass1}
            onTextChange={setPass1}
          />
          <FiledInput
            label={"New Password2"}
            password={true}
            icon={"lock"}
            value={pass2}
            onTextChange={setPass2}
          />
          <CustomButton text={"Change"} onPress={changePassword} />
        </KeyboardAwareScrollView>
      </View>
    </LinearGradient>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    changePassword: {
    flex: 1,
    backgroundColor: "#F7FBFF",
    alignItems: "center",
  },
  gobackContainer: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  imgLogo: {
    width: 25,
    height: 25,
  },
  title: {
    color: colors.black,
    fontSize: 25,
    fontFamily: "AndikaNewBasic",
    marginTop: 15
  },
  form: {
    width: "100%",
    paddingStart: "6%",
    paddingEnd: "6%",
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: "AndikaNewBasic",
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
});
