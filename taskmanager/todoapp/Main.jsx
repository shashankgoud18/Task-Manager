import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';  
import Login from './screens/Login';
import Profile from './screens/Profile';
import Footer from './components/Footer';
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import Camera from './screens/Camera';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <>
    
    <Stack.Navigator initialRouteName="register">
      <Stack.Screen name="home" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="register" component={Register} options={{headerShown:false}} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="camera" component={Camera}/>
    </Stack.Navigator>
    <Footer/>
 
    </>
  );
};
 
export default Main;