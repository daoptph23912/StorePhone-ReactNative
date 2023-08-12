import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../colors/color";
import PeopleLine from "../components/PeopleLine";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = ({ navigation, route }) => {
  const userId = route.params.userId;
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const showListSearch = (textSearch) => {
    navigation.navigate("ListPeople", {
      userId: userId,
      text: textSearch,
      type: "search",
      userType: route.params.type,
    });
  };

  const getData = async () => {
    const arr = JSON.parse(await AsyncStorage.getItem("searchData" + userId));
    if (arr !== null) {
      setData(arr);
    }
  };

  const search = async () => {
    if (text !== "") {
      showListSearch(text);
      var arr = data;
      if (arr.includes(text)) {
        var index = arr.indexOf(text);
        arr.splice(index, 1);
        arr = [text, ...arr];
      } else arr = [text, ...arr];
      await AsyncStorage.setItem("searchData" + userId, JSON.stringify(arr));
      setData(arr);
    }
  };

  const remove = async (index) => {
    const arr = data;
    arr.splice(index, 1);
    await AsyncStorage.setItem("searchData" + userId, JSON.stringify(arr));
    getData();
  };

  const backAction = () => {
    navigation.goBack();
  };

  const historyComponent = (index, text) => {
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <PeopleLine
          onPress={() => showListSearch(text)}
          source={require("../images/history.png")}
          text={text}
          size={35}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            remove(index);
          }}
          style={{ position: "absolute", right: 5, top: 15 }}
        >
          <MaterialIcons name="clear" size={30} color={colors.color7} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={backAction} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <View style={{ width: "90%" }}>
          <TextInput
            value={text}
            onChangeText={setText}
            autoFocus
            cursorColor="gray"
            style={styles.input}
            placeholder="Search by nick name"
          />
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={search}
            style={styles.searchBtn}
          >
            <Ionicons name="search" size={27} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.text1}>Search history</Text>
        {data.map((item, index) => {
          return <View key={index}>{historyComponent(index, item)}</View>;
        })}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomColor: colors.color6,
    borderBottomWidth: 1.4,
    paddingBottom: 10,
  },
  body: {
    paddingTop: 6,
    paddingHorizontal: 12,
  },
  input: {
    height: 40,
    borderRadius: 18,
    borderColor: colors.color5,
    borderWidth: 2,
    fontSize: 17,
    paddingStart: 12,
    fontFamily: "AndikaNewBasic",
  },
  searchBtn: {
    position: "absolute",
    right: 2,
    backgroundColor: colors.color6,
    padding: 3,
    borderRadius: 20,
    top: 2,
  },
  text1: {
    fontFamily: "AndikaNewBasic",
    fontSize: 18,
  },
});
