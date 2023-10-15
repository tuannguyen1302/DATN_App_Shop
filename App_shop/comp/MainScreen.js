// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function HomeScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../assets/anh1.jpg')} style={styles.logo} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
