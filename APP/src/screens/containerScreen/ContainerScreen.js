import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainScreen from '../mainScreens/MainScreen'
import SignUpScreen from '../signUpScreen/SignUpScreen'
import LoginInScreen from '../loginScreens/LoginInScreen'
import { StatusBar } from 'expo-status-bar'
import styles from '../loginScreens/styles'
import IntroduceScreen from '../introduceScreen/IntroduceScreen'
import EditProfileScreen from '../EditProfileScreen'
import EditProfileDetails from '../EditProfileDetails'
import PeopleProfile from '../PeopleProfile'
import ChangePasswordScreen from '../ChangePasswordScreen'
import ForgotPasswordScreen from '../ForgotPasswordScreen'
import ScreenCart from '../ScreenCart'
import ProductDetail from '../ProductDetail'

const Stack = createNativeStackNavigator();

const FormScreen = () => {
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <StatusBar style='auto' />
                <Stack.Navigator initialRouteName='LogIn'>
                    <Stack.Screen name='Introduce' component={IntroduceScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='LogIn' component={LoginInScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ProductDetailScreen" component={ProductDetail} options={{ headerShown: false }} />
                    <Stack.Screen name="ScreenCart" component={ScreenCart} options={{ headerShown: false }} />

                    <Stack.Screen name='EditProfile' options={{ title: 'Edit profile' }} component={EditProfileScreen} />
                    <Stack.Screen name='EditProfileDetails' options={{ title: 'Profile details' }} component={EditProfileDetails} />
                    <Stack.Screen name='PeopleProfile' options={{ headerShown: false }} component={PeopleProfile} />
                    <Stack.Screen name='ChangePassword' options={{ headerShown: false }} component={ChangePasswordScreen} />
                    <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} component={ForgotPasswordScreen} />
                </Stack.Navigator>
            </View>

        </NavigationContainer>


    )
}



export default FormScreen