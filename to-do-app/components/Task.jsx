import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Checkbox, } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Task = ({title,description,status,taskId}) => {

    const [completed, setcompleted] = useState(status)

    const handleCheckbox = () => {
        setcompleted(!completed)
    }

    const deleteHandler = ()=>{
        console.log('delete')
    }

  return (
    <View style={{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    }}>
        <View style={{width:'70%'}}>
          <Text style={{fontSize:20,fontWeight:'bold',marginVertical:5,color:'#900'}}>{title}</Text>
            <Text style={{fontSize:15, color:"#4a4a4a"}}>{description}</Text>
        </View>
       <Checkbox color='#474747'
       status={completed?'checked':'unchecked'} 
       onPress={() => handleCheckbox()} 
       />
       <Icon name='delete' color='#900' size={30} style={{
              backgroundColor:'#f9f9f9',
              padding:10,
              borderRadius:100,
              onPress:()=>{
                deleteHandler()
              }
       }} 
       onPress={() => console.log('delete')} />
    </View>
  )
}

export default Task