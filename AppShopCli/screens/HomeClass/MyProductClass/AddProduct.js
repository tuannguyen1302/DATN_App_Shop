import React, {useEffect, useState} from 'react';
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
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {SOCKET_URL} from '../../utils/socketService';

const AddProduct = () => {
  const navigation = useNavigation();

  const [selectedImages, setSelectedImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productInventory, setProductInventory] = useState('');

  const getHeaders = () => ({
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-xclient-id': '654c895786644a5c7ac507df',
      ahthorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjODk1Nzg2NjQ0YTVjN2FjNTA3ZGYiLCJlbWFpbCI6Inh1YW5kdWFuMTIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBBRVFHUU9qdjBSbmZYRlMyVHZpa2VDMy5OWXgzZ0FrdXJpR3Vzb0ZGVzVjQ0dHelA5aHd5IiwiaWF0IjoxNjk5OTY0MjY3LCJleHAiOjE3MDA4MjgyNjd9.ZKxsuIMf2uBt0vBPt4pkDgWuEEsF3GG91dRMb6DHkwE',
    },
  });

  const clearField = setField => setField('');

  const openCamera = async isFrontCamera => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

      const result = isFrontCamera
        ? await launchCamera({mediaType: 'photo'})
        : await launchImageLibrary({mediaType: 'photo'});

      setSelectedImages([
        ...selectedImages,
        {id: Date.now().toString(), uri: result.assets[0]},
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = id => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa ảnh này?',
      [
        {text: 'Hủy', onPress: () => console.log('Hủy xóa'), style: 'cancel'},
        {
          text: 'Xóa',
          onPress: () =>
            setSelectedImages(images =>
              images.filter(image => image.id !== id),
            ),
        },
      ],
      {cancelable: true},
    );
  };

  const selectImageOption = () => {
    Alert.alert(
      'Thông báo',
      'Bạn muốn lấy ảnh từ?',
      [
        {text: 'Chụp ảnh ', onPress: () => openCamera(true)},
        {text: 'Thư viện ', onPress: () => openCamera(false)},
      ],
      {cancelable: true},
    );
  };

  const postApi = async () => {
    try {
      if (
        !selectedImages ||
        !productName ||
        !productDescription ||
        !productPrice ||
        !productInventory
      ) {
        ToastAndroid.show(
          'Vui lòng nhập đủ các trường dữ liệu hiện có!',
          ToastAndroid.SHORT,
        );
        return;
      }

      const productAttributes = [
        {
          color: 'Xanh',
          size: ['XL', 'S'],
          quantity: 1,
        },
        {
          color: 'Đỏ',
          size: ['XL', 'S'],
          quantity: 10,
        },
        {
          color: 'Den',
          size: ['XL', 'S'],
          quantity: 100,
        },
        {
          color: 'Trắng',
          size: ['XL', 'S'],
          quantity: 1,
        },
      ];

      const formData = new FormData();
      formData.append('product_name', productName);
      formData.append('product_description', productDescription);
      formData.append('product_price', productPrice);
      formData.append('category', '654e4dccab5f7e26f673b45f');
      formData.append('product_attributes', JSON.stringify(productAttributes));
      selectedImages.forEach(image => {
        formData.append('thumbs', {
          uri: image.uri.uri,
          type: image.uri.type,
          name: image.uri.fileName,
        });
      });

      const res = await axios.post(
        `${SOCKET_URL}v1/api/product/createProduct`,
        formData,
        getHeaders(),
      );

      console.log(res.data);
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };

  const renderInputField = ({label, state, setState, maxLength}, index) => (
    <View key={index} style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <View>
          <Text style={styles.inputLabel}>{label} 🕸️</Text>
          <TextInput
            style={styles.inputField}
            value={state}
            onChangeText={setState}
            maxLength={maxLength}
            placeholder={`Nhập ${label.toLowerCase()}`}
          />
        </View>
        <View style={styles.inputStatus}>
          <Text>
            {state.length}/{maxLength}
          </Text>
          <Pressable onPress={() => clearField(setState)}>
            <AntDesign
              name="closesquareo"
              size={20}
              color={state ? 'red' : 'gray'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );

  const renderPriceAndInventoryField = (
    {icon, label, state, setState},
    index,
  ) => (
    <View key={index} style={styles.priceAndInventoryContainer}>
      <View style={styles.iconAndLabelContainer}>
        <MaterialIcons name={icon} size={25} />
        <Text style={styles.inputLabel}>{label} 🕸️</Text>
      </View>
      <TextInput
        style={styles.priceAndInventoryInput}
        maxLength={10}
        value={state}
        keyboardType="number-pad"
        onChangeText={setState}
        placeholder={`Nhập ${label.toLowerCase()}`}
      />
    </View>
  );

  const dataWithButton =
    selectedImages.length < 8
      ? [{id: 'button', isButton: true}, ...selectedImages]
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
          <FlatList
            numColumns={4}
            data={dataWithButton}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.imageItem}>
                {item.isButton ? (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={selectImageOption}>
                    <Text style={styles.addButtonLabel}>Chọn Ảnh</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <Image style={styles.image} source={{uri: item.uri.uri}} />
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
        </View>
        <View>
          {[
            {
              label: 'Tên sản phẩm',
              state: productName,
              setState: setProductName,
              maxLength: 120,
            },
            {
              label: 'Mô tả sản phẩm',
              state: productDescription,
              setState: setProductDescription,
              maxLength: 3000,
            },
          ].map((item, index) => renderInputField(item, index))}
          {[
            {
              icon: 'price-change',
              label: 'Giá sản phẩm',
              state: productPrice.toString(),
              setState: setProductPrice,
            },
            {
              icon: 'warehouse',
              label: 'Kho hàng',
              state: productInventory.toString(),
              setState: setProductInventory,
            },
          ].map((item, index) => renderPriceAndInventoryField(item, index))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={postApi}>
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#000000'}]}>
          <Text style={[styles.buttonText, {color: 'white'}]}>Hiển Thị</Text>
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
    height: 70,
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
    width: '100%',
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
