import {
    Image,
    Pressable,
    StyleSheet,
    Text,

    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState } from 'react';
const Password = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.rowHeader}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={30} color={'black'} />
                        </Pressable>
                        <Text style={styles.titleText}>Đổi mật khẩu  </Text>

                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Password

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    header: {
        height: 60,
        justifyContent: 'center',
        marginTop: 10
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginRight: 70


    },
    titleText: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
    },
})