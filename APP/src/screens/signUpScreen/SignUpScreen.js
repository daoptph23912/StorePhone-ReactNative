import {
  View,
  Text,
  Touchable,
  TouchableHighlight,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FiledInput from "../../components/filedInput/FiledInput";
import CustomButton from "../../components/button/CustomButton";
import LogoButton from "../../components/button/LogoButton";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-simple-toast";

const UserApi = require("../../api/UserApi.js");

const SignUpScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [nickName, setNickName] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    var user = await UserApi.getUserWithPhone(phone);
    if (phone === "" || nickName === "" || pass1 === "" || pass2 === "") {
      setError("* Flease fill all fields");
      return false;
    }
    if (user !== undefined) {
      setError("* Phone number already exists");
      return false;
    }
    if (pass1 !== pass2) {
      setError("* Password not match");
      return false;
    }
    const infomation = { name: "", show: false };
    user = {
      phone: phone,
      nickName: nickName,
      password: pass1,
      avatar: "",
      background: "",
      type: "user",
      follower: [],
      following: [],
      info: {
        school: infomation,
        address: infomation,
        relationship: infomation,
        work: infomation,
      },
      isLock: false
    }

    await UserApi.addUser(user);

    await AsyncStorage.setItem(
      "account",
      JSON.stringify({ phone: phone, password: pass1, remember: true })
    );

    Toast.show("Sign Up success", Toast.LONG);
    navigation.navigate("LogIn");
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#663399", "#50D0D2"]}
      style={styles.signUp}
    >
      <Pressable style={{ alignSelf: "baseline" }} onPress={goBack}>
        <View style={styles.gobackContainer}>
          <Image
            style={styles.imgLogo}
            source={require("../../images/previous.png")}
          />
          <Text style={styles.label}>Sign In</Text>
        </View>
      </Pressable>
      <Image style={styles.logo} source={require("../../images/mbiileshop.jpg")} />
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <Text
          style={{ color: "red", fontFamily: "AndikaNewBasic", fontSize: 15 }}
        >
          {error}
        </Text>
        <KeyboardAwareScrollView extraScrollHeight={50}>
          <FiledInput
            label={"Phone number"}
            icon={"phone"}
            value={phone}
            onTextChange={setPhone}
          />
          <FiledInput
            label={"Nick name"}
            icon={"account-circle"}
            value={nickName}
            onTextChange={setNickName}
          />
          <FiledInput
            label={"Password1"}
            password={true}
            icon={"lock"}
            value={pass1}
            onTextChange={setPass1}
          />
          <FiledInput
            label={"Password2"}
            password={true}
            icon={"lock"}
            value={pass2}
            onTextChange={setPass2}
          />
          <CustomButton text={"Sign Up"} onPress={signUp} />
        </KeyboardAwareScrollView>
      </View>
    </LinearGradient>
  );
};

export default SignUpScreen;
