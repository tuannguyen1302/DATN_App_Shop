import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {apiGet} from '../../utils/utils';
import {NOTIFI_API} from '../../config/urls';

const NotifiScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const renderItem = ({item}) => {
    const notificationDate = moment(item?.createdAt);
    const now = moment();

    const isToday = notificationDate.isSame(now, 'day');
    const yearsDifference = now.diff(notificationDate, 'years');
    const monthsDifference = now.diff(notificationDate, 'months');
    const daysDifference = now.diff(notificationDate, 'days');
    const hoursDifference = now.diff(notificationDate, 'hours');
    const minutesDifference = now.diff(notificationDate, 'minutes');

    let timeAgo = '';
    if (isToday) {
      timeAgo = `Hôm nay, ${notificationDate.format('HH:mm')}`;
    } else if (yearsDifference > 0) {
      timeAgo = notificationDate.format('HH:mm, DD/MM/YYYY');
    } else if (monthsDifference > 0) {
      if (monthsDifference >= 12) {
        timeAgo = '1 năm trước';
      } else {
        timeAgo = `${monthsDifference} tháng trước`;
      }
    } else if (daysDifference >= 7) {
      timeAgo = `${Math.floor(daysDifference / 7)} tuần trước`;
    } else if (daysDifference > 0) {
      timeAgo = `${daysDifference} ngày trước`;
    } else if (hoursDifference > 0) {
      timeAgo = `${hoursDifference} giờ trước`;
    } else if (minutesDifference > 0) {
      timeAgo = `${minutesDifference} phút trước`;
    } else {
      timeAgo = 'Vừa xong';
    }

    return (
      <TouchableOpacity style={styles.notificationItem}>
        <Image
          resizeMode="contain"
          source={{
            uri: 'https://th.bing.com/th/id/OIP.iZrlA44xilXu5howRorUOAHaE8?w=278&h=185&c=7&r=0&o=5&pid=1.7',
          }}
          style={styles.notificationImage}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{item?.noti_content}</Text>
          <Text style={styles.notificationTime}>{timeAgo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getAPI = async () => {
    try {
      const res = await apiGet(NOTIFI_API);
      setData(res?.message.reverse());
    } catch (error) {
      console.log('Call api: ', error);
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
      <FlatList
        data={data}
        keyExtractor={item => item?._id}
        renderItem={renderItem}
      />
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
    marginBottom: '2%',
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
