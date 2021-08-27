import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// file imports
import firebase from "firebase";
import ChangePF from "./changePF";

function Profile({ navigation }) {
  const user = firebase.auth().currentUser;

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => null)
      .catch((error) => {
        Alert.alert(error.code, error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        }}
        style={styles.header}
      />
      <Image
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />
      <View style={styles.body}>
        {user.displayName !== null && (
          <Text style={styles.name}>{user.displayName}</Text>
        )}

        <Text style={styles.info}> {user.email}</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
          electram expetendis, omittam deseruisse consequuntur ius an,
        </Text>

        <TouchableOpacity style={styles.buttonContainer} onPress={signOut}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("ChangePF")}
        >
          <Text>Change Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
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
  info: {
    fontSize: 16,
    color: "black",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
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
  },
});

function Stack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          header: () => {},
        }}
      />
      <Stack.Screen
        name="ChangePF"
        component={ChangePF}
        options={{
          title: "ChangePF",
          header: () => {},
        }}
      />
    </Stack.Navigator>
  );
}

export default Stack;
