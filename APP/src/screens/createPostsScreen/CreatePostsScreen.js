import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../colors/color";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { getUserWithId } from "../../api/UserApi";
import { addPosts } from "../../api/PostApi";
import { getAllBackground } from "../../api/BackgroundApi";

const bg = {
  id: 1,
  url: "",
  textColor: "black",
};

const CreatePostsScreen = ({ navigation, route }) => {
  const userId = route.params.userId;
  const [avatar, setAvatar] = useState("");
  const [nickName, setNickName] = useState("");

  const [currentBg, setCurrentBg] = useState(bg);
  const [bgData, setBgData] = useState([]);

  const [currentImg, setCurrentImg] = useState("");

  const [content, setContent] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getUser();
    getBackgrounds();
  };

  const getUser = async () => {
    const user = await getUserWithId(userId);
    setAvatar(user.avatar);
    setNickName(user.nickName);
  };

  const getBackgrounds = async () => {
    setBgData(await getAllBackground());
  };

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const post = () => {
    const post = {
      userId: userId,
      content: content,
      img: currentImg,
      backgroundId: currentBg.id,
      commentCount: 0,
      likes: [],
      share: 0,
    };
    addPosts(post);

    navigation.goBack();
  };

  const pickImg = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      let _uri = result.assets[0].uri; // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf(".") + 1); // lấy đuôi file

      FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      }).then((res) => {
        setCurrentImg("data:image/" + file_ext + ";base64," + res);
      });
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={backAction} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontFamily: "AndikaNewBasic",
              marginStart: 10,
            }}
          >
            Create Post
          </Text>
        </View>
        <TouchableOpacity style={styles.postsBtn} onPress={post}>
          <Text
            style={{ color: colors.white, fontSize: 14, fontWeight: "bold" }}
          >
            Posts
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyHeader}>
          <Image
            style={styles.avatar}
            source={
              avatar === ""
                ? require("../../images/avatarDefault.png")
                : { uri: avatar }
            }
          />
          <View style={styles.viewInfo}>
            <Text style={styles.label1}>{nickName}</Text>
            <Text>Publish</Text>
          </View>
        </View>
        <View style={styles.contentBody}>
          {currentImg === "" ? (
            currentBg.url === "" ? (
              <TextInput
                value={content}
                onChangeText={setContent}
                style={styles.inputBody}
                placeholder="What are you thinking?"
                multiline={true}
              />
            ) : (
              <View>
                <Image
                  style={{ width: "100%", height: 300 }}
                  source={currentBg.url === "" ? "" : { uri: currentBg.url }}
                />
                <TextInput
                  cursorColor={currentBg.textColor}
                  style={[styles.inputBody2, { color: currentBg.textColor }]}
                  value={content}
                  onChangeText={setContent}
                  multiline={true}
                />
              </View>
            )
          ) : (
            <View>
              <TextInput
                value={content}
                onChangeText={setContent}
                style={{
                  paddingHorizontal: 8,
                  fontSize: 18,
                  width: "100%",
                  height: 60,
                  textAlignVertical: "top",
                }}
                placeholder="Say something about this photo"
                multiline={true}
              />
              <Image
                source={currentImg === "" ? "" : { uri: currentImg }}
                style={{ width: "100%", height: 300 }}
                resizeMode="cover"
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        {currentImg === "" && (
          <View style={styles.choseBackground}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
              }}
              horizontal
              data={bgData}
              renderItem={({ item }) => {
                return bgUI(
                  item.url,
                  () => setCurrentBg(item),
                  currentBg.id == item.id
                );
              }}
            />
          </View>
        )}
        {currentBg.id == 1 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1.4,
              borderColor: colors.color6,
            }}
          >
            <TouchableOpacity activeOpacity={0.7} onPress={pickImg}>
              <Image
                source={require("../../images/img.png")}
                style={{ width: 60, height: 60 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingBottom: 4 }} activeOpacity={0.7}>
              <Image
                source={require("../../images/camera.png")}
                style={{ width: 55, height: 55 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingHorizontal: 6 }}
              activeOpacity={0.7}
            >
              <Image
                source={require("../../images/video.png")}
                style={{ width: 47, height: 47 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

function bgUI(source, click, sellect) {
  return (
    <TouchableOpacity
      onPress={click}
      activeOpacity={0.8}
      style={{
        height: 50,
        width: 50,
        margin: 5,
        elevation: 4,
        backgroundColor: "white",
        marginBottom: sellect ? 20 : 0,
        shadowColor: "black",
        shadowOpacity: 1,
        shadowRadius: 5,
      }}
    >
      <Image
        style={{ width: "100%", height: "100%", borderRadius: 4 }}
        source={source === "" ? "" : { uri: source }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingEnd: 12,
    height: 50,
  },
  backBtn: {
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  postsBtn: {
    width: 70,
    height: 36,
    backgroundColor: colors.color4,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    borderTopWidth: 1.8,
    borderTopColor: colors.color6,
    height: 500,
    borderBottomWidth: 1.4,
    borderColor: colors.color6,
  },
  bodyHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    borderRadius: 25,
    backgroundColor: colors.color6,
    margin: 8,
  },
  viewInfo: {},
  label1: {
    fontFamily: "AndikaNewBasic",
    fontSize: 17,
  },
  contentBody: {
    flex: 5,
    width: "100%",
    paddingVertical: 8,
  },
  inputBody: {
    width: "100%",
    height: "100%",
    fontSize: 20,
    fontFamily: "AndikaNewBasic",
    textAlignVertical: "top",
    paddingHorizontal: 12,
  },
  inputBody2: {
    width: "100%",
    height: 300,
    fontSize: 20,
    fontFamily: "AndikaNewBasic",
    textAlign: "center",
    padding: 30,
    position: "absolute",
  },
  footer: {
    height: "20%",
  },
  choseBackground: {
    flex: 1,
    borderBottomWidth: 1.4,
    borderColor: colors.color6,
  },
  choseContent: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
