import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Toast from "react-native-simple-toast";

import styles from "./style";
import colors from "../../colors/color";
import Posts from "../../components/posts/Posts";
import LineInfo from "../../components/LineInfo";
import { getUserWithId, getUserWithPosts } from "../../api/UserApi";
import { deletePostWithId, getAllPostWithUserId } from "../../api/PostApi";
import { deleteCommentWithPostId } from "../../api/CommentApi";

const info = {
  name: "",
  show: false,
};

const ProfileScreen = ({ stackNavigation, userId }) => {
  const [isLoading, setLoading] = useState(true);

  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const [nickName, setNickName] = useState("");
  const [type, setType] = useState("");
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  const [posts, setPosts] = useState([]);

  const [address, setAddress] = useState(info);
  const [school, setSchool] = useState(info);
  const [work, setWork] = useState(info);
  const [relationship, setRelationship] = useState(info);

  useEffect(() => {
    getData();
  }, []);

  const showCommentScreen = (postId, likes) => {
    stackNavigation.push("Comment", {
      postId: postId,
      likes: likes,
      userId: userId,
      type: type,
    });
  };

  const getData = async () => {
    setLoading(true);
    var user = await getUserWithId(userId);
    setAvatar(user.avatar);
    setBackground(user.background);
    setNickName(user.nickName);
    setFollower(user.follower.length);
    setFollowing(user.following.length);
    setType(user.type);

    setWork(user.info.work);
    setAddress(user.info.address);
    setRelationship(user.info.relationship);
    setSchool(user.info.school);

    setPosts(await getAllPostWithUserId(userId));
    setLoading(false);
  };

  const showEditProfileScreen = () => {
    stackNavigation.navigate("EditProfile", { userId: userId });
  };

  const showEditProfileDetails = () => {
    stackNavigation.navigate("EditProfileDetails", { userId: userId });
  };

  const editPost = (post) => {
    stackNavigation.navigate("UpdatePost", { userId: userId, post: post });
  };

  const removePost = (id) => {
    Alert.alert("Do you want remove this post?", "", [
      {
        text: "OK",
        onPress: () => {
          deletePostWithId(id);
          deleteCommentWithPostId(id);
          Toast.show("Delete success", Toast.LONG);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getData} />
      }
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.box1}>
        <View style={styles.images}>

          <View style={styles.avatarContainer}>
            <Image
              source={
                avatar === ""
                  ? require("../../images/avatarDefault.png")
                  : { uri: avatar }
              }
              style={styles.avatar}
            />
          </View>
          {type == "admin" && (
            <View
              style={{
                width: "100%",
                justifyContent: "flex-end",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="admin-panel-settings"
                size={30}
                color={colors.color4}
              />
              <Text
                style={[
                  styles.text1,
                  { color: colors.color4, fontSize: 18, padding: 3 },
                ]}
              >
                Admin
              </Text>
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>{nickName}</Text>

        </View>
        <TouchableOpacity
          onPress={showEditProfileScreen}
          style={styles.btnEditProfile}
        >
          <MaterialIcons name="" size={22} color={colors.black} />
          <Text style={styles.text2}>Thông tin người dùng</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.box2}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.text1, { fontSize: 18, marginBottom: 5 }]}>
            Chi Tiết
          </Text>
          {school.show && (
            <LineInfo iconName="school" content={"Đã học tại " + school.name} />
          )}
          {work.show && (
            <LineInfo iconName="work" content={"Làm việc tại " + work.name} />
          )}
          {address.show && (
            <LineInfo iconName="place" content={"Đến từ " + address.name} />
          )}
          {relationship.show && (
            <LineInfo iconName="favorite" content={relationship.name} />
          )}
          {!school.show &&
            !work.show &&
            !address.show &&
            !relationship.show && (
              <LineInfo
               
              />
            )}
        </View>
        <TouchableOpacity
          onPress={showEditProfileDetails}
          style={[
            styles.btnEditProfile,
            { backgroundColor: colors.color8, width: "100%", marginTop: 10 },
          ]}
        >
          <Text style={[styles.text2, { color: colors.color4 }]}>
            Chỉnh sửa thông tin và chi tiết công khai
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.box3}>

        {posts.map((item, index) => {
          return (
            <View key={index}>
              <Posts
                avatar={avatar}
                post={item}
                nickName={nickName}
                userId={userId}
                showCommentScreen={showCommentScreen}
              />
              <View
                style={{
                  position: "absolute",
                  flexDirection: "row",
                  right: 5,
                  top: 10,
                }}
              >
                <MaterialIcons
                  onPress={() => {
                    editPost(item);
                  }}
                  name="edit"
                  size={30}
                  style={{ margin: 5 }}
                />
                <MaterialIcons
                  onPress={() => {
                    removePost(item.id);
                  }}
                  name="clear"
                  size={30}
                  style={{ margin: 5 }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
