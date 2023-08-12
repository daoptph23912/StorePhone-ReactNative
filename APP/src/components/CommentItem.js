import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../colors/color";

const CommentItem = ({ avatar, nickName, content, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={{borderRadius: 30}} activeOpacity={0.6}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.nickName}>{nickName}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    paddingHorizontal: 5,
  },
  contentContainer: {
    backgroundColor: colors.color6,
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderRadius: 12,
    maxWidth: "85%",
  },
  nickName: {
    fontSize: 16,
    fontFamily: "AndikaNewBasic",
  },
  content: {
    fontSize: 15,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 30,
    margin: 4,
  },
});
