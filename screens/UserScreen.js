// screens/UserScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Vibration, Alert, Button } from "react-native";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export default function UserScreen({ navigation }) {
  // Destructure navigation prop
  useEffect(() => {
    // Create a query to listen to the latest vibration
    const q = query(
      collection(db, "vibrations"),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            Vibration.vibrate();
            Alert.alert(
              "Vibration Triggered",
              "You have received a vibration from admin."
            );
          }
        });
      },
      (error) => {
        console.log("Error listening to vibrations:", error);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const navigateToAdmin = () => {
    navigation.navigate("Admin");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Screen</Text>
      <Text>Waiting for vibration triggers...</Text>
      <View style={styles.spacer} />
      <Button title="Go to Admin Screen" onPress={navigateToAdmin} />
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
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  spacer: {
    height: 20, // Adds space between text and button
  },
});
