import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as firebase from "firebase";
import * as Notifications from "expo-notifications";

// file imports
import Login from "./screens/auth/login";
import SignUp from "./screens/auth/signUp";
import OnboardingScreen from "./screens/onBoarding/onBoarding";
import Home from "./screens/todo/Home";
import Profile from "./screens/profile/profile";
import ForgotPass from "./screens/auth/forgotPass";
import AboutMe from "./screens/about/about";

//module imports

function StackPage() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoarding"
        component={OnboardingScreen}
        options={{
          title: "OnBoarding",
          header: () => {},
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          header: () => {},
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "SignUp",
          header: () => {},
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPass}
        options={{
          title: "ForgotPass",
        }}
      />
    </Stack.Navigator>
  );
}

function Drawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Todos" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="About Us" component={AboutMe} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(true);

  const onAuthStateChanged = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged();
  }, []);

  return (
    <NavigationContainer>
      {user ? <Drawer /> : <StackPage />}
    </NavigationContainer>
  );
}
