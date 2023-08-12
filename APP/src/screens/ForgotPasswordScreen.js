import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
const ForgotPasswordScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  const goToAppInfo=()=>{
    
  }
  return (
    <View style={styles.container}>
      <Text></Text>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

    </View>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  infoButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  infoButtonText: {
    color: 'white',
    fontSize: 18,
  },
})