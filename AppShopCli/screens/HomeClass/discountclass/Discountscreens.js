

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

const DiscountCodeScreen = ({ navigation }) => {

    const [data, setData] = useState([
        {
            id: '1',
            title: 'Giảm 20% cho đơn hàng trên 500,000 VND',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '30/11/2023',
            conditions: 'Áp dụng cho đơn hàng trên 500,000 VND',
        },
        {
            id: '2',
            title: 'Mua 1 tặng 1 cho sản phẩm XYZ',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '15/12/2023',
            conditions: 'Chỉ áp dụng cho sản phẩm XYZ',
        }, {
            id: '2',
            title: 'Mua 1 tặng 1 cho sản phẩm XYZ',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '15/12/2023',
            conditions: 'Chỉ áp dụng cho sản phẩm XYZ',
        }, {
            id: '2',
            title: 'Mua 1 tặng 1 cho sản phẩm XYZ',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '15/12/2023',
            conditions: 'Chỉ áp dụng cho sản phẩm XYZ',
        }, {
            id: '2',
            title: 'Mua 1 tặng 1 cho sản phẩm XYZ',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '15/12/2023',
            conditions: 'Chỉ áp dụng cho sản phẩm XYZ',
        }, {
            id: '2',
            title: 'Mua 1 tặng 1 cho sản phẩm XYZ',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '15/12/2023',
            conditions: 'Chỉ áp dụng cho sản phẩm XYZ',
        }, {
            id: '2',
            title: 'Mua 1 tặng 1 cho sản phẩm XYZ',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '15/12/2023',
            conditions: 'Chỉ áp dụng cho sản phẩm XYZ',
        }, {
            id: '2',
            title: 'Mua 1 tặng 1 cho sản phẩm XYZ',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '15/12/2023',
            conditions: 'Chỉ áp dụng cho sản phẩm XYZ',
        }, {
            id: '2',
            title: 'Mua 1 tặng 1 cho sản phẩm XYZ',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '15/12/2023',
            conditions: 'Chỉ áp dụng cho sản phẩm XYZ',
        }, {
            id: '2',
            title: 'Mua 1 tặng 1 cho sản phẩm XYZ',
            image: 'https://hinh365.com/wp-content/uploads/2020/03/400-000-banner-thiet-ke-big-sale-giam-gia-tuyet-dep.jpg',
            expiryDate: '15/12/2023',
            conditions: 'Chỉ áp dụng cho sản phẩm XYZ',
        },
        // Thêm các mục voucher khác tương tự
    ]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newDiscountCode, setNewDiscountCode] = useState({
        title: '',
        image: '',
        expiryDate: '',
        conditions: '',
    });


    const renderItem = ({ item }) => (
        <View style={styles.voucherItem}>
            <Image source={{ uri: item.image }} style={styles.voucherImage} />
            <View style={styles.voucherDetails}>
                <Text style={styles.voucherTitle}>{item.title}</Text>
                <Text style={styles.voucherText}>HSD: {item.expiryDate}</Text>
                <Text style={styles.voucherText}>{item.conditions}</Text>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={30} color={'black'} />
                    </Pressable>
                    <Text style={styles.headerText}>Mã Giảm Giá </Text>
                    <Pressable onPress={() => { navigation.navigate('AddDiscount') }}>
                        <AntDesign name="plus" size={30} color={'black'} />
                    </Pressable>
                </View>
            </View>
            <View style={styles.horizontalLine} />

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

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
        justifyContent: 'space-between',
        marginHorizontal: '5%',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',

    }, horizontalLine: {
        marginTop: 10,
        width: '75%',
        alignSelf: 'center',
        borderColor: '#999999',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    voucherItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    voucherImage: {
        width: 100,
        height: 100,
    },
    voucherDetails: {
        flex: 1,
        padding: 10,
    },
    voucherTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    voucherText: {
        fontSize: 14,
        color: '#555',
    }, buttonContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
    }, modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
    },

    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }, modalButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedImage: {
        width: '100%',
        height: 200,
        marginTop: 10,
        resizeMode: 'cover',
        borderRadius: 5,
    },

});

export default DiscountCodeScreen;
