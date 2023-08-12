import {Image, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from './style'

const LogoButton = ({src}) => {
    return (
        <TouchableOpacity activeOpacity={0.7}>
            <Image style={styles.logoBtn} source={src} />
        </TouchableOpacity>
    )
}

export default LogoButton