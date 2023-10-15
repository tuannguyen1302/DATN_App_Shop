import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import * as Progress from "react-native-progress";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("GetStart2");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}> Welcome Welcome </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 90,
          }}
        >
          <Text style={styles.text}> Welcome </Text>
        </View>
      </View>
      <Image source={require("../../assets/logo1.png")} style={styles.logo} />
      <Progress.CircleSnail
        size={50}
        thickness={4}
        color={["white", "white", "white"]}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 400,

    marginBottom: 100,
  },
  text: { color: "#ffff", fontSize: 32, fontWeight: "bold" },
});
