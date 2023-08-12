import { View, Text } from 'react-native'
import React from 'react'
import CheckBox from 'expo-checkbox'

const CustomCheckBox = ({value, text, onChange}) => {
  return (
    <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5}}>
      <CheckBox onValueChange={onChange} value={value} style={{borderColor: 'black'}}/>
      <Text style={{fontFamily: 'AndikaNewBasic',fontSize: 15, marginStart: 5}}>{text}</Text>
    </View>
  )
}

export default CustomCheckBox