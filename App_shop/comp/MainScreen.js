// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <Image source={require('../assets/anh1.jpg')} style={styles.anh1} />
            </View>
            <View style={styles.view2}>
                <Image source={require('../assets/mhc2.jpg')} style={styles.mhc2} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    view1: {
        marginTop: 67,
        marginRight: 30,
        marginBottom: 30,

    },

    mhc2: {
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view2: {

    }

});

export default HomeScreen;
