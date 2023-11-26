import React, {useState} from 'react';
import {Text, ToastAndroid, View, ScrollView, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {DISCOUNT_API} from '../../../config/urls';
import {apiPost} from '../../../utils/utils';

const applyOptions = [
  {id: 0, name: 'Tất cả sản phẩm'},
  {id: 1, name: 'Từng sản phẩm'},
];

const saleOptions = [
  {id: 0, name: 'Phần trăm '},
  {id: 1, name: 'Giá tiền'},
];

const UpdateDiscount = ({navigation, route}) => {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isStartDate, setStartDate] = useState(null);
  const [discountData, setDiscountData] = useState(route.params.data);

  const [selectedApplyOption, setSelectedApplyOption] = useState(
    discountData?.discount_applies_to == 'all'
      ? applyOptions[0]
      : applyOptions[1],
  );

  const [selectedSaleOption, setSelectedSaleOption] = useState(
    discountData?.discount_type == 'percentage'
      ? saleOptions[0]
      : saleOptions[1],
  );

  const handleDropdownChange = (value, field) => {
    setSelectedApplyOption(value);
    setDiscountData({
      ...discountData,
      [field]: value.id === 0 ? 'all' : 'specific',
    });
  };

  const handleSaleOptionChange = (value, field) => {
    setSelectedSaleOption(value);
    setDiscountData({
      ...discountData,
      [field]: value.id === 0 ? 'percentage' : 'fixed_amount',
    });
  };

  const handleTextChange = (text, field) => {
    setDiscountData({...discountData, [field]: text});
  };

  const postDiscountApi = async () => {
    try {
      // Chờ api
      if (!discountData.name || !discountData.code || discountData.value <= 0) {
        ToastAndroid.show(
          'Vui lòng điền đầy đủ thông tin.',
          ToastAndroid.SHORT,
        );
        return;
      }

      await apiPost(DISCOUNT_API, discountData);
      ToastAndroid.show('Thêm thành công', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Post api: ', error.message);
      ToastAndroid.show(
        'Đã xảy ra lỗi. Vui lòng thử lại sau.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={30}
          color={'#FFF'}
        />
        <Text style={styles.headerText}>Sửa Giảm Giá</Text>
        <AntDesign
          onPress={postDiscountApi}
          name="check"
          size={30}
          color={'#FFF'}
        />
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.label}>Áp dụng</Text>
        <Dropdown
          data={applyOptions}
          labelField="name"
          valueField="id"
          style={styles.dropdown}
          value={selectedApplyOption}
          onChange={value => handleDropdownChange(value, 'appliesTo')}
        />
        <Text style={styles.label}>Giảm</Text>
        <Dropdown
          data={saleOptions}
          labelField="name"
          valueField="id"
          style={styles.dropdown}
          value={selectedSaleOption}
          onChange={value => handleSaleOptionChange(value, 'type')}
        />
        <TextInput
          label="Tên chương trình"
          value={discountData?.discount_name}
          style={styles.input}
          onChangeText={text => handleTextChange(text, 'discount_name')}
          left={
            <TextInput.Icon
              icon={() => <FontAwesome name="bullhorn" size={24} />}
            />
          }
        />
        <TextInput
          label="Mô tả"
          value={discountData?.discount_des}
          multiline={true}
          onChangeText={text => handleTextChange(text, 'discount_des')}
          style={styles.input}
          left={
            <TextInput.Icon icon={() => <AntDesign name="form" size={24} />} />
          }
        />
        <TextInput
          label="Mã giảm giá"
          value={discountData?.discount_code}
          style={styles.input}
          onChangeText={text => handleTextChange(text, 'discount_code')}
          left={
            <TextInput.Icon
              icon={() => <FontAwesome name="barcode" size={24} />}
            />
          }
        />
        <TextInput
          label={'Phần trăm giảm'}
          value={discountData?.discount_value + ''}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => handleTextChange(text, 'discount_value')}
          left={
            <TextInput.Icon
              icon={() => <FontAwesome name="percent" size={24} />}
            />
          }
          theme={{
            colors: {
              primary: 'black',
            },
          }}
        />
        <TextInput
          label="Số tiền giảm tối đa"
          value={discountData?.discount_min_order_value + ''}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text =>
            handleTextChange(text, 'discount_min_order_value')
          }
          left={
            <TextInput.Icon
              icon={() => <FontAwesome name="money" size={24} />}
            />
          }
        />
        <TextInput
          label="Số lượng sử dụng"
          value={discountData?.discount_max_uses + ''}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => handleTextChange(text, 'discount_max_uses')}
          left={
            <TextInput.Icon
              icon={() => <AntDesign name="codesquareo" size={24} />}
            />
          }
        />
        <TextInput
          label="Giới hạn sử dụng"
          value={discountData?.discount_max_uses_per_user + ''}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text =>
            handleTextChange(text, 'discount_max_uses_per_user')
          }
          left={
            <TextInput.Icon
              icon={() => <FontAwesome name="linode" size={24} />}
            />
          }
        />
        <TextInput
          label="Ngày bắt đầu"
          editable={false}
          style={styles.input}
          value={discountData?.discount_start_date + ''}
          left={
            <TextInput.Icon
              onPress={() => {
                setStartDate(true), setDatePickerOpen(true);
              }}
              icon={() => <Fontisto name="date" size={24} />}
            />
          }
        />
        <TextInput
          label="Ngày kết thúc"
          value={discountData?.discount_end_date + ''}
          editable={false}
          style={styles.input}
          left={
            <TextInput.Icon
              onPress={() => {
                setStartDate(false), setDatePickerOpen(true);
              }}
              icon={() => <Fontisto name="date" size={24} />}
            />
          }
        />
        <DatePicker
          title={`Thời gian ${isStartDate ? 'bắt đầu' : 'kết thúc'}`}
          mode="datetime"
          modal
          open={isDatePickerOpen}
          date={new Date()}
          confirmText="Xác nhận"
          onConfirm={date => {
            setDiscountData({
              ...discountData,
              [isStartDate ? 'discount_start_date' : 'discount_end_date']: date,
            });
            setDatePickerOpen(false);
          }}
          cancelText="Hủy"
          onCancel={() => setDatePickerOpen(false)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#9999FF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  contentContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 0,
    marginVertical: 8,
    color: 'black',
  },
});

export default UpdateDiscount;
