import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../colors/color";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PeopleLine = ({ source, text, onPress, size, type }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={source}
          style={[styles.imgHeader, { width: size, height: size }]}
        />
        <Text style={styles.text1}>{text}</Text>
      </View>
      {type == "admin" && (
        <MaterialIcons
          name="admin-panel-settings"
          size={35}
          color={colors.color4}
        />
      )}
    </TouchableOpacity>
  );
};

export default PeopleLine;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 6,
    marginTop: 6,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imgHeader: {
    borderRadius: 50,
    resizeMode: "contain",
  },
  text1: {
    fontFamily: "AndikaNewBasic",
    fontSize: 16,
    paddingBottom: 5,
    color: colors.color7,
    paddingStart: 10,
  },
});
