import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {thongbao} from './data';

const NotifiScreen = ({navigation}) => {
  const renderItem = ({item}) => {
    const notificationDate = moment(
      `${item.day}/${item.month}/${item.year} ${item.hour}:${item.minute}`,
      'DD/MM/YYYY HH:mm',
    );
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
          resizeMode="cover"
          source={{uri: item.image}}
          style={styles.notificationImage}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{timeAgo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '5%',
          marginBottom: '2%',
          alignItems: 'center',
        }}>
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
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text
          style={{
            left: '30%',
            fontSize: 22,
            color: 'black',
            fontWeight: '600',
          }}>
          Notification
        </Text>
      </View>
      <FlatList
        data={thongbao}
        keyExtractor={item => item.id.toString()}
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
