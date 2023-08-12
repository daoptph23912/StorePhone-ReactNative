import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from "../colors/color";

const LineInfo = ({iconName, content}) => {
  return (
    <View
      style={{ flexDirection: "row", paddingVertical: 4, alignItems: "center" }}
    >
      <MaterialIcons name={iconName} size={26} color={colors.color7} />
      <Text
        style={[
          styles.text2,
          { color: colors.color7, fontSize: 15, marginStart: 10 },
        ]}
      >
        {content}
      </Text>
    </View>
  );
};

export default LineInfo;

const styles = StyleSheet.create({
    text2: {
        fontSize: 14,
        color: colors.black,
        fontWeight: 'bold',
        marginStart: 5
    },
})
