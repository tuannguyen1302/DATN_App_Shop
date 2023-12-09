import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { apiPost } from '../../utils/utils';
import { OTP_API, SIGNUP_API } from '../../config/urls';
import { useNavigation, useRoute } from '@react-navigation/native';
const OTPScreen = () => {
    const [otp, setOTP] = useState('');
    const [countdown, setCountdown] = useState(60);
    const navigation = useNavigation();
    const route = useRoute();
    const [error, setError] = useState('');

    // Nhận dữ liệu từ tham số
    const { email, password, role } = route.params || {};

    useEffect(() => {
        // Sử dụng dữ liệu nhận được tại đây nếu cần thiết
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', role);
    }, [email, password, role]);
    // console.log(email);
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [countdown]);

    const handleResendOTP = async () => {
        // Gửi lại mã OTP ở đây
        // Sau khi gửi lại, đặt lại đếm ngược về 60 giây
        setError('');
        setCountdown(60);
        await apiPost(SIGNUP_API, {
            email: email,
            password: password,
            role: role,
        });
        //   Alert.alert('Thành công', 'Đã gửi lại mã OTP');
    };

    const handleVerifyOTP = async () => {


        try {
            const res = await apiPost(OTP_API, {
                email: email,
                password: password,
                role: role,
                otp: otp,
            });

            if (res.status === 200) {
                console.log("đăng kí thành công ");
                navigation.navigate('ShopUpdate');
            } else {
                setError(res.data.message);
                console.log("===============");
            }

        } catch (error) {
            //  console.log(error);
            setError(error.message);
        }
        // Thực hiện xác thực OTP ở đây
        // if (otp === '1234') {
        //     // Xác thực thành công
        //     Alert.alert('Thành công', 'Mã OTP hợp lệ');
        // } else {
        //     // Xác thực thất bại
        //     Alert.alert('Lỗi', 'Mã OTP không hợp lệ');
        // }
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <Text style={styles.headerText}>Xác thực OTP</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: "center", flex: 1 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mã OTP"
                    keyboardType="numeric"
                    value={otp}
                    onChangeText={(text) => setOTP(text)}
                />
                <Text style={{ color: 'red', fontSize: 20, textDecorationLine: 'underline' }}>{error}</Text>
                {countdown > 0 ? (
                    <Text style={styles.countdownText}>Mã OTP còn hiệu lực sau {countdown} </Text>
                ) : (
                    <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
                        <Text style={styles.buttonText}>Gửi lại OTP</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                    <Text style={styles.buttonText}>Xác thực</Text>
                </TouchableOpacity>

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    headerText: {
        fontSize: 28,
        marginVertical: 20,
        fontWeight: '800',
        color: 'black'


    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    button: {
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginVertical: 20
    },
    resendButton: {

        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
    },
    countdownText: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default OTPScreen;
