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
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsUWtnnpfv3wlZa76X5wfPhr25sJfRlFE",
  authDomain: "carcart-paul.firebaseapp.com",
  projectId: "carcart-paul",
  storageBucket: "carcart-paul.appspot.com",
  messagingSenderId: "98215944364",
  appId: "1:98215944364:web:f0165358f84d00a6edbf09",
  measurementId: "G-QYL88F0B8N",
};

// Initialize Firebase
try {
  if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
  }
} catch (err) {
  console.log(err);
}

export default function Login({ navigation }) {
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

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log("Logged iN");
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
          keyboardType="email-address"
        />
      </Animatable.View>

      <Animatable.View style={styles.inputView} animation="slideInDown">
        <TextInput
          required
          animationType
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="black"
          onChangeText={(value) => setpassword(value)}
        />
      </Animatable.View>

      <TouchableOpacity style={styles.loginBtn} onPress={signIn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text>Forgot Password? </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset}>
        <Text>Reset? </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>Don't Have An Account? Signup</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 30 }}>Created By Paul</Text>
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
    borderWidth: 3,
    borderColor: "tomato",
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
    fontSize: 15,
    textTransform: "uppercase",
  },
});
