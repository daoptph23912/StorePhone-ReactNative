import { View, Text, FlatList } from 'react-native'
import React from 'react'

import styles from './style'
import Notification from '../../components/nofitications/Notification'

const NotificationScreen = () => {

  const arr = [1, 2, 3, 4, 5, 6 ,7,8,9,10];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
      <View style={styles.body}>
        <FlatList
        showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={arr}
          renderItem={(item) => {
            return (
              <Notification
                src={require('../../images/avatarDefault.png')}
                textContent='postsed a new posts : ""'
                textTime='11 th 12, 2023'
              />
            )
          }}
        />
      </View>
    </View>
  )
}

export default NotificationScreen