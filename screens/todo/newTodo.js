import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";

export default function NewTodo({ setModal }) {
  const [newTodo, setnewTodo] = useState("");

  const db = firebase.firestore();

  const TodoPOST = () => {
    db.collection("Todos")
      .add({
        todo: newTodo,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        uid: firebase.auth().currentUser.uid,
        completed: false,
      })
      .then(() => setModal(false))
      .catch((err) => alert(JSON.stringify(err)));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => setModal(false)}>
        <AntDesign name="closecircle" size={40} color="tomato" />
      </TouchableOpacity>
      <Image source={require("../../assets/note.png")} style={styles.noteImg} />
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="New Todo"
            placeholder="Type something"
            style={styles.input}
            onChangeText={(value) => setnewTodo(value)}
          />
        </View>
      </View>
      <Button onPress={TodoPOST} style={styles.addBtn} color="black">
        Add New Todo
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    width: "100%",
    bottom: 40,
  },
  inputContainer: {
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 80,
    flexDirection: "row",
    borderRadius: 100,
  },
  noteImg: {
    height: 120,
    width: 120,
    borderRadius: 20,
    margin: 10,
  },
  input: {
    width: "100%",
    borderRadius: 100,
  },
  dateView: {
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    margin: 20,
    backgroundColor: "tomato",
  },
});
