import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

const Login = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const loginHandler = () => {
    console.log('Login')
  }

  return (
    <View style={{
      flex: 1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <Text style={{fontSize: 30, margin:20}}>Welcome</Text>
    <View style={{
      width:'70%'
    }} >
      <TextInput
      style={styles.input}
      placeholder='Email'
      value={email}
      onChange={setemail}
      />
      <TextInput
      secureTextEntry={true}
      style={styles.input}
      placeholder='password'
      value={password}
      onChange={setpassword}
      />
      
    </View>
    <Button 
    disabled={!email || !password}
    style={styles.addBtn} 
    onPress={loginHandler}>
      Login
    </Button>
    <Text style={{fontSize: 15, margin:20}}>Or</Text>
   <TouchableOpacity style={{}} onPress={'register'}>
    <Text>Register</Text>
   </TouchableOpacity>
      
    </View>
  )
}

export default Login


const styles = StyleSheet.create({
  addBtn: {
    width:150,
    height: 50,
    justifyContent: 'center',
    alignSelf:'center',
    marginTop: 24,
    padding: 8,
    backgroundColor: '#900',
    color: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    elevation:6
  },
  input: {
   borderColor:'#fafafa',
   borderWidth:1,
   marginVertical:15,
   fontSize:15
  }
});