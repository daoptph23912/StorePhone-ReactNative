import { View, Text, Image } from 'react-native'
import React from 'react'

import styles from './style';

import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
    const [fontsLoaded] = useFonts({
        'AndikaNewBasic': require('../../../assets/fonts/AndikaNewBasic.ttf'),
        'Rubik-Light': require('../../../assets/fonts/Rubik-Light.ttf'),
        'Roboto-Regular' :require('../../../assets/fonts/Roboto-Regular.ttf')
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 0.8, y: 1 }}
            colors={['#E2FFF1', '#50D0D2']}
            style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../../images/applogo.png")} />
                <Text style={styles.title}>Amazing Posts</Text>
            </View>
        </LinearGradient>
    )
}

export default SplashScreen