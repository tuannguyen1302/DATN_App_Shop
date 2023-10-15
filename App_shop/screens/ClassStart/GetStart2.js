import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const GetStart2 = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/anh1.jpg")} style={styles.logo} />
      </View>


      <View>
        <Image source={require("../../assets/anh1.jpg")} style={styles.logo} />
      </View>
      <View>
        <Image source={require("../../assets/anh1.jpg")} style={styles.logo} />
      </View>
    </View>
  );
};

export default GetStart2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
