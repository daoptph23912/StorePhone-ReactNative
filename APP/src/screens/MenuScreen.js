import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../colors/color";
import PeopleLine from "../components/PeopleLine";
import CreatePostsScreen from "./createPostsScreen/CreatePostsScreen";

const UserApi = require("../api/UserApi");

const MenuScreen = ({ stackNavigation, userId }) => {
  const [avatar, setAvatar] = useState("");
  const [nickName, setNickName] = useState("");
  const [type, setType] = useState("");

  const switchToListPeople = (typeList) => {
    stackNavigation.navigate("ListPeople", {
      userId: userId,
      type: typeList,
      userType: type,
    });
  };

  const clickuser = () => {
    stackNavigation.navigate("CreatePost", { userId: userId });
  };

  const switchToChangePassScreen = () => {
    stackNavigation.navigate("ChangePassword", { userId: userId });
  };

  const switchToForgortPassword = () => {
    stackNavigation.navigate("ForgotPassword");
  };

  const logout = () => {
    stackNavigation.popToTop();
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = await UserApi.getUserWithId(userId);
    setAvatar(user.avatar);
    setNickName(user.nickName);
    setType(user.type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text1}>Menu</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.box1}>
          <PeopleLine
            source={
              avatar === ""
                ? require("../images/avatarDefault.png")
                : { uri: avatar }
            }
            text={nickName}
            size={70}
            type={type}
          />
        </View>
        <View style={styles.box2}>
        
          {type === "admin" &&
            shadowButton(
              require("../images/edit_posts.png"),
              "Bài đăng",
              switchToCreatePostsScreen
            )}
          <View style={{ width: "100%", marginTop: 10 }}>
            <Text style={styles.text2}>Cài đặt</Text>
          </View>
          {shadowButton(
            require("../images/padlock.png"),
            "Thay đổi mật khẩu",
            switchToChangePassScreen
          )}
          {shadowButton(
            require("../images/forgort.png"),
            "Information",
            switchToForgortPassword
          )}
          {shadowButton(require("../images/logout.png"), "Đăng xuất", logout)}
        </View>
      </View>
    </View>
  );
};

function shadowButton(source, title, onPress) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.shadowButton}
    >
      <Image source={source} />
      <Text style={styles.text3}>{title}</Text>
    </TouchableOpacity>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    flexWrap: "wrap",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text1: {
    fontSize: 28,
    color: colors.color4,
    fontFamily: "AndikaNewBasic",
    paddingBottom: 8,
  },
  text2: {
    fontSize: 17,
    color: colors.color4,
    fontFamily: "AndikaNewBasic",
    paddingBottom: 8,
  },
  text3: {
    fontSize: 14,
    color: colors.color4,
    fontFamily: "AndikaNewBasic",
  },
  box1: {
    width: "95%",
  },
  body: {
    width: "100%",
    alignItems: "center",
  },
  box2: {
    width: "95%",
    paddingTop: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  shadowButton: {
    width: "47%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 6,
    justifyContent: "center",
    height: 65,
    borderRadius: 6,
    paddingStart: 20,
    margin: 5,
  },
});
