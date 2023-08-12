import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";
import FiledInput from "../../components/filedInput/FiledInput";
import CustomButton from "../../components/button/CustomButton";
import LogoButton from "../../components/button/LogoButton";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import CheckBox from "expo-checkbox";
import CustomCheckBox from "../../components/CustomCheckBox";

const UserApi = require("../../api/UserApi.js");

const LoginInScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAccountSaved();
    });

    return unsubscribe;
  }, [navigation]);

  const getAccountSaved = async () => {
    try {
      const account = JSON.parse(await AsyncStorage.getItem("account"));
      if (account !== null) {
        setPhone(account.phone);
        setPassword(account.password);
        setRemember(account.remember);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveAccount = async () => {
    try {
      var account;
      if (remember) {
        account = { phone: phone, password: password, remember: remember };
        await AsyncStorage.setItem("account", JSON.stringify(account));
        // console.log("save success");
      } else {
        await AsyncStorage.removeItem("account");
        // console.log('delete success');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkLogin = async () => {
    var user = await UserApi.getUserWithPhone(phone);
    if (user === undefined || user.password !== password) {
      setError("* Phone number or password invalid");
      return false;
    }
    setError("");
    if (user.isLock) {
      Alert.alert(
        "Your account were locked.",
        "Contact admin Lê Gia Tuấn to unlock",
        [{ text: "OK", style: "cancel" }]
      );
    } else {
      saveAccount();
      showMainScreen(user.id);
    }
  };

  const showSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  const showMainScreen = (id) => {
    navigation.navigate("Main", { idUser: id });
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#663399", "#50D0D2"]}
      style={styles.logIn}
    >
      <Image style={styles.logo} source={require("../../images/mbiileshop.jpg")} />

      <View style={styles.form}>
        <Text style={styles.title}>Sign In</Text>
        <Text
          style={{ color: "red", fontFamily: "AndikaNewBasic", fontSize: 15 }}
        >
          {error}
        </Text>
        <FiledInput
          label={"Phone number"}
          icon={"phone"}
          value={phone}
          onTextChange={setPhone}
        />
        <FiledInput
          label={"Password"}
          icon={"lock"}
          password={true}
          value={password}
          onTextChange={setPassword}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomCheckBox
            value={remember}
            text="Remember"
            onChange={setRemember}
          />
          <Text style={styles.forgotPass}>Forgot password ?</Text>
        </View>
        <CustomButton text={"Sign In"} onPress={checkLogin} />
        <View style={styles.bottomForm}>
          <View style={styles.orContainer}>
            <View style={styles.viewLine} />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {" "}
              Or connect with{" "}
            </Text>
            <View style={styles.viewLine} />
          </View>
          <View style={styles.btnContainer}>
            <LogoButton src={require("../../images/fb_logo.png")} />
            <LogoButton src={require("../../images/google_logo.png")} />
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.bottomText}>
          Don't have and account?{" "}
          <Text onPress={showSignUpScreen} style={styles.textSignUp}>
            Sign Up
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default LoginInScreen;
