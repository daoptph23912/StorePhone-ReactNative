import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import LineInfo from "../components/LineInfo";
import colors from "../colors/color";

import { getUserWithId } from "../api/UserApi";

const EditProfileScreen = ({ navigation, route }) => {
  const userId = route.params.userId;
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const [address,setAddress] = useState("");
  const [school,setSchool] = useState("");
  const [work,setWork] = useState("");
  const [relationship,setRelationship] = useState("");

  useEffect(()=>{
    getData();
  },[]);


  const getData = async()=>{
    const user = await getUserWithId(userId);
    setAvatar(user.avatar);
    setBackground(user.background);
    setAddress(user.info.address.name);
    setSchool(user.info.school.name);
    setWork(user.info.work.name);
    setRelationship(user.info.relationship.name);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
    
      
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.text1}>Thông tin chi tiết</Text>
            <Text
              style={styles.text2}
              onPress={() => {
                navigation.navigate("EditProfileDetails",{userId: userId});
              }}
            >
            Chỉnh sửa
          </Text>
        </View>
        <LineInfo
          iconName=""
          content={work===""? "Chưa có thông tin" : "Số điện thoại : "+work}
        />
        <LineInfo iconName="" content={address===""? "Chưa có thông tin" :"Địa chỉ:  " + address} />
        <LineInfo iconName="" content={school===""? "Chưa có thông tin" :"Email: " + school} />
        <LineInfo iconName="" content={relationship===""? "Chưa có thông tin" : "Công việc: " + relationship} />
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  avatarContainer: {
    width: "100%",
    height: 230,
    borderBottomWidth: 1.4,
    borderBottomColor: colors.color6,
  },
  backgroundContainer: {
    width: "100%",
    height: 300,
    borderBottomWidth: 1.4,
    borderBottomColor: colors.color6,
  },
  detailsContainer: {
    paddingBottom: 20,
    marginTop:30
  },
  text1: {
    fontFamily: "AndikaNewBasic",
    fontSize: 18,
    textAlign:"center"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text2: {
    color: colors.color4,
    fontFamily: "AndikaNewBasic",
  },
  avatar: {
    width: 190,
    height: 190,
    borderRadius: 95,
    alignSelf: "center",
  },
  imgBackground: {
    width: "100%",
    height: 250,
    backgroundColor: "gray",
    marginTop: 10,
    borderRadius: 16,
  },
});
