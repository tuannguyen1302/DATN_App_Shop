import React, { useCallback, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { FlatList } from 'react-native';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PhanLoaiSP = ({ navigation }) => {
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isButtonPressed, setButtonPressed] = useState(false);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItems1, setSelectedItems1] = useState([]);

    const [SelectedMau, setSelectedMau] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const toggleDialog = () => {
        setDialogVisible(!isDialogVisible);
        setButtonPressed(false);
        console.log(isButtonPressed);
    };
    const toggleDialog1 = () => {
        setDialogVisible(!isDialogVisible);
        setButtonPressed(true);
        console.log(isButtonPressed);
    };
    const check = () => {
        if (isButtonPressed == false) {
            handleAdd();

        } else {
            handleAdd1();
        }
    }
    const handleAdd = () => {
        if (inputValue.trim() !== '') {
            setData(prevData => [{ id: Date.now().toString(), text: inputValue }, ...prevData]);
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, { id: Date.now().toString(), text: inputValue }]);
        }
        toggleDialog();
        setInputValue('');
    };
    const handleAdd1 = () => {
        if (inputValue.trim() !== '') {
            setData1(prevData1 => [{ id: Date.now().toString(), text: inputValue }, ...prevData1]);
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, { id: Date.now().toString(), text: inputValue }]);
        }
        toggleDialog();
        setInputValue('');
    };
    const handleDeleteImage = id => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa ảnh này?',
            [
                { text: 'Hủy', onPress: () => console.log('Hủy xóa'), style: 'cancel' },
                {
                    text: 'Xóa',
                    onPress: () => {
                        setData(images =>
                            images.filter(image => image.id !== id),
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
            'Bạn có chắc chắn muốn xóa ảnh này?',
            [
                { text: 'Hủy', onPress: () => console.log('Hủy xóa'), style: 'cancel' },
                {
                    text: 'Xóa',
                    onPress: () => {
                        setData1(images =>
                            images.filter(image => image.id !== id),
                        );

                    },
                },
            ],
            { cancelable: true },
        );
    };
    //const [selectedSizes, setSelectedSizes] = useState([]);
    const handleSelectItem = useCallback((id) => {
        setSelectedItems((prevSelectedItems) => {
            const newItem = data.find((item) => item.id === id);
            // console.log(newItem + "sdasdfsd");
            if (newItem && prevSelectedItems.some((item) => item.id === id)) {
                // Nếu mục đã được chọn, loại bỏ nó
                console.log("CHOJN1 ");
                const newSelectedmaus = SelectedMau.filter((mau) => mau !== newItem.text);
                setSelectedMau(newSelectedmaus);
                return prevSelectedItems.filter((item) => item.id !== id);
            } else if (newItem) {
                // Nếu mục chưa được chọn, thêm nó vào
                console.log("CHOJN2 ");
                const newSelectedmaus = [...SelectedMau, newItem.text];
                setSelectedMau(newSelectedmaus);
                console.log(SelectedMau.length + "sdsds");
                return [...prevSelectedItems, { newItem, id }];
            } else {
                return prevSelectedItems;
            }
        });
    }, [SelectedMau]);
    console.log(SelectedMau + " 2222222222222222222222222222222222222222222222");
    const handleSelectItem1 = (id) => {
        setSelectedItems1((prevSelectedItems) => {
            const newItem1 = data1.find((item) => item.id === id);

            if (prevSelectedItems.some((item) => item.id === id)) {
                // Nếu mục đã được chọn, loại bỏ nó
                console.log("CHOJN1 ");
                const newSelectedSizes = selectedSizes.filter((size) => size !== newItem1.text);
                setSelectedSizes(newSelectedSizes);
                return prevSelectedItems.filter((item) => item.id !== id);
            } else {
                // Nếu mục chưa được chọn, thêm nó vào
                console.log("CHOJN2 ");
                const newSelectedSizes = [...selectedSizes, newItem1.text];
                setSelectedSizes(newSelectedSizes);
                return [...prevSelectedItems, { newItem1, id }];
            }
        });
    };

    const dataWithButton =
        data.length < 8
            ? [{ id: 'button', isButton: true }, ...data]
            : data;
    const dataWithButton1 =
        data1.length < 8
            ? [{ id: 'button', isButton: true }, ...data1]
            : data1;



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={30} color={'black'} />
                    </Pressable>
                    <Text style={styles.headerText}>Phân loại sản phẩm</Text>
                </View>
            </View>
            <View style={styles.horizontalLine} />

            <ScrollView>
                <View style={styles.view}>
                    <View style={styles.view1} >
                        <Text style={{ fontSize: 20, color: '#000000' }}> Màu sắc </Text>
                        <Pressable >
                            <Text style={{ fontSize: 20, color: '#FF0000' }}> Sửa </Text>
                        </Pressable>
                    </View>
                    <View style={styles.horizontalLine1} />
                    <View style={{
                        backgroundColor: '#ffffff',
                    }}>
                        <FlatList
                            data={dataWithButton}
                            keyExtractor={item => item.id}
                            numColumns={3}
                            scrollEnabled={false}
                            // Set to true for horizontal layout
                            contentContainerStyle={{ paddingRight: 20 }}
                            renderItem={({ item }) => (
                                <View style={styles.imageItem}>
                                    {item.isButton ? (
                                        <View style={{
                                            width: 80, height: 30,
                                            borderWidth: 1,
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            marginTop: 30, marginBottom: 30,
                                            marginLeft: 20,
                                            backgroundColor: 'black'
                                        }}>
                                            <Text onPress={toggleDialog} style={{ color: '#FFFFFF', fontSize: 17 }}>+Thêm</Text>
                                        </View>
                                    ) : (
                                        <>
                                            <View style={{}}>
                                                <TouchableOpacity
                                                    onPress={() => handleSelectItem(item.id)}
                                                    style={[
                                                        styles.item,
                                                        {
                                                            borderColor: selectedItems.some((selectedItem) => selectedItem.id === item.id)
                                                                ? 'red'
                                                                : 'black',
                                                        },
                                                    ]}
                                                >
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
                    <View style={styles.view1} >
                        <Text style={{ fontSize: 20, color: '#000000' }}> Size </Text>
                        <Pressable >
                            <Text style={{ fontSize: 20, color: '#FF0000' }}> Sửa </Text>
                        </Pressable>
                    </View>
                    <View style={styles.horizontalLine1} />
                    <View style={{
                        backgroundColor: '#ffffff',
                    }}>
                        <FlatList
                            data={dataWithButton1}
                            keyExtractor={item => item.id}
                            numColumns={3}
                            scrollEnabled={false}
                            // Set to true for horizontal layout
                            contentContainerStyle={{ paddingRight: 20 }}
                            renderItem={({ item }) => (
                                <View style={styles.imageItem}>
                                    {item.isButton ? (
                                        <View style={{
                                            width: 80, height: 30,
                                            borderWidth: 1,
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            marginTop: 30, marginBottom: 30,
                                            backgroundColor: 'black',
                                            marginLeft: 20
                                        }}>
                                            <Text onPress={toggleDialog1} style={{ color: '#FFFFFF', fontSize: 17 }}>+Thêm</Text>
                                        </View>
                                    ) : (
                                        <>
                                            <View style={{}}>
                                                <TouchableOpacity
                                                    onPress={() => handleSelectItem1(item.id)}
                                                    style={[
                                                        styles.item,
                                                        {
                                                            borderColor: selectedItems1.some((selectedItem) => selectedItem.id === item.id)
                                                                ? 'red'
                                                                : 'black',
                                                        },
                                                    ]}
                                                >
                                                    <Text>{item.text}</Text>
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
                <Modal visible={isDialogVisible} transparent animationType="slide">
                    <View style={styles.dialogContainer}>
                        <View style={styles.dialogContent}>
                            <Text style={styles.dialogTitle}>Nhập giá trị</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Vui lòng nhập"
                                value={inputValue}
                                onChangeText={(text) => setInputValue(text)}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.buttonCancel} onPress={toggleDialog}>
                                    <Text style={{ color: '#fff', fontSize: 16 }}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonAdd} onPress={check}>
                                    <Text style={{ color: '#fff', fontSize: 16 }}>Thêm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.view}>
                    <Text style={{ fontSize: 20, padding: 5, color: 'black' }}>Thông tin chi tiết phân loại </Text>
                </View>
                <View style={{
                    backgroundColor: '#ffffff',
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    flexDirection: 'row',

                }}>
                    <Text style={{ fontSize: 20, padding: 5, color: 'black', width: 200 }}>đặt số lượng hàng cho tất cả phân loại  </Text>
                    <Text style={{ fontSize: 20, padding: 5, color: 'red', }}>Thay đổi hàng loạt  </Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.item12}>
                            <View style={styles.view3}>
                                <Text style={{ fontSize: 20, padding: 5, color: 'black' }}> Màu Sắc :  </Text>
                                {SelectedMau.length > 0 && (
                                    <Text style={{ fontSize: 20, padding: 5, color: 'black' }}>
                                        {SelectedMau[0]}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.view4}>
                                <Text style={{ fontSize: 20, padding: 5, color: 'black' }}> Size :  </Text>
                            </View>
                            <View style={styles.view4}>
                                {selectedSizes.map((size, index) => (
                                    <Text key={index} style={{ fontSize: 20, padding: 5, color: 'black', borderBottomWidth: 1 }}>{size} </Text>
                                ))}
                            </View>
                        </View>
                    )}
                />

            </ScrollView>
        </View >
    );
};

export default PhanLoaiSP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
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
        marginLeft: '15%',
    }, horizontalLine: {
        width: '75%',
        alignSelf: 'center',
        borderColor: '#999999',
        borderBottomWidth: 1,
        marginTop: 10,
    }, horizontalLine1: {
        width: '100%',
        alignSelf: 'center',
        borderColor: '#999999',
        borderBottomWidth: 1,

    },
    view1: {
        backgroundColor: '#ffffff',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between', // Thay đổi ở đây
        paddingHorizontal: 16,
        marginBottom: 10
    },
    view: {
        backgroundColor: '#ffffff',
        marginTop: 10,
        paddingHorizontal: 16,
    }, dialogContainer: {
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
        minWidth: 80,
        width: "auto",
        height: 30,
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 10,
        borderTopRightRadius: 20,
        padding: 5
    },
    imageItem: {
        height: 'auto'
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: -5,
        color: '#000000',
        fontWeight: 'bold',
    }, view3: {
        backgroundColor: '#D9D9D9',
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#8B8B8B'
    },
    view4: {
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#8B8B8B',
        borderTopWidth: 1,
    }, item12: {
        width: '100%',

    },
});
