import React, { useEffect, useState, useRef } from 'react';
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { API_BASE_URL, PRODUCT_API } from '../../config/urls';
import { apiGet, apiPut } from '../../utils/utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { apiPost } from '../../../src/utils/utils';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UpdateProduct = ({ navigation, route }) => {
  const bottomSheetModalRef = useRef(null);
  const { item } = route.params;
  //console.log(item?.productAttributes);
  const [selectedImages, setSelectedImages] = useState([]);
  const [productName, setProductName] = useState(item?.product_name);
  const [productDescription, setProductDescription] = useState(
    item?.product_description,
  );
  const [productPrice, setProductPrice] = useState(item?.product_price);
  const { selectedCategory } = route.params || {};
  const { buil, newid } = route.params || {};
  const [productAttribute, setproductAttribute] = useState(item?.product_attributes);
  //console.log(productAttributes);
  //console.log(newid);
  const clearField = setField => setField('');
  const defaultNewId = item?._id;
  const effectiveNewId = newid !== undefined ? newid : defaultNewId;
  const openCamera = async isFrontCamera => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

      const result = isFrontCamera
        ? await launchCamera({ mediaType: 'photo', cameraType: 'front' })
        : await launchImageLibrary({ mediaType: 'photo' });

      setSelectedImages([
        ...selectedImages,
        { id: Date.now().toString(), uri: result.assets[0].uri },
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
        { text: 'Hủy', onPress: () => console.log('Hủy xóa'), style: 'cancel' },
        {
          text: 'Xóa',
          onPress: () => {
            setSelectedImages(images =>
              images.filter(image => image.id !== id),
            );
          },
        },
      ],
      { cancelable: true },
    );
  };

  const selectImageOption = () => {
    Alert.alert(
      'Thông báo',
      'Bạn muốn lấy ảnh từ?',
      [
        { text: 'Chụp ảnh ', onPress: () => openCamera(true) },
        { text: 'Thư viện ', onPress: () => openCamera(false) },
      ],
      { cancelable: true },
    );
  };
  const hienthi = () => {
    console.log(buil);

  }


  const postApi = async () => {

    try {
      if (
        !selectedImages ||
        !productName ||
        !productDescription ||
        !productPrice
      ) {
        ToastAndroid.show(
          'Vui lòng nhập đủ các trường dữ liệu hiện có!',
          ToastAndroid.SHORT,
        );
        return;
      }

      let productAttributes;

      if (buil === undefined) {

        productAttributes = [JSON.stringify(productAttribute)];
        console.log(productAttributes);

      } else {
        productAttributes = [buil];
        console.log(productAttributes);
      }
      // console.log(productAttributes);
      const formData = new FormData();
      formData.append('product_name', productName);
      formData.append('product_description', productDescription);
      formData.append('product_price', productPrice);
      formData.append('category', '654e4dccab5f7e26f673b45f');
      formData.append('product_attributes', productAttributes);
      //console.log(JSON.stringify(formData) + "=======================");
      selectedImages.forEach(image => {
        let localUri = image?.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append('thumbs', { uri: localUri, name: filename, type });
      });

      console.log(`${PRODUCT_API}/editProduct/${effectiveNewId}`);
      await apiPut(`${PRODUCT_API}/editProduct/${effectiveNewId}`, formData, {
        'Content-Type': 'multipart/form-data',
      });
      console.log("sửa thành công ");
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };

  const renderInputField = ({ label, state, setState, maxLength }, index) => (
    <View key={index} style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>{label} 🕸️</Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 5,
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={styles.inputField}
            value={state}
            multiline={true}
            onChangeText={setState}
            maxLength={maxLength}
            placeholder={`Nhập ${label.toLowerCase()}`}
          />
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
    </View>
  );

  let idCounter = 0;
  useEffect(() => {
    const newImages = item?.product_thumb.map(uri => ({
      id: (idCounter++).toString(),
      uri: `${API_BASE_URL}uploads/${uri}`,
    }));
    setSelectedImages(prevImages => [...prevImages, ...newImages]);
  }, []);

  const dataWithButton =
    selectedImages.length < 10
      ? [{ id: 'button', isButton: true }, ...selectedImages]
      : selectedImages;

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.header}>
          <View style={styles.headerRow}>
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
            <Text style={styles.headerText}>Sửa Sản Phẩm</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.imageContainer}>
            <FlatList
              numColumns={4}
              data={dataWithButton}
              scrollEnabled={false}
              keyExtractor={item => item?.id}
              renderItem={({ item }) => (
                <View style={styles.imageItem}>
                  {item.isButton ? (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => bottomSheetModalRef.current?.present()} >
                      <Text style={styles.addButtonLabel}>Chọn Ảnh</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <Image style={styles.image} source={{ uri: item?.uri }} />
                      <TouchableOpacity
                        onPress={() => {
                          console.log(item), handleDeleteImage(item?.id);
                        }}
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
                  {item.label === 'Giá sản phẩm 🕸️' && (
                    <Text style={{ fontSize: 18 }}>đ</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('NganhspUPDATE');
            }}
            style={styles.nganhsp}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>
              Ngành hàng sản phẩm
            </Text>
            <AntDesign name="right" size={20} />
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              padding: 5,
              backgroundColor: 'white',
              paddingHorizontal: 25,
              marginTop: 5,
              borderWidth: 1,
              borderColor: '#5F5F5F',
            }}>
            Ngành hàng sản phẩm bạn đã chọn: {selectedCategory}
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('PhanloaispUPDATE', { newid: item?._id, item: item });

            }}
            style={styles.nganhsp}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>
              Phân loại sản phẩm{' '}
            </Text>
            <AntDesign name="right" size={20} />
          </Pressable>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={postApi}>
            <Text style={styles.buttonText}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={hienthi}
            style={[styles.button, { backgroundColor: '#000000' }]}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Hiển Thị</Text>
          </TouchableOpacity>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={['1%', '50%']}
          backgroundStyle={styles.bottomSheetBackground}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: 'gray', fontWeight: 'bold' }}>
              Chọn ảnh từ
            </Text>
            <TouchableOpacity
              onPress={() => openCamera(true)}
              style={styles.bottomSheetButton}>
              <View style={styles.bottomSheetIcon}>
                <FontAwesome name="camera" size={30} color={'#536EFF'} />
              </View>
              <Text style={styles.bottomSheetButtonText}>Chụp ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openCamera(false)}
              style={styles.bottomSheetButton}>
              <View style={styles.bottomSheetIcon}>
                <Ionicons name="library" size={30} color={'#536EFF'} />
              </View>
              <Text style={styles.bottomSheetButtonText}>Thư viện</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
    height: 'auto',
  },
  inputRow: {
    marginVertical: '3%',
    marginHorizontal: '3%',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  inputField: {
    width: 320,
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
  nganhsp: {
    backgroundColor: '#ffffff',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Để căn chỉnh theo chiều dọc
    paddingHorizontal: 26, // Khoảng cách đều 2 bên
    borderWidth: 1,
    borderColor: '#5F5F5F',
    marginBottom: 1,
    marginTop: 5,
  },
  bottomSheetBackground: {
    borderRadius: 25,
    borderWidth: 0.4,
  },
  bottomSheetBackground: {
    borderRadius: 25,
    borderWidth: 0.4,
  },
  bottomSheetButton: {
    width: '80%',
    marginVertical: '3%',
    height: '35%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderRadius: 20,
  },
  bottomSheetIcon: {
    width: 75,
    height: 75,
    backgroundColor: '#eee',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetButtonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default UpdateProduct;
