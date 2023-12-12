import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, ToastAndroid } from 'react-native';
import { FlatList } from 'react-native';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PhanLoaiSP = ({ navigation, route }) => {
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [isButtonPressed, setButtonPressed] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const { newid, item, selectedCategory, id } = route.params || {};

    console.log(id, selectedCategory);


    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItems1, setSelectedItems1] = useState([]);
    const product_attributes = item.product_attributes;
    // console.log(product_attributes);
    useEffect(() => {
        // Tạo mảng data từ product_attributes có thuộc tính là color
        const colorData = product_attributes.map(attr => ({ id: attr._id, text: attr.color }));
        setData(colorData);
        // Tạo mảng data1 từ product_attributes có thuộc tính là options
        const optionsData = product_attributes.map(attr => ({
            id: attr._id,
            color: attr.color,
            sizes: attr.options.map(option => option.size),
        }));

        // Lấy duy nhất các giá trị size từ optionsData
        const uniqueSizes = [...new Set(optionsData.flatMap(item => item.sizes))];

        // Tạo mảng data1 từ uniqueSizes
        const data1 = uniqueSizes.map((size, index) => ({
            id: index.toString(),  // Bạn có thể sử dụng id theo cách bạn muốn
            size: size,

        }));

        // Đặt data1 vào state
        setData1(data1);
    }, [product_attributes]);





    const toggleDialog = () => {
        setDialogVisible(!isDialogVisible);
        setButtonPressed(false);
    };
    const toggleDialog1 = () => {
        setDialogVisible(!isDialogVisible);
        setButtonPressed(true);
    };

    const check = () => {
        if (isButtonPressed == false) {
            handleAdd();
        } else {
            handleAdd1();
        }
    };

    const handleAdd = () => {
        if (inputValue.trim() !== '') {
            setData(prevData => [
                { id: Date.now().toString(), text: inputValue },
                ...prevData,
            ]);
        }
        toggleDialog();
        setInputValue('');
    };

    const handleAdd1 = () => {
        if (inputValue.trim() !== '') {
            setData1(prevData1 => [
                ...prevData1,
                { id: Date.now().toString(), size: inputValue },
            ]);
        }
        toggleDialog();
        setInputValue('');
    };

    const handleDeleteImage = id => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa màu sắc này?',
            [
                { text: 'Hủy', onPress: () => console.log('Hủy xóa'), style: 'cancel' },
                {
                    text: 'Xóa',
                    onPress: () => {
                        setData(prevData => prevData.filter(item => item.id !== id));
                        setSelectedItems(prevSelectedItems =>
                            prevSelectedItems.filter(item => item.id !== id)
                        );
                    },
                },
            ],
            { cancelable: true },
        );
    };

    const handleDeleteImage1 = id => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn size này?',
            [
                { text: 'Hủy', onPress: () => console.log('Hủy xóa'), style: 'cancel' },
                {
                    text: 'Xóa',
                    onPress: () => {
                        setData1(prevData1 => prevData1.filter(item => item.id !== id));
                        setSelectedItems1(prevSelectedItems =>
                            prevSelectedItems.filter(item => item.id !== id)
                        );
                    },
                },
            ],
            { cancelable: true },
        );
    };

    const handleSelectItem = id => {
        const newItem = data.find(item => item.id === id);
        setSelectedItems(prevSelectedItems => {
            if (newItem && prevSelectedItems.some(item => item.id === id)) {
                return prevSelectedItems.filter(item => item.id !== id);
            } else if (newItem) {
                return [...prevSelectedItems, { id, text: newItem.text }];
            }
            return prevSelectedItems;
        });
    };

    const handleSelectItem1 = id => {
        const newItem = data1.find(item => item.id === id);
        setSelectedItems1(prevSelectedItems => {
            if (newItem && prevSelectedItems.some(item => item.id === id)) {
                return prevSelectedItems.filter(item => item.id !== id);
            } else if (newItem) {
                const sizeInfo = product_attributes.find(attr =>
                    attr.options.some(option => option.size === newItem.size)
                );

                // Lấy giá trị options_quantity từ sizeInfo
                const options_quantity = sizeInfo
                    ? sizeInfo.options.find(option => option.size === newItem.size)?.options_quantity || 0
                    : 0;

                return [
                    ...prevSelectedItems,
                    { id, size: newItem.size, options_quantity: options_quantity },
                ];
            }
            return prevSelectedItems;
        });
    };

    const handleQuantityChange = (id, text) => {
        setSelectedItems1(prev => {
            const updatedItems = prev.map(item => {
                if (item.id === id) {
                    return { ...item, options_quantity: text };
                }
                return item;
            });
            return updatedItems;
        });
    };
    const dataWithButton =
        data.length < 8 ? [{ id: 1, isButton: true }, ...data] : data;
    const dataWithButton1 =
        data1.length < 8 ? [{ id: 1, isButton: true }, ...data1] : data1;

    const luu = () => {
        var data = [];

        for (let i = 0; i < selectedItems.length; i++) {
            const mau = { color: selectedItems[i].text, options: [] };
            for (let j = 0; j < selectedItems1.length; j++) {
                mau.options.push({
                    size: selectedItems1[j].size,
                    options_quantity: selectedItems1[j].options_quantity,
                });
            }
            data.push(mau);
        }
        if (data.length != 0) {
            const buil = JSON.stringify(data);
            console.log(buil);
            navigation.navigate('UpdateProduct', { buil, newid, selectedCategory, id });
        } else {
            ToastAndroid.show(
                'Vui lòng chọn các thông tin trên ',
                ToastAndroid.SHORT,
            );

        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#EEEEEE',
                        borderRadius: 15,
                    }}>
                    <AntDesign name="left" size={30} color={'black'} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Phân loại sản phẩm</Text>
            </View>
            <ScrollView>
                <View style={styles.view}>
                    <View style={styles.view1}>
                        <Text style={{ fontSize: 20, color: '#000000' }}> Màu sắc </Text>
                    </View>
                    <View style={styles.horizontalLine1} />
                    <View
                        style={{
                            backgroundColor: '#ffffff',
                        }}>
                        <FlatList
                            data={dataWithButton}
                            keyExtractor={item => item.id}
                            numColumns={4}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <View style={styles.imageItem}>
                                    {item.isButton ? (
                                        <View
                                            style={{
                                                width: 75,
                                                height: 30,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: 5,
                                                marginVertical: '10%',
                                                backgroundColor: 'black',
                                            }}>
                                            <Text
                                                onPress={toggleDialog}
                                                style={{ color: '#FFFFFF', fontSize: 15 }}>
                                                +Thêm
                                            </Text>
                                        </View>
                                    ) : (
                                        <>
                                            <View style={{}}>
                                                <TouchableOpacity
                                                    onPress={() => handleSelectItem(item.id)}
                                                    style={[
                                                        styles.item,
                                                        {
                                                            borderColor: selectedItems.some(
                                                                selectedItem => selectedItem.id === item.id,
                                                            )
                                                                ? 'red'
                                                                : 'black',
                                                        },
                                                    ]}>
                                                    <Text>{item.text}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleDeleteImage(item.id);
                                                    }}
                                                    style={styles.closeButton}>
                                                    <AntDesign name="closecircleo" size={20} />
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )}
                                </View>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.view}>
                    <View style={styles.view1}>
                        <Text style={{ fontSize: 20, color: '#000000' }}> Size </Text>
                    </View>
                    <View style={styles.horizontalLine1} />
                    <View>
                        <FlatList
                            data={dataWithButton1}
                            keyExtractor={item => item.id}
                            numColumns={4}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <View style={styles.imageItem}>
                                    {item.isButton ? (
                                        <View
                                            style={{
                                                width: 75,
                                                height: 30,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: 5,
                                                marginVertical: '10%',
                                                backgroundColor: 'black',
                                            }}>
                                            <Text
                                                onPress={toggleDialog1}
                                                style={{ color: '#FFFFFF', fontSize: 17 }}>
                                                +Thêm
                                            </Text>
                                        </View>
                                    ) : (
                                        <>
                                            <View style={{}}>
                                                <TouchableOpacity
                                                    onPress={() => handleSelectItem1(item.id)}
                                                    style={[
                                                        styles.item,
                                                        {
                                                            borderColor: selectedItems1.some(
                                                                selectedItems1 => selectedItems1.id === item.id,
                                                            )
                                                                ? 'red'
                                                                : 'black',
                                                        },
                                                    ]}>
                                                    <Text>{item.size}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleDeleteImage1(item.id);
                                                    }}
                                                    style={styles.closeButton}>
                                                    <AntDesign name="closecircleo" size={20} />
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )}
                                </View>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.view}>
                    <Text style={{ fontSize: 20, padding: 5, color: 'black' }}>
                        Thông tin chi tiết phân loại{' '}
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: 'white',
                        marginTop: '1%',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <Text style={{ fontSize: 18, padding: 5, color: 'black', width: 200 }}>
                        Đặt số lượng hàng cho tất cả phân loại
                    </Text>
                    <Text
                        onPress={() => Alert.alert('Thông báo', 'Thôi~')}
                        style={{ fontSize: 18, color: 'red' }}>
                        Thay đổi hàng loạt
                    </Text>
                </View>
                <FlatList
                    data={selectedItems}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.item12}>
                            <View style={styles.view3}>
                                <Text style={{ fontSize: 20, padding: 5, color: 'black' }}>
                                    Màu Sắc:
                                </Text>
                                <Text style={{ fontSize: 20, padding: 5, color: 'black' }}>
                                    {item.text}
                                </Text>
                            </View>
                            <View style={styles.view4}>
                                <Text style={{ fontSize: 20, padding: 5, color: 'black' }}>
                                    Size:
                                </Text>
                            </View>
                            <View style={styles.view4}>
                                {selectedItems1.map((value, index) => {
                                    return (
                                        <View key={index}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    paddingHorizontal: '5%',
                                                }}>
                                                <Text
                                                    style={{
                                                        textDecorationLine: 'underline',
                                                        fontSize: 20,
                                                        color: 'black',
                                                    }}>
                                                    {value.size}
                                                </Text>
                                                <TextInput
                                                    style={{ textAlign: 'right' }}
                                                    maxLength={10}
                                                    keyboardType="numeric"
                                                    placeholder={'Nhập số lượng hàng loạt'}
                                                    // value={value.options_quantity.toString()}
                                                    onChangeText={text => {
                                                        handleQuantityChange(value.id, text);
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    )}
                />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={luu}>
                    <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={isDialogVisible} transparent animationType="slide">
                <View style={styles.dialogContainer}>
                    <View style={styles.dialogContent}>
                        <Text style={styles.dialogTitle}>Nhập giá trị</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Vui lòng nhập"
                            value={inputValue}
                            onChangeText={text => setInputValue(text)}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonCancel}
                                onPress={toggleDialog}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonAdd} onPress={check}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default PhanLoaiSP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    header: {
        height: 55,
        padding: '3%',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: '15%',
    },
    horizontalLine1: {
        width: '100%',
        alignSelf: 'center',
        borderColor: '#999999',
        borderBottomWidth: 1,
    },
    view1: {
        backgroundColor: '#ffffff',
        marginVertical: '2%',
    },
    view: {
        backgroundColor: '#ffffff',
        marginTop: '1%',
        paddingHorizontal: 16,
    },
    dialogContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    dialogTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000000',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    buttonCancel: {
        backgroundColor: '#aaa',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
    },
    buttonAdd: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
    },
    addButton: {
        minWidth: 80,
        height: 30,
        width: 'auto',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 5,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: 85,
        height: 30,
        margin: 5,
        marginVertical: '10%',
        borderTopRightRadius: 20,
    },
    imageItem: {
        height: 'auto',
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        color: '#000000',
        fontWeight: 'bold',
    },
    view3: {
        backgroundColor: '#D9D9D9',
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#8B8B8B',
    },
    view4: {
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#8B8B8B',
        borderTopWidth: 1,
    },
    item12: {
        width: '100%',
    },
    footer: {
        backgroundColor: '#ffffff',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        margin: 5,
    },
    buttonText: {
        fontSize: 30,
        color: '#000000',
    },
});
