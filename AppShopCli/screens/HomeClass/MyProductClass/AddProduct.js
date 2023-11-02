import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const AddProduct = () => {
  const navigation = useNavigation();

  // State variables
  const [selectedImages, setSelectedImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productInventory, setProductInventory] = useState(0);

  // Function to clear the content of an input field
  const clearField = (field, setField) => {
    setField('');
  };

  // Function to open camera and handle image selection
  const openCamera = async isFrontCamera => {
    try {
      const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED) {
        const result = isFrontCamera
          ? await launchCamera({ mediaType: 'photo', cameraType: 'front' })
          : await launchImageLibrary({ mediaType: 'photo' });

        setSelectedImages([
          ...selectedImages,
          { id: Date.now().toString(), uri: result.assets[0].uri },
        ]);

        console.log(selectedImages);
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle image deletion
  const handleDeleteImage = id => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa ảnh này?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hủy xóa'),
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            const updatedImages = selectedImages.filter(
              image => image.id !== id,
            );
            setSelectedImages(updatedImages);
            console.log(selectedImages);
          },
        },
      ],
      { cancelable: true },
    );
  };

  // Function to handle image source selection
  const selectImageOption = () => {
    Alert.alert(
      'Thông báo',
      'Bạn muốn lấy ảnh từ?',
      [
        {
          text: 'Chụp ảnh ',
          onPress: () => {
            openCamera(true);
          },
        },
        {
          text: 'Thư viện ',
          onPress: () => {
            openCamera(false);
          },
        },
      ],
      { cancelable: true },
    );
  };

  // Create a new data array with a button when images are less than 8
  const dataWithButton =
    selectedImages.length < 8
      ? [{ id: 'button', isButton: true }, ...selectedImages]
      : selectedImages;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={'black'} />
          </Pressable>
          <Text style={styles.headerText}>Thêm Sản Phẩm</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          {dataWithButton && (
            <FlatList
              numColumns={4}
              data={dataWithButton}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.imageItem}>
                  {item.isButton ? (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => selectImageOption()}>
                      <Text style={styles.addButtonLabel}>Chọn Ảnh</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <Image style={styles.image} source={{ uri: item.uri }} />
                      <TouchableOpacity
                        onPress={() => handleDeleteImage(item.id)}
                        style={styles.closeButton}>
                        <AntDesign name="closecircleo" size={20} />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
            />
          )}
        </View>
        <View>
          {/* Input fields for product name and description */}
          {[
            {
              label: 'Tên sản phẩm 🕸️',
              state: productName,
              setState: setProductName,
              maxLength: 120,
            },
            {
              label: 'Mô tả sản phẩm 🕸️',
              state: productDescription,
              setState: setProductDescription,
              maxLength: 3000,
            },
          ].map((item, index) => (
            <View key={index} style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <View>
                  <Text style={styles.inputLabel}>{item.label}</Text>
                  <TextInput
                    style={styles.inputField}
                    value={item.state}
                    multiline={true}
                    onChangeText={item.setState}
                    maxLength={item.maxLength}
                    placeholder={`Nhập ${item.label.toLowerCase()}`}
                  />
                </View>
                <View style={styles.inputStatus}>
                  <Text>
                    {item.state.length}/{item.maxLength}
                  </Text>
                  <Pressable
                    onPress={() => clearField(item.state, item.setState)}>
                    <AntDesign
                      name="closesquareo"
                      size={20}
                      color={item.state ? 'red' : 'gray'}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
          {/* Input fields for product price and inventory */}
          {[
            {
              icon: 'price-change',
              label: 'Giá sản phẩm 🕸️',
              state: productPrice.toString(),
              setState: setProductPrice,
            },
            {
              icon: 'warehouse',
              label: 'Kho hàng 🕸️',
              state: productInventory.toString(),
              setState: setProductInventory,
            },
          ].map((item, index) => (
            <View key={index} style={styles.priceAndInventoryContainer}>
              <View style={styles.iconAndLabelContainer}>
                <MaterialIcons name={item.icon} size={25} />
                <Text style={styles.inputLabel}>{item.label}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={styles.priceAndInventoryInput}
                  maxLength={10}
                  value={item.state}
                  onChangeText={item.setState}
                  placeholder={`0`}
                />
                {item.label === 'Giá sản phẩm 🕸️' && <Text style={{ fontSize: 18 }}>đ</Text>}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        {/* Save and Display buttons */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#000000' }]}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Hiển Thị</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 6,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: '15%',
  },
  imageContainer: {
    padding: '3%',
    marginVertical: '2%',
    backgroundColor: '#ffffff',
  },
  imageItem: {
    margin: '2%',
  },
  image: {
    width: 80,
    height: 90,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: -5,
    right: -8,
    color: '#000000',
    fontWeight: 'bold',
  },
  addButton: {
    width: 80,
    height: 90,
    borderWidth: 2,
    marginTop: '2%',
    padding: '3%',
    borderStyle: 'dashed',
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'red',
  },
  inputContainer: {
    height: 'auto',
    marginVertical: '1%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputRow: {
    marginVertical: '3%',
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
  inputLabel: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',

  },
  inputField: {
    width: 340,
    flexWrap: 'nowrap',
    fontSize: 18
  },
  inputStatus: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  priceAndInventoryContainer: {
    flexDirection: 'row',
    height: 60,
    padding: '2%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  iconAndLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  priceAndInventoryInput: {
    fontSize: 15,


  },
  footer: {
    backgroundColor: '#ffffff',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    color: '#000000',
  },
});

export default AddProduct;
