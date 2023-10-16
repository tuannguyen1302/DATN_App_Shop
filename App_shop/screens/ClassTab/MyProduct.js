import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import ProductScreen from "./ScreenTab/ProductScreen";

const MyProduct = ({ navigation }) => {
  const [account, setAccount] = useState({
    id: 1,
    name: "Trần Thị Tuấn",
    avatar:
      "https://i.ytimg.com/vi/O8e-2JTo7wk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCopE8gdgNPrSPgRLjpE8arOASMeQ",
    nameShop: "❤️ shop yêu thích ",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Logout, Shop */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.replace("LoginWithPassword")}>
          <AntDesign name="logout" size={35} />
        </Pressable>
        <View style={styles.headerShop}>
          <Image style={styles.avatarShop} source={{ uri: account.avatar }} />
          <View style={{ right: "10%" }}>
            <Text style={styles.name}>{account.name}</Text>
            <Text style={styles.nameShop}>{account.nameShop}</Text>
          </View>
          <TouchableOpacity>
            <AntDesign name="exclamationcircle" size={40} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Tab Product */}
      <ProductScreen navigation={navigation} id={account.id} />
      {/* Button Add Product */}
      <Pressable style={styles.btnAdd}>
        <Feather name="plus-square" size={20} color={"white"} />
        <Text style={styles.txtAdd}>Thêm 1 sản phẩm mới</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MyProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: "20%",
    marginHorizontal: "3%",
  },
  headerShop: {
    height: "60%",
    marginTop: "3%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F8F8F8",
  },
  avatarShop: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
  },
  nameShop: {
    fontSize: 16,
    fontWeight: "400",
  },
  btnAdd: {
    width: 200,
    height: 45,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: "2%",
    justifyContent: "center",
    backgroundColor: "black",
  },
  txtAdd: {
    color: "white",
    left: "10%",
  },
});
