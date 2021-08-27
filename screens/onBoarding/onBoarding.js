import React, { useState, useEffect } from "react";
import { Image } from "react-native";

import { AsyncStorage } from "react-native";

import Onboarding from "react-native-onboarding-swiper";

export default function OnboardingScreen({ navigation }) {
  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("onBoarding");
      if (value !== null) {
        console.log(value);
        if (value == "true") {
          navigation.navigate("Login");
        } else {
          null;
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const storeData = async () => {
    navigation.navigate("Login");
    try {
      await AsyncStorage.setItem("onBoarding", "true");
      console.log("onBoard Done");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Onboarding
      onDone={storeData}
      onSkip={storeData}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ height: 200, width: 200 }}
              source={require("./dummy.png")}
            />
          ),
          title: "Dummy App",
          subtitle: "It's a  Todo App developed by Paul Babu",
        },
        {
          backgroundColor: "gold",
          image: (
            <Image
              style={{ height: 100, width: 100 }}
              source={require("./note.png")}
            />
          ),
          title: "Welcome",
          subtitle: "Welcome to Todo App",
        },
        {
          backgroundColor: "dodgerblue",
          image: (
            <Image
              style={{ height: 100, width: 100 }}
              source={require("./rocket.png")}
            />
          ),
          title: "Get Start",
          subtitle: "Get Start by Adding new todos",
        },
      ]}
    />
  );
}
