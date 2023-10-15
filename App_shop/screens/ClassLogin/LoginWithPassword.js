import { StatusBar, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import { CheckBox } from 'react-native-elements';



const LoginWithPassword = () => {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("")
    const loginFacebook = () => {

        // navigation.navigate('GetStart2');
        alert("facebook");

    };
    const [getpassworsvisible, setgetpassworsvisible] = useState(false);

    const [error, setError] = useState('');
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
        setError(''); // Đặt lại thông báo lỗi

        if (!username) {
            setError('Email không được để trống');
        } else if (!isValidEmail(username)) {
            setError('Email không đúng định dạng');
        } else if (!password) {
            setError('Mật khẩu không được để trống');
        } else if (password.length < 6) {
            setError('Mật khẩu trên 6 kí tự');
        } else if (!isValidpass(password)) {
            setError('Mật khẩu có in hoa , kí tự đặc biệt ');
        }
        else {
            alert("ok ok ");
        }
    }

    const forgotpasswork = () => {
        alert("forgot");
    }
    const loginGmail = () => {
        alert("gmail");
    }
    const Signup = () => {
        navigation.navigate('SignUp');
    }

    return (
        <SafeAreaView style={styles.continer}>
            <View>
                <Text style={{ fontSize: 48, fontWeight: 'bold', marginTop: 80, textAlign: 'center' }}> Login to your Account </Text>
            </View>
            <View style={styles.formlogin}>

                <View style={styles.nhapemail}>
                    <Fontisto name='email' size={30} color={'#999999'} />
                    <TextInput
                        style={{ marginLeft: 10, color: '#000000', fontSize: 20, width: 290, }}
                        defaultValue={username}
                        placeholder="Nhập Email"
                        keyboardType="email-address"
                        onChangeText={(content) => setusername(content)}
                    />

                </View>

                <View style={styles.nhappass}>
                    <Entypo name='lock' size={30} color={'#999999'} />
                    <TextInput
                        style={{ marginLeft: 10, color: '#000000', fontSize: 20, width: 250, }}
                        defaultValue={password}
                        secureTextEntry={getpassworsvisible ? false : true}
                        placeholder="Nhập Password"

                        textContentType="password"
                        onChangeText={(content) => setpassword(content)}
                    />
                    <TouchableOpacity style={{ width: 40, height: 40, marginLeft: 3, }}
                        onPress={() => setgetpassworsvisible(!getpassworsvisible)}
                    >
                        {getpassworsvisible ? <Entypo name='eye' size={35} color={'#000000'} />
                            :
                            <Feather name='eye-off' size={30} color={'#000000'} />
                        }
                    </TouchableOpacity>
                </View>
                {error ? <Text style={{ color: 'red', marginLeft: 40 }}>{error}</Text> : null}
                <View style={{ backgroundColor: '#FFFFFF', width: 200, marginLeft: 40 }}>
                    <CheckBox
                        style={{ borderWidth: 0 }}
                        title='Remember me '
                        checked={isChecked}
                        checkedColor='#000000' // Màu cho trạng thái đã chọn
                        uncheckedColor='#000000' // Màu cho trạng thái chưa chọn
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }} // Màu nền của container
                        onPress={() => setIsChecked(!isChecked)}

                    />
                </View>
                <View style={{ height: 146 }}>
                    <TouchableOpacity style={{ backgroundColor: '#000000', height: 65, width: 355, alignSelf: 'center', justifyContent: 'center', borderRadius: 30, marginTop: 20 }}

                        onPress={checkLogin} >
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 25, }}>Sign In  </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ fontSize: 18, color: '#000000', alignSelf: 'center', fontWeight: '900' }}
                            onPress={forgotpasswork}
                        >Forgot the password ?</Text>
                        <View style={{ borderWidth: 0.2, width: 190, height: 1, color: '#D9D9D9', alignSelf: 'center' }}></View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFFFF', width: '100%', height: 50, flexDirection: 'row' }} >
                    <View style={{ borderWidth: 0.2, width: 100, height: 1, marginLeft: 30, marginTop: 26, color: '#D9D9D9' }}></View>
                    <Text style={{ color: '#585555', fontSize: 18, alignSelf: 'center', margin: 10 }} >or continue with</Text>
                    <View style={{ borderWidth: 0.2, width: 100, height: 1, marginTop: 26, color: '#D9D9D9' }}></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 90, marginLeft: 90, marginTop: 10, marginBottom: 15 }}>
                    <TouchableOpacity style={styles.button} onPress={loginFacebook} >
                        <Entypo name='facebook-with-circle' size={40} color={'#2421EB'} />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={loginGmail} >
                        <AntDesign name='googleplus' size={40} color={'#FF0404'} />

                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 68, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#7B7070', alignSelf: 'center' }} >Don't have an account ? </Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#000000', alignSelf: 'center', fontWeight: '900' }}
                            onPress={Signup}
                        >Sign Up </Text>
                        <View style={{ borderWidth: 0.2, width: 70, height: 1, color: '#D9D9D9' }}></View>
                    </View>
                </View>

            </View>


        </SafeAreaView>
    )
}




export default LoginWithPassword

const styles = StyleSheet.create({

    continer: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    formlogin: {
        height: 286,
        marginTop: 63,

    }, nhapemail: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        justifyContent: 'flex-start',
        borderRadius: 12,
        height: 64,
        width: 365,
        marginBottom: 27,
        padding: 20

    }, nhappass: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        justifyContent: 'flex-start',
        borderRadius: 12,
        height: 64,
        width: 365,
        marginBottom: 10,
        padding: 20

    },
    buttonText: {
        marginLeft: 24,
        fontWeight: "bold",
        color: '#999999',
        fontSize: 15,
        textAlign: 'center',
    },
    button: {
        width: 82,
        height: 64,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }
})