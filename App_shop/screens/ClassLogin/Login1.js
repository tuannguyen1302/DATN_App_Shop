import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Login1 = () => {

    const navigation = useNavigation();
    const loginFacebook = () => {
        alert("facebook");

    };
    const loginGmail = () => {
        alert("gmail");
    }
    const Signup = () => {
        navigation.navigate('SignUp');
    }
    const LoginWithPassword = () => {

        navigation.navigate('LoginWithPassword');
    };




    return (


        <View style={styles.container}>
            <View style={{}}>
                <Image source={require("../../assets/logo12.png")} style={styles.logo} />
            </View>
            <Text style={{ color: '#000000', fontSize: 40, textAlign: 'center', marginBottom: 47, }}>Let's You In </Text>

            <TouchableOpacity style={styles.button} onPress={loginFacebook} >

                <Entypo name='facebook-with-circle' size={40} color={'#2421EB'} />

                <Text style={styles.buttonText}>Continue with Facebook </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={loginGmail} >
                <AntDesign name='googleplus' size={40} color={'#FF0404'} />
                <Text style={styles.buttonText}>Continue with Google </Text>
            </TouchableOpacity>
            <View style={{ width: '100%', height: 291 }}>
                <View style={{ backgroundColor: '#FFFFFF', width: '100%', height: 50, flexDirection: 'row' }} >
                    <View style={{ borderWidth: 0.2, width: 150, height: 1, marginLeft: 36, marginTop: 26, color: '#D9D9D9' }}></View>
                    <Text style={{ color: '#585555', fontSize: 22, alignSelf: 'center', margin: 10 }} >Or</Text>
                    <View style={{ borderWidth: 0.2, width: 150, height: 1, marginTop: 26, color: '#D9D9D9' }}></View>
                </View>
                <TouchableOpacity style={styles.buttonloginpassw} onPress={LoginWithPassword} >

                    <Text style={styles.buttonText1}>Continue with Password </Text>
                </TouchableOpacity>
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
        </View>



    )
}

export default Login1

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,

    }, logo: {
        width: 400,
        height: 280,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 10,
    }, button: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 12,
        height: 64,
        width: 365,
        marginBottom: 37,
        borderWidth: 2,

    },
    buttonText: {
        marginLeft: 10,
        fontWeight: "bold",
        color: 'black',
        fontSize: 15,
        textAlign: 'center',


    }, buttonloginpassw: {
        alignSelf: 'center',
        backgroundColor: '#000000',
        justifyContent: 'center',
        borderRadius: 30,
        height: 65,
        width: 354,
        marginTop: 10,
        marginBottom: 30
    }, buttonText1: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 15,
    }
})