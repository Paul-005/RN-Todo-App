import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, Modal, Alert } from "react-native";
import { Card, Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

//file imports
import NewTodo from "./newTodo";
import firebase from "firebase";

const db = firebase.firestore();

function Home({ navigation }) {
  const [Todos, setTodos] = useState([]);
  const [Pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetchTodos();
    }, 1000);
  }, []);

  function fetchTodos() {
    try {
      db.collection("Todos")
        .where("uid", "==", firebase.auth().currentUser.uid)
        .onSnapshot(function (querySnapshot) {
          setTodos(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              todo: doc.data().todo,
            }))
          );
          console.log(Todos);
          setPending(false);
        });
    } catch (err) {
      setError(err);
    }
  }

  const deleteTodo = (id) => {
    db.collection("Todos")
      .doc(id)
      .delete()
      .then(() => console.log("deleted"))
      .catch((err) => console.log(err));
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    fetchTodos();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={modal} animationType="slide">
        <NewTodo setModal={setModal} />
      </Modal>
      {Pending && (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <LottieView
            source={require("../../assets/json-animation/loading-anim.json")}
            autoPlay
            loop
          />
        </View>
      )}

      {error && (
        <View style={{ justifyContent: "center", flex: 1, marginTop: 250 }}>
          <Text
            style={{
              fontStyle: "italic",
              fontSize: 20,
              textAlign: "center",
              color: "red",
            }}
          >
            Error: {error}
          </Text>
          <Button color="green" onPress={fetchTodos}>
            Retry
          </Button>
        </View>
      )}

      {Todos.length === 0 ? (
        <Animatable.View animation="fadeInLeftBig">
          <Card style={[styles.card, { backgroundColor: "tomato" }]}>
            <Card.Title title="Nothing To Do. " />
          </Card>
        </Animatable.View>
      ) : null}

      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={Todos}
        renderItem={({ item }) => (
          <Animatable.View animation="fadeInLeftBig">
            <Card style={styles.card}>
              <Card.Title title={item.todo} />
              <Card.Actions>
                {item.completed && (
                  <Ionicons
                    style={styles.completed}
                    name="checkmark-done-circle"
                    size={24}
                    color="green"
                    title="completd"
                  />
                )}

                <MaterialIcons name="pending-actions" size={24} color="black" />
                <Button
                  color="dodgerblue"
                  style={styles.completedBtn}
                  onPress={() => deleteTodo(item.id)}
                >
                  Completed
                </Button>

                <MaterialIcons
                  onPress={() => deleteTodo(item.id)}
                  name="delete-forever"
                  size={30}
                  color="red"
                />
              </Card.Actions>
            </Card>
          </Animatable.View>
        )}
      />
      <AntDesign
        onPress={() => setModal(true)}
        style={styles.fab}
        name="pluscircle"
        size={50}
        color="tomato"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 4,
    bottom: 0,
  },
  completedBtn: {
    backgroundColor: "gold",
    marginHorizontal: 20,
  },
});

function Stack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          header: () => {},
        }}
      />
    </Stack.Navigator>
  );
}

export default Stack;
