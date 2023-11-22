import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Pressable } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native';
const AddDiscount = ({ navigation }) => {
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={30} color={'black'} />
                    </Pressable>
                    <Text style={styles.headerText}> Thêm Giảm Giá </Text>

                </View>
            </View>
            <View style={styles.horizontalLine} />
            <View >
                <Text> Tên chương trình </Text>
                <TextInput
                    style={styles.inputField}

                    multiline={true}


                    placeholder={'nhập tên chương trình '}
                />
            </View>
        </View>
    )
}

export default AddDiscount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        height: 70,
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: '5%',

    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: '15%'
    }, horizontalLine: {
        marginTop: 10,
        width: '75%',
        alignSelf: 'center',
        borderColor: '#999999',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
})