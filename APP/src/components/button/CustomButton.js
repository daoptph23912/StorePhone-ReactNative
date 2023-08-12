import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import styles from './style'
import colors from '../../colors/color'

const CustomButton = ({text,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.3}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                colors={[colors.color1, colors.color2]}
                style={styles.button}>
                <Text style={styles.label}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default CustomButton