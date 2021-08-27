import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import firebase from "firebase";

const ChangePF = ({ navigation }) => {
  const [displayname, setDisplayname] = useState("");

  const ChangeProfile = () => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: displayname,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
      .then(() => {
        navigation.navigate("Profile");
      })
      .catch((error) => {
        Alert.alert(error.code, error.message);
      });
  };

  const sendEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        alert("Please Check your Inbox ");
      })
      .catch((err) => Alert.alert(err.code, err.message));
  };
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.name,
          { textAlign: "center", margin: 10, fontWeight: "bold" },
        ]}
      >
        Change Profile
      </Text>
      <Image
        source={{
          uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
        }}
        style={styles.avatar}
      />
      <View style={[styles.inputContainer, { height: 100 }]}>
        <TextInput
          mode="outlined"
          label="Name"
          placeholder="Enter Your Name here.."
          style={styles.input}
          onChangeText={(value) => setDisplayname(value)}
        />
      </View>
      <Button style={styles.submitBtn} color="black" onPress={ChangeProfile}>
        Change Profile
      </Button>
      <Button
        onPress={sendEmail}
        style={[styles.submitBtn, { backgroundColor: "lightgreen" }]}
        color="grey"
      >
        Verify Email
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: "600",
    marginTop: 30,
  },
  body: {
    marginTop: 40,
    alignItems: "center",
  },
  input: {
    width: "80%",
  },
  inputContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  submitBtn: {
    margin: 20,
    backgroundColor: "tomato",
    width: 200,
    alignSelf: "center",
  },
});

export default ChangePF;
