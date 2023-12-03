import React, { useState } from 'react';
import {
    Pressable,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { apiDelete, clearAllItem } from '../../utils/utils';
import { SIGNOUT_API } from '../../config/urls';
import socketServices from '../../utils/socketService';
import ProfileStyles from '../Profile/styles';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Setting = ({ navigation }) => {
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const logout = async () => {
        setButtonDisabled(true);
        try {
            await apiDelete(SIGNOUT_API);
            clearAllItem();
            socketServices.emit('logout');
            setButtonDisabled(false);
            navigation.replace('Login2');
        } catch (error) {
            setButtonDisabled(false);
            console.log('Logout: ', error);
        }
    };
    return (
        <View style={ProfileStyles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: '5%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 20
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    <Text
                        style={{
                            left: '20%',
                            fontSize: 25,
                            color: 'black',
                            fontWeight: '600',
                            marginLeft: 10
                        }}>
                        Setting
                    </Text>
                </View>
            </View>

            <View style={ProfileStyles.content}>
                <Text style={ProfileStyles.headerText}>Quản lý</Text>
                <Pressable
                    style={ProfileStyles.buttonView}
                    onPress={() => navigation.navigate('Discount')}>
                    <View style={ProfileStyles.rowButton}>
                        <View style={ProfileStyles.iconTextContainer}>
                            <AntDesign
                                name="gift"
                                size={windowWidth * 0.08}
                                color={'#333333'}
                            />
                            <Text style={ProfileStyles.text}>Ưu đãi</Text>
                        </View>
                        <AntDesign name="right" size={windowWidth * 0.03} />
                    </View>
                </Pressable>
                <Pressable
                    style={ProfileStyles.buttonView}
                    onPress={() => navigation.navigate('StatisticalScreen')}>
                    <View style={ProfileStyles.rowButton}>
                        <View style={ProfileStyles.iconTextContainer}>
                            <AntDesign
                                name="barchart"
                                size={windowWidth * 0.08}
                                color={'#333333'}
                            />
                            <Text style={ProfileStyles.text}>Thống kê</Text>
                        </View>
                        <AntDesign name="right" size={windowWidth * 0.03} />
                    </View>
                </Pressable>
                <Pressable
                    style={ProfileStyles.buttonView}
                    onPress={() => navigation.navigate('InventoryScreen')}>
                    <View style={ProfileStyles.rowButton}>
                        <View style={ProfileStyles.iconTextContainer}>
                            <MaterialIcons
                                name="warehouse"
                                size={windowWidth * 0.08}
                                color={'#333333'}
                            />
                            <Text style={ProfileStyles.text}>Tồn kho</Text>
                        </View>
                        <AntDesign name="right" size={windowWidth * 0.03} />
                    </View>
                </Pressable>
                <Pressable
                    style={ProfileStyles.buttonView}
                    onPress={() => navigation.navigate('InventoryScreen')}>
                    <View style={ProfileStyles.rowButton}>
                        <View style={ProfileStyles.iconTextContainer}>
                            <Feather
                                name="phone-call"
                                size={windowWidth * 0.08}
                                color={'#333333'}
                            />
                            <Text style={ProfileStyles.text}>Liên hệ nhà cung cấp </Text>
                        </View>
                        <AntDesign name="right" size={windowWidth * 0.03} />
                    </View>
                </Pressable>
                <Text
                    style={[ProfileStyles.headerText, { marginTop: windowHeight * 0.09 }]}>
                    Khác
                </Text>
                <Pressable
                    style={ProfileStyles.buttonView}
                    onPress={() => navigation.navigate('Password')}>
                    <View style={ProfileStyles.rowButton}>
                        <View style={ProfileStyles.iconTextContainer}>
                            <MaterialIcons
                                name="password"
                                size={windowWidth * 0.08}
                                color={'#333333'}
                            />
                            <Text style={ProfileStyles.text}>Đổi mật khẩu </Text>
                        </View>
                        <AntDesign name="right" size={windowWidth * 0.03} />
                    </View>
                </Pressable>
                <Pressable style={ProfileStyles.buttonView} onPress={logout}>
                    <View style={ProfileStyles.rowButton}>
                        <View style={ProfileStyles.iconTextContainer}>
                            <MaterialIcons
                                name="logout"
                                size={windowWidth * 0.08}
                                color={'#333333'}
                            />
                            <Text style={ProfileStyles.text}>Đăng xuất</Text>
                        </View>
                        <AntDesign name="right" size={windowWidth * 0.03} />
                    </View>
                </Pressable>
            </View>
            <Spinner
                visible={isButtonDisabled}
                textContent={'Đang đăng xuất...'}
                textStyle={{ color: '#FFF' }}
            />
        </View>
    );
};
export default Setting

