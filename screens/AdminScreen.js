// screens/AdminScreen.js
import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function AdminScreen({ navigation }) {
  // Destructure navigation prop
  const triggerVibration = async () => {
    try {
      await addDoc(collection(db, "vibrations"), {
        timestamp: Timestamp.now(),
      });
      Alert.alert("Success", "Vibration triggered for all users.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const navigateToUser = () => {
    navigation.navigate("User");
  };

  return (
    <View style={styles.container}>
      <Button title="Trigger Vibration" onPress={triggerVibration} />
      <View style={styles.spacer} />
      <Button title="Go to User Screen" onPress={navigateToUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  spacer: {
    height: 20, // Adds space between buttons
  },
});
