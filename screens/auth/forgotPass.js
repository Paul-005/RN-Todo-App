import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  TextInput,
  AsyncStorage,
} from "react-native";
import * as Animatable from "react-native-animatable";
import firebase from "firebase";

export default function ForgotPass({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const reset = async () => {
    navigation.navigate("Login");
    try {
      await AsyncStorage.setItem("onBoarding", "false");
      console.log("onBoard Done");
    } catch (error) {
      alert(error.message);
    }
  };

  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        navigation.goBack(-1);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="slideInDown"
        style={{ height: 100, width: 100 }}
        source={require("../../assets/note.png")}
      />
      <Text style={styles.logo}>Todo App</Text>
      <Animatable.View style={styles.inputView} animation="slideInDown">
        <TextInput
          style={styles.inputText}
          required
          placeholder="Enter your Email here..."
          placeholderTextColor="black"
          onChangeText={(value) => setemail(value)}
        />
      </Animatable.View>

      <TouchableOpacity style={styles.loginBtn} onPress={forgotPassword}>
        <Text style={styles.loginText}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gold",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 35,
    color: "black",
    marginBottom: 40,
    top: 0,
    textAlign: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    backgroundColor: "tomato",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
});
