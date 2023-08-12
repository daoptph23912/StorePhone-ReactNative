// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import colors from "../colors/color";
// import PeopleLine from "../components/PeopleLine";

// const UserApi = require("../api/UserApi");

// let userType = "user";

// const ListPeopleScreen = ({ navigation, route }) => {
//   const userId = route.params.userId;
//   const type = ["search", "friend", "follower", "following"];
//   const [title, setTitle] = useState("");
//   const [iconName, setIconName] = useState("");
//   const [data, setData] = useState([]);
//   userType = route.params.userType;

//   useEffect(() => {
//     if (type[0] === route.params.type) {
//       setTitle(route.params.text);
//       setIconName("person-search");
//       getPeopleWithNickName(route.params.text);
//     } else if (type[1] === route.params.type) {
//       setTitle("Friend");
//       setIconName("people");
//       getFriends();
//     } else if (type[2] === route.params.type) {
//       setTitle("Follower");
//       setIconName("groups");
//       getFollowers();
//     } else if (type[3] === route.params.type) {
//       setTitle("Following");
//       setIconName("groups");
//       getFollowings();
//     }
//   }, []);

//   const getPeopleWithNickName = async (nickName) => {
//     setData(await UserApi.searchUserByNickName(nickName,userId));
//   };

//   const getFriends = async () => {};

//   const getFollowers = async () => {
//     const user = await UserApi.getUserWithId(userId);
//     setData(user.follower);
//   };

//   const getFollowings = async () => {
//     const user = await UserApi.getUserWithId(userId);
//     setData(user.following);
//   };

//   const backAction = () => {
//     navigation.goBack();
//   };

//   const showProfile = (index) => {
//     var peopleId;
//     if(type[0]===route.params.type){
//       peopleId = data[index].id;
//     }
//     else peopleId = data[index].userId;
//     navigation.navigate('PeopleProfile',{peopleId: peopleId,userType: userType});
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={backAction} style={styles.backBtn}>
//           <MaterialIcons name="arrow-back" size={32} color="black" />
//         </TouchableOpacity>
//         <View
//           style={{
//             flex: 1,
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             paddingHorizontal: 10,
//           }}
//         >
//           <Text style={styles.text1}>{title}</Text>
//           <MaterialIcons name={iconName} size={30} color="black" />
//         </View>
//       </View>
//       <View style={styles.body}>
//         {data.length !== 0 ? (
//           data.map((item, index) => (
//             <View key={index} style={{paddingHorizontal: 10}}>
//               <PeopleLine
//                 source={{ uri: item.avatar }}
//                 text={item.nickName}
//                 type={item.type}
//                 onPress={() => {
//                   showProfile(index);
//                 }}
//                 size={60}
//               />
//             </View>
//           ))
//         ) : (
//           <View style={styles.noResultView}>
//             <Text style={{ fontFamily: "AndikaNewBasic", fontSize: 16 }}>
//               No Result
//             </Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default ListPeopleScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   header: {
//     flexDirection: "row",
//     paddingHorizontal: 10,
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 5,
//     borderBottomColor: colors.color6,
//     borderBottomWidth: 1.4,
//     paddingBottom: 10,
//   },
//   text1: {
//     fontFamily: "AndikaNewBasic",
//     fontSize: 20,
//     paddingBottom: 7,
//   },
//   body: {
//     flex: 1,
//   },
//   noResultView: {
//     backgroundColor: colors.color6,
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//   },
// });
