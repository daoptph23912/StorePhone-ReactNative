// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import IconText from "../components/iconText/IconText";
// import colors from "../colors/color";
// import { getPostWithId, updatePost } from "../api/PostApi";
// import { getUserWithId } from "../api/UserApi";
// import { addComment, getAllCommentWithPostId } from "../api/CommentApi";
// import CommentItem from "../components/CommentItem";

// const CommentScreen = ({ navigation, route }) => {
//   const likes = route.params.likes;
//   const postId = route.params.postId;
//   const userId = route.params.userId;

//   const [content, setContent] = useState("");
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     setData(await getAllCommentWithPostId(postId));
//   };

//   const showProfilePeople = (peopleId, userId) => {
//     if (peopleId !== userId) {
//       navigation.push("PeopleProfile", { peopleId: peopleId,userType: route.params.type });
//     }
//   };

//   const showLikeScreen = () => {
//     navigation.push("Like", {
//       postId: postId,
//       likes: likes,
//       userId: userId,
//       type: route.params.type
//     });
//   };

//   const sendComment = async () => {
//     const commentCount = (await getPostWithId(postId)).commentCount;
//     updatePost(postId, { commentCount: commentCount + 1 });

//     const user = await getUserWithId(userId);

//     const comment = {
//       userId: userId,
//       postId: postId,
//       avatar: user.avatar,
//       nickName: user.nickName,
//       content: content,
//     };

//     data.unshift(comment);

//     addComment(comment);
//     setContent("");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{ flexDirection: "row", alignItems: "center" }}
//         >
//           <MaterialIcons name="arrow-back" size={30} />
//           <Text style={styles.title}>Comment</Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <IconText
//             text={likes.length}
//             status="medium"
//             src={require("../images/like.png")}
//             src2={require("../images/likeShard.png")}
//             onPress={showLikeScreen}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.body}>
//         <FlatList
//           data={data}
//           contentContainerStyle={{ paddingBottom: 50 }}
//           showsVerticalScrollIndicator={false}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <CommentItem
//               key={item.id}
//               avatar={item.avatar}
//               content={item.content}
//               nickName={item.nickName}
//               onPress={()=>{
//                 showProfilePeople(item.userId,userId);
//               }}
//             />
//           )}
//         />
//       </View>
//       <View style={styles.footer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Write your comment"
//           cursorColor="gray"
//           autoFocus
//           value={content}
//           onChangeText={setContent}
//           multiline
//         />
//         <TouchableOpacity disabled={content === ""} onPress={sendComment}>
//           <MaterialIcons
//             name="send"
//             size={30}
//             color={content === "" ? colors.color6 : colors.color4}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CommentScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   header: {
//     width: "100%",
//     flexDirection: "row",
//     height: 50,
//     justifyContent: "space-between",
//     backgroundColor: "white",
//     shadowColor: "black",
//     elevation: 5,
//     alignItems: "center",
//     paddingHorizontal: 8,
//   },
//   title: {
//     fontSize: 20,
//     fontFamily: "AndikaNewBasic",
//     paddingBottom: 7,
//     paddingStart: 8,
//   },
//   footer: {
//     position: "absolute",
//     width: "100%",
//     height: 58,
//     bottom: 0,
//     borderTopWidth: 1,
//     borderTopColor: "#aaaaaa",
//     paddingHorizontal: 10,
//     justifyContent: "space-between",
//     paddingBottom: 2,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   input: {
//     width: "90%",
//     height: 43,
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     backgroundColor: colors.color6,
//     fontSize: 16,
//   },
// });
