import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FiledInput from "../components/filedInput/FiledInput";
import colors from "../colors/color";
import { getUserWithId } from "../api/UserApi";
import { updateInfoUser } from "../api/UserApi";

const EditProfileDetails = ({ navigation, route }) => {
  const userId = route.params.userId;

  const [address, setAddress] = useState("");
  const [showAddress, setShowAddress] = useState(false);

  const [school, setSchool] = useState("");
  const [showSchool, setShowSchool] = useState(false);

  const [work, setWork] = useState("");
  const [showWork, setShowWork] = useState(false);

  const [relationship, setRelationship] = useState("");
  const [showRelationship, setShowRelationship] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const updateInfo = async() => {
    const info = {
      school : {
        name: school,
        show: showSchool
      },
      address : {
        name: address,
        show: showAddress
      },
      relationship : {
        name: relationship,
        show: showRelationship
      },
      work : {
        name: work,
        show: showWork
      }
    }

    await updateInfoUser({info: info},userId);

  }

  const getData = async () => {
    const user = await getUserWithId(userId);

    setAddress(user.info.address.name);
    setShowAddress(user.info.address.show);

    setSchool(user.info.school.name);
    setShowSchool(user.info.school.show);

    setWork(user.info.work.name);
    setShowWork(user.info.work.show);

    setRelationship(user.info.relationship.name);
    setShowRelationship(user.info.relationship.show);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
        <View style={styles.header}>
          <Text style={styles.text1}>Số điện thoại</Text>
         
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            value={work}
            onChangeText={setWork}
            cursorColor={"black"}
            style={styles.input}
            placeholder="Số điện thoại"
          />
          {/* <MaterialIcons name="edit" color={"black"} size={30} /> */}
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.header}>
          <Text style={styles.text1}>Địa chỉ</Text>
          
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            value={address}
            onChangeText={setAddress}
            cursorColor={"black"}
            style={styles.input}
            placeholder="Address"
          />
          {/* <MaterialIcons name="edit" color={"black"} size={30} /> */}
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.header}>
          <Text style={styles.text1}>Email</Text>
        
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            value={school}
            onChangeText={setSchool}
            cursorColor={"black"}
            style={styles.input}
            placeholder="Email"
          />
          {/* <MaterialIcons name="edit" color={"black"} size={30} /> */}
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.header}>
          <Text style={styles.text1}>Công việc</Text>
         
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            value={relationship}
            onChangeText={setRelationship}
            cursorColor={"black"}
            style={styles.input}
            placeholder="Công việc"
          />
          {/* <MaterialIcons name="edit" color={"black"} size={30} /> */}
        </View>
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={()=> updateInfo()}>
        <Text style={[styles.text1, { color: colors.white, fontSize: 15 }]}>
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  item: {
    borderBottomWidth: 1.4,
    borderBottomColor: colors.color6,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: {
    fontFamily: "AndikaNewBasic",
    fontSize: 18,
  },
  text2: {
    fontFamily: "AndikaNewBasic",
    fontSize: 14,
    marginStart: 5,
  },
  checkbox: {
    marginTop: 3,
    borderColor: "black",
  },
  input: {
    width: "90%",
    borderRadius: 14,
    height: 40,
    backgroundColor: "#F8FBFF",
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingBottom: 3,
    borderColor: "#2E3154",
    fontSize: 16,
    fontFamily: "AndikaNewBasic",
  },
  saveBtn: {
    alignSelf: "flex-end",
    backgroundColor: colors.color4,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingBottom: 8,
    paddingTop: 3,
    marginTop: 15,
    marginEnd: 5,
  },
});
