import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import { CheckBox } from "react-native-elements";

const LoginWithPassword = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const loginFacebook = () => {
    // navigation.navigate('GetStart2');
    alert("facebook");
  };
  const [getpassworsvisible, setgetpassworsvisible] = useState(false);

  const [error, setError] = useState("");
  // kiểm tra validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  // kiểm tra validate password
  const isValidpass = (password) => {
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    return passRegex.test(password);
  };
  // check đăng nhập
  const checkLogin = () => {
    setError(""); // Đặt lại thông báo lỗi

    if (!username) {
      setError("Email không được để trống");
    } else if (!isValidEmail(username)) {
      setError("Email không đúng định dạng");
    } else if (!password) {
      setError("Mật khẩu không được để trống");
    } else if (password.length < 6) {
      setError("Mật khẩu trên 6 kí tự");
    } else if (!isValidpass(password)) {
      setError("Mật khẩu có in hoa , kí tự đặc biệt ");
    } else {
      navigation.replace("BottomTab", { screen: "MyProduct" });
    }
  };

  const forgotpasswork = () => {
    alert("forgot");
  };
  const loginGmail = () => {
    alert("gmail");
  };
  const Signup = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView aView style={styles.continer}>
      <View>
        <Text
          style={{
            fontSize: 45,
            fontWeight: "bold",
            marginTop: 80,
            textAlign: "center",
          }}
        >
          Login to your Account
        </Text>
      </View>
      <View style={styles.formlogin}>
        <View style={styles.nhapemail}>
          <Fontisto name="email" size={25} color={"#999999"} />
          <TextInput
            style={{
              marginLeft: 10,
              color: "#000000",
              fontSize: 18,
              width: 290,
            }}
            defaultValue={username}
            placeholder="Nhập Email"
            keyboardType="email-address"
            onChangeText={(content) => setusername(content)}
          />
        </View>

        <View style={styles.nhappass}>
          <View style={{ flexDirection: "row", marginHorizontal: "5%" }}>
            <Entypo name="lock" size={25} color={"#999999"} />
            <TextInput
              style={{
                marginLeft: 10,
                color: "#000000",
                fontSize: 18,
                width: 250,
              }}
              defaultValue={password}
              secureTextEntry={getpassworsvisible ? false : true}
              placeholder="Nhập Password"
              textContentType="password"
              onChangeText={(content) => setpassword(content)}
            />
            <TouchableOpacity
              style={{ marginLeft: 3 }}
              onPress={() => setgetpassworsvisible(!getpassworsvisible)}
            >
              {getpassworsvisible ? (
                <Entypo name="eye" size={25} color={"#000000"} />
              ) : (
                <Feather name="eye-off" size={25} color={"#000000"} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {error ? (
          <Text style={{ color: "red", marginLeft: 40 }}>{error}</Text>
        ) : null}
        <View style={{ marginLeft: "5%" }}>
          <CheckBox
            title="Remember me "
            checked={isChecked}
            checkedColor="#000000" // Màu cho trạng thái đã chọn
            uncheckedColor="#000000" // Màu cho trạng thái chưa chọn
            containerStyle={{ backgroundColor: "white", borderWidth: 0 }} // Màu nền của container
            onPress={() => setIsChecked(!isChecked)}
          />
        </View>
        <View style={{ height: 146 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              height: 60,
              width: 350,
              alignSelf: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginTop: "4%",
            }}
            onPress={checkLogin}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 25 }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "black",
                alignSelf: "center",
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
              onPress={forgotpasswork}
            >
              Forgot the password ?
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderWidth: 0.2,
              width: 100,
              height: 1,
              marginLeft: 30,
              marginTop: 26,
              color: "#D9D9D9",
            }}
          />
          <Text
            style={{
              color: "#585555",
              fontSize: 18,
              alignSelf: "center",
              margin: 10,
            }}
          >
            or continue with
          </Text>
          <View
            style={{
              borderWidth: 0.2,
              width: 100,
              height: 1,
              marginTop: 26,
              color: "#D9D9D9",
            }}
          />
        </View>
        <View
          style={{
            marginTop: "5%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={loginFacebook}>
            <Entypo name="facebook-with-circle" size={40} color={"#2421EB"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={loginGmail}>
            <AntDesign name="googleplus" size={40} color={"#FF0404"} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 68,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#7B7070", alignSelf: "center" }}>
            Don't have an account?{" "}
          </Text>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
                alignSelf: "center",
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
              onPress={Signup}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginWithPassword;

const styles = StyleSheet.create({
  continer: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  formlogin: {
    height: 286,
    marginTop: 63,
  },
  nhapemail: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    justifyContent: "flex-start",
    borderRadius: 12,
    height: 64,
    width: 365,
    marginBottom: 27,
    padding: 20,
  },
  nhappass: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    borderRadius: 10,
    height: 64,
    width: 365,
  },
  buttonText: {
    marginLeft: 24,
    fontWeight: "bold",
    color: "#999999",
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    width: 82,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
