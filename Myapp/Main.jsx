import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Footer from "./components/Footer";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Camera from "./screens/Camera";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action";
import Loader from "./components/Loader";

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return  (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="camera"
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      
      </Stack.Navigator>

      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
};

export default Main;