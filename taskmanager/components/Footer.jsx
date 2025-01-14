import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'



const Footer = () => {
  
const navigation = useNavigation()
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 30 ,backgroundColor:"#fff" }}>
    <TouchableOpacity onPress={() => navigation.navigate('home')}>
      <Icon name='home' size={30} color={'#900'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
      <Icon name='user' size={30} color={'#900'} />
    </TouchableOpacity>
    </View>
  )
}

export default Footer