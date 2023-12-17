import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { apiGet } from '../../utils/utils';
import { NOTIFI_API } from '../../config/urls';
import { formatNotificationTime } from '../../components/DateTime';
import imagePath from '../../constants/imagePath';

const NotifiScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('NotiItem', { item })}
        style={styles.notificationItem}>
        <Image
          resizeMode="contain"
          source={imagePath.notification2}
          style={styles.notificationImage}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{item?.noti_content}</Text>
          <Text style={styles.notificationTime}>
            {formatNotificationTime(item?.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getAPI = async () => {
    try {
      const res = await apiGet(`${NOTIFI_API}/shop`);
      setData(res?.message.reverse());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.title}>Notification</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: '40%' }}
          size="large"
          color="black"
        />
      ) : data.length == 0 ? (
        <View
          style={{ alignSelf: 'center', alignItems: 'center', marginTop: '40%' }}>
          <Image
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            source={imagePath.notification1}
          />
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Chưa có thông báo nào✨
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item?._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    marginHorizontal: '5%',
    marginVertical: '2%',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  title: {
    left: '30%',
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: '3%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: '1%',
  },
  notificationImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  notificationTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  notificationTime: {
    fontSize: 12,
    marginTop: '2%',
    color: 'black',
  },
});

export default NotifiScreen;