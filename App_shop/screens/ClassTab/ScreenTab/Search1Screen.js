import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";

const Search1Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={40} />
        </Pressable>
        <Pressable
          style={styles.searchHeader}
          onPress={() => navigation.navigate("Search2Screen")}
        >
          <View style={styles.view}>
            <AntDesign name="search1" size={30} />
            <Text style={{ left: "20%" }}>Nhập từ khóa</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.nav}>
        <Image source={require("../../../assets/SearchShop.png")} />
      </View>
    </SafeAreaView>
  );
};

export default Search1Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchHeader: {
    flex: 0.9,
    height: 50,
    left: "20%",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
  },
  view: {
    opacity: 0.5,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "5%",
  },
  nav: {
    flex: 1,
    marginTop: "2%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
  },
});
