import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { apiPost } from '../../utils/utils';
import { OTP_API, SIGNUP_API } from '../../config/urls';
import { useNavigation, useRoute } from '@react-navigation/native';
const OTPScreen = () => {

    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const navigation = useNavigation();
    const route = useRoute();
    const [timer, setTimer] = useState(60);
    const [showResendButton, setShowResendButton] = useState(false);
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
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 1) {
                    return prevTimer - 1;
                } else {
                    clearInterval(intervalId);
                    setShowResendButton(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleResendOTP = async () => {
        setTimer(60);
        setShowResendButton(false);
        setError("");

        const intervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 1) {
                    return prevTimer - 1;
                } else {
                    clearInterval(intervalId);
                    setShowResendButton(true);
                    return 0;
                }
            });
        }, 1000);
        await apiPost(SIGNUP_API, {
            email: email,
            password: password,
            role: role,
        });
        //   Alert.alert('Thành công', 'Đã gửi lại mã OTP');
    };

    const handleVerifyOTP = async () => {
        const enteredOtp = otp.join('');
        console.log(enteredOtp);
        try {
            const res = await apiPost(OTP_API, {
                email: email,
                password: password,
                role: role,
                otp: enteredOtp,
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
    };
    const renderOtpInputs = () => {
        return otp.map((digit, index) => (
            <TextInput
                key={index}
                style={[
                    styles.otpInput,
                    { borderColor: digit !== '' ? 'transparent' : 'black' },
                ]}
                onChangeText={(value) => handleOtpChange(index, value)}
                value={digit}
                keyboardType="numeric"
                maxLength={1}
                ref={(input) => (this[`otpInput${index}`] = input)}
            />
        ));
    };
    const handleOtpChange = (index, value) => {

        if (isNaN(value)) {
            return; // Allow only numeric input
        }

        const newOtp = [...otp];
        newOtp[index] = value;

        if (index < 5 && value !== '') {
            // Move focus to the next input
            this[`otpInput${index + 1}`].focus();
        }

        setOtp(newOtp);
    };
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <Text style={styles.headerText}>Xác thực OTP</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>

                <Text style={styles.title}>Nhập OTP</Text>
                <View style={styles.otpContainer}>{renderOtpInputs()}</View>
                <Text style={{ color: 'red', marginVertical: 10 }} >{error}</Text>
                <TouchableOpacity style={styles.submitButton} onPress={handleVerifyOTP}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                {showResendButton ? (
                    <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
                        <Text style={styles.resendButtonText}>Resend OTP</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.timerText}>Mã OTP còn {timer} giây</Text>
                )}
            </View>
        </View>

    );
};

const styles = StyleSheet.create({

    headerText: {
        fontSize: 28,
        marginVertical: 20,
        fontWeight: '900',
        color: 'black'


    },
    container: {
        flex: 1,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black'
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center', // Center the content vertically
        marginBottom: 20,
    },
    otpInput: {
        borderWidth: 0.5,
        fontSize: 15,
        width: 40,
        height: 40,
        textAlign: 'center',
        marginHorizontal: 5,
        borderRadius: 5,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 9,
        borderWidth: 1,
        marginTop: 5
    },
    submitButtonText: {
        color: 'black',
        fontSize: 16,

    },
    resendButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 9,
        backgroundColor: 'black',
        borderWidth: 1,

    },
    resendButtonText: {
        color: 'white',
        fontSize: 16,
    },
    timerText: {
        marginTop: 10,
        fontSize: 14,
    },
});

export default OTPScreen;
