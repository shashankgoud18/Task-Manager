import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Register = ({ navigation }) => {
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerHandler = () => {
        console.log('Register');
    };

    const imageHandler = () => {
      
        
    };

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Avatar.Image 
                style={{ backgroundColor: "#900" }} 
                source={{ uri: avatar ? avatar : null }} 
                size={100} 
            />
            <TouchableOpacity 
                onPress={imageHandler} 
                style={{ marginVertical: 10 }}
            >
                <Text style={{ color: '#900' }}>Change Photo</Text>
            </TouchableOpacity>
            <View style={{ width: '70%' }}>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <Button
                disabled={!name || !email || !password}
                style={styles.addBtn}
                onPress={registerHandler}
            >
                Sign Up
            </Button>
            <Text style={{ fontSize: 15, margin: 20 }}>Or</Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={{ color: '#900' }}>Have an Account? Login...</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    addBtn: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 24,
        padding: 8,
        backgroundColor: '#900',
        borderRadius: 100,
        elevation: 6
    },
    input: {
        borderColor: '#fafafa',
        borderWidth: 1,
        marginVertical: 15,
        fontSize: 15
    }
});