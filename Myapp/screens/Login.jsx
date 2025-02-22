import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
//import { loginSuccess, loadUserFailure, loadUserRequest, loadUserSuccess} from './autuhSlcie'
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action";
import { authSlice, clearError } from "../redux/reducer";
import isAuthenticated from "../redux/reducer";


const Login = ({ navigation }) => {
  const {isAuthenticated, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    console.log("Login attempt with:", email, password);
    dispatch(login(email, password));

    console.log("login")
    
  };

  useEffect(() => {
    console.log("UseEffect triggered");
    console.log("Auth state:", isAuthenticated);
    //console.log("User:", user); 

    console.log(isAuthenticated);
      
    if (isAuthenticated) {
      console.log("Navigating to home...");
      navigation.replace("home"); // Use replace to avoid back button
    }

    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch, alert,isAuthenticated]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>WELCOME</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={Styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          secureTextEntry
          style={Styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button
        disabled={!email || !password}
        style={Styles.btn}
        onPress={loginHandler}
      >
        <Text style={{ color: "#fff" }}>Login</Text>
      </Button>

      {/* // Add this button for testing */}
{/* <Button 
  title="Test Auth State" 
  style={Styles.btn}
  onPress={() => {
    // Manually dispatch the success action
    dispatch(authSlice.actions.loginSuccess({
      user: { id: 1, name: 'Test User' },
      message: 'Manual login success'
    }));
    console.log("Manual dispatch complete");
  }}
/> */}

      <Text
        style={{
          marginTop: 20,
        }}
      >
        Or
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("register")}>
        <Text
          style={{
            color: "#900",
            height: 30,
            margin: 20,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("forgetpassword")}>
        <Text> Forget Password </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const Styles = StyleSheet.create({
  input: {
    color:"#b5b5b5",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },

  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});