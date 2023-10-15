import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import MainScreen from './MainScreen';
import { useNavigation } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';






const WelcomeScreen = (navigation) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);
    }, []);


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}> Welcome Welcome </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 90 }}>
                    <Text style={styles.text}> Welcome  </Text>
                </View>
            </View>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Progress.CircleSnail size={50} thickness={4} color={['white', 'white', 'white']} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {

        width: 400,
        height: 400,

        marginBottom: 100
    },
    text: { color: "#ffff", fontSize: 32, fontWeight: 'bold', }
});

export default WelcomeScreen;
