import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import styles from './style'
import colors from '../../colors/color'

const Notification = ({ src, textContent, textTime }) => {

    const [backgroundColor, setBackgroundColor] = useState(colors.color3);
    
    const onWatch = () => {
        setBackgroundColor(colors.white);
    }

    return (
        <TouchableOpacity
            activeOpacity={0.4}
            onPress={onWatch}
        >
            <View style={[styles.container,{backgroundColor: backgroundColor}]}>
                <Image source={src} style={styles.img} />
                <View style={styles.content}>
                    <Text
                        ellipsizeMode='tail'
                        style={styles.textContent}
                        numberOfLines={3}>
                        <Text>Phạm Thành Đạo</Text>{textContent}
                    </Text>
                    <Text style={styles.textTime}>{textTime}</Text>
                </View>
            </View>
            <View style={{ height: 1.8, marginHorizontal: 8, backgroundColor: colors.color6 }} />
        </TouchableOpacity>
    )
}

export default Notification;