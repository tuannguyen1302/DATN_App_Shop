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

const SignUp = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [ComFirmpassword, setComFirmpassword] = useState("");
  const loginFacebook = () => {
    // navigation.navigate('GetStart2');
    alert("facebook");
  };
  const [getpassworsvisible, setgetpassworsvisible] = useState(false);
  const [getpassworsvisible1, setgetpassworsvisible1] = useState(false);
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
    } else if (!ComFirmpassword) {
      setError("Mật khẩu không được để trống");
    } else if (ComFirmpassword.length < 6) {
      setError("Mật khẩu trên 6 kí tự");
    } else if (!isValidpass(ComFirmpassword)) {
      setError("Mật khẩu có in hoa , kí tự đặc biệt ");
    } else if (password != ComFirmpassword) {
      setError("Mật khẩu khoong trùng khớp ");
    } else {
      alert("ok ok ");
    }
  };

  const forgotpasswork = () => {
    alert("forgot");
  };
  const loginGmail = () => {
    alert("gmail");
  };
  const Signin = () => {
    navigation.navigate("Login1");
  };

  return (
    <SafeAreaView style={styles.continer}>
      <View>
        <Text
          style={{
            fontSize: 45,
            fontWeight: "bold",
            marginTop: 60,
            textAlign: "center",
          }}
        >
          Create your Account
        </Text>
      </View>
      <View style={styles.formlogin}>
        <View style={styles.nhapemail}>
          <Fontisto name="email" size={25} color={"#999999"} />
          <TextInput
            style={{
              marginLeft: 10,
              color: "black",
              fontSize: 20,
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
                color: "black",
                fontSize: 18,
                flex: 1,
              }}
              defaultValue={password}
              secureTextEntry={getpassworsvisible ? false : true}
              placeholder="Nhập Password"
              textContentType="password"
              onChangeText={(content) => setpassword(content)}
            />
            <TouchableOpacity
              style={{ marginLeft: 3, alignSelf: "center" }}
              onPress={() => setgetpassworsvisible(!getpassworsvisible)}
            >
              {getpassworsvisible ? (
                <Entypo name="eye" size={25} color={"black"} />
              ) : (
                <Feather name="eye-off" size={25} color={"black"} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nhappass}>
          <View style={{ flexDirection: "row", marginHorizontal: "5%" }}>
            <Entypo name="lock" size={25} color={"#999999"} />
            <TextInput
              style={{
                marginLeft: 10,
                color: "black",
                fontSize: 18,
                flex: 1,
              }}
              defaultValue={ComFirmpassword}
              secureTextEntry={getpassworsvisible1 ? false : true}
              placeholder="ComFirm Password"
              textContentType="password"
              onChangeText={(content) => setComFirmpassword(content)}
            />
            <TouchableOpacity
              style={{ marginLeft: 3, alignSelf: "center" }}
              onPress={() => setgetpassworsvisible1(!getpassworsvisible1)}
            >
              {getpassworsvisible1 ? (
                <Entypo name="eye" size={25} color={"black"} />
              ) : (
                <Feather name="eye-off" size={25} color={"black"} />
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
            checkedColor="black" // Màu cho trạng thái đã chọn
            uncheckedColor="black" // Màu cho trạng thái chưa chọn
            containerStyle={{ backgroundColor: "white", borderWidth: 0 }} // Màu nền của container
            onPress={() => setIsChecked(!isChecked)}
          />
        </View>
        <View style={{ height: 130 }}>
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
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 10,
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
            Do you have an account?{" "}
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
              onPress={Signin}
            >
              Sign In
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  continer: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  formlogin: {
    height: 280,
    marginTop: "5%",
  },
  nhapemail: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    borderRadius: 10,
    height: 60,
    width: 360,
  },
  nhappass: {
    alignSelf: "center",
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    borderRadius: 10,
    height: 60,
    width: 360,
    marginTop: "3%",
  },
  button: {
    width: 70,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
