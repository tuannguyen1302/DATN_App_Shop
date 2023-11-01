import { Alert, FlatList, PermissionsAndroid, Pressable, ScrollView, ScrollViewBase, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Image } from 'react-native-elements';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const UpdateProduct = ({ navigation }) => {
    const [images, setimages] = useState([]);
    // hàm gọi đến thư viện ảnh 
    const OpenCamera = async (isCheck) => {
        try {
            // Kiểm tra quyền
            const checkPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (checkPermission === PermissionsAndroid.RESULTS.GRANTED) {
                const result = isCheck
                    ? // Máy ảnh
                    await launchCamera({
                        mediaType: 'photo',
                        cameraType: 'back',
                    })
                    : // Thư viện
                    await launchImageLibrary({
                        mediaType: 'photo',
                    });
                setimages([...images, { "img": result.assets[0].uri }]);
                console.log(images);
            } else {
                console.log('false');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const Item = ({ title, onDelete }) => (
        <View style={{ marginRight: 20, margin: 20, position: 'relative' }} >
            <View style={{ position: 'relative' }}>
                <Image style={styles.anh} source={{
                    uri: title.img
                }} />
                <AntDesign onPress={onDelete} name='closecircleo' size={20} style={{ position: 'absolute', top: -5, right: -8, color: '#000000', fontWeight: 'bold' }} />
            </View>
        </View>
    );
    // Hàm xóa một mục khỏi mảng images bằng cách cung cấp index của mục cần xóa
    const handleDeleteItem = (index) => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa mục này?',
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Hủy xóa'),
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    onPress: () => {
                        // Xóa mục khi người dùng xác nhận
                        const updatedImages = [...images];
                        updatedImages.splice(index, 1);
                        setimages(updatedImages);
                        console.log(images);
                    },
                },
            ],
            { cancelable: true }
        );
    };
    // hàm chọn phương thức 
    const chon = () => {
        Alert.alert(
            'Xác nhận ',
            'Bạn hãy chọn ?',
            [
                {
                    text: 'Chụp ảnh ',
                    onPress: () => { OpenCamera(true) }
                },
                {
                    text: 'Thư viện ',
                    onPress: () => { OpenCamera(false) }
                },
            ],
            { cancelable: true }
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={styles.rowHeader}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={30} color={'black'} />
                    </Pressable>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#000000", marginLeft: '15%' }} >Sửa Sản Phẩm </Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.container} >
                    <View style={styles.themanh}>
                        {images && (
                            <View>
                                <FlatList
                                    style={{ flexWrap: 'wrap', width: "auto" }}
                                    numColumns={3}
                                    data={images}
                                    scrollEnabled={false}
                                    renderItem={({ item, index }) => (
                                        <Item
                                            title={item}
                                            onDelete={() => handleDeleteItem(index)} // Gọi hàm xóa khi nút xóa được bấm
                                        />
                                    )}
                                />
                                <View style={styles.khunhanh}>
                                    <Text onPress={chon} style={{ color: 'red' }}>Thêm Ảnh</Text>
                                </View>
                            </View>
                        )}
                    </View>
                    {/* Nhập tên cửa hàng */}
                    <View style={styles.inputFooter}>
                        <View style={styles.rowInput}>
                            <View>
                                <Text style={styles.txtInput}>Tên Sản Phẩm  *</Text>
                                <TextInput maxLength={120} style={{ width: 340 }} placeholder="Nhập tên sản phẩm" />
                            </View>
                            <View
                                style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text>0/120</Text>
                                <AntDesign name="closesquareo" size={20} />
                            </View>
                        </View>
                    </View>
                    {/* Nhập mô tả sp */}
                    <View style={styles.inputFooter1}>
                        <View style={styles.rowInput}>
                            <View>
                                <Text style={styles.txtInput}>Mô tả Sản Phẩm  *</Text>
                                <TextInput
                                    maxLength={3000}
                                    multiline={true} // Cho phép đa dòng
                                    textAlignVertical="top" // Đặt văn bản lên trên
                                    style={{ width: 340 }} placeholder="Nhập mô tả sản phẩm" />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View
                                    style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text>0/3000</Text>
                                    <AntDesign name="closesquareo" size={20} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.giasp} >
                        <View style={{ flexDirection: 'row' }}>
                            <Entypo name='price-tag' size={30} />
                            <Text style={{ paddingLeft: 10, fontSize: 18, color: '#000000', fontWeight: 'bold' }}
                            >Giá sản phẩm * </Text>
                        </View>

                        <View style={styles.gia}>
                            <TextInput style={{ fontSize: 20 }} maxLength={10} placeholder="0" />
                            <Text style={{ fontSize: 22, alignSelf: 'center', marginRight: 13, marginLeft: 5 }}>đ</Text>
                        </View>
                    </View>
                    <View style={styles.giasp} >
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='warehouse' size={30} />
                            <Text style={{ paddingLeft: 10, fontSize: 18, color: '#000000', fontWeight: 'bold' }}
                            >Kho hàng * </Text>
                        </View>

                        <View style={styles.gia}>
                            <TextInput style={{ fontSize: 20, marginRight: 20 }} maxLength={10} placeholder="0" />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ backgroundColor: '#ffffff', }}>
                <View style={styles.nutbam}>
                    <TouchableOpacity style={styles.btnluu} >
                        <Text style={{ fontSize: 22, color: '#000000' }}>Sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnhienthi} >
                        <Text style={{ fontSize: 22, color: '#ffffff' }}>Hiển Thị</Text>
                    </TouchableOpacity>
                </View></View>
        </View>
    )
}
export default UpdateProduct
const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
        backgroundColor: '#eeeeee',
    }, header: {
        height: 60,
        justifyContent: 'space-around',
        backgroundColor: '#ffffff'
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: '5%',
    },
    themanh: {
        marginTop: 6,
        height: "auto",
        backgroundColor: '#ffffff'
    }, khunhanh: {
        width: 80,
        height: 90,
        margin: 20,
        borderWidth: 1.9,
        borderStyle: 'dashed',
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    }, anh: {
        width: 80,
        height: 90,
        borderTopRightRadius: 20,
    }, inputFooter: {
        flexWrap: 'nowrap',
        marginTop: 6,
        height: 70,
        borderColor: '#ffffff',
        borderTopWidth: 3,
        justifyContent: 'center',
        borderBottomWidth: 3,
        backgroundColor: '#ffffff',
    }, inputFooter1: {
        marginTop: 6,
        height: "auto",
        borderColor: '#ffffff',
        borderTopWidth: 3,
        justifyContent: 'center',
        borderBottomWidth: 3,
        backgroundColor: '#ffffff',
    },
    rowInput: {
        marginVertical: '3%',
        marginHorizontal: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtInput: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
    }, giasp: {
        backgroundColor: '#ffffff',
        height: 45,
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        justifyContent: 'space-between'
    }, gia: {
        flexDirection: 'row',
    }, nutbam: {
        backgroundColor: '#ffffff',
        height: 60,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    }, btnluu: {
        width: 150,
        height: 40,
        alignItems: "center",
        borderColor: '#000000',
        justifyContent: 'center',
        borderWidth: 1
    }
    , btnhienthi: {
        backgroundColor: '#000000',
        borderWidth: 1,
        width: 150,
        height: 40,
        alignItems: "center",
        borderRadius: 1,
        borderColor: '#000000',
        justifyContent: 'center'
    }
})
