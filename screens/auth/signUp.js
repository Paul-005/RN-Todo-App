import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import firebase from "firebase";

export default function SignUp({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const SignUpHook = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
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

      <TouchableOpacity style={styles.loginBtn} onPress={SignUpHook}>
        <Text style={styles.loginText}>SignUp</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Already Have An Account? Login</Text>
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
  },
  inputViewName: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 4,
    borderColor: "red",
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
