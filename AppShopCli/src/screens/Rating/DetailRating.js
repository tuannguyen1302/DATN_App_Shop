import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Rating } from 'react-native-elements';
import { formatMessageTime } from '../../components/DateTime';
import imagePath from '../../constants/imagePath';
import { API_BASE_URL } from '../../config/urls';

const DetailRating = ({ navigation, route }) => {
  const [selectedRating, setSelectedRating] = useState('Tất cả');
  const [selectedStar, setSelectedStar] = useState(null);
  const { data } = route.params;

  const handleRatingSelect = rating => {
    setSelectedRating(rating);
    setSelectedStar(rating === 'Tất cả' ? null : rating);
  };

  const renderNoComments = () => (
    <View
      style={{
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: '20%',
      }}>
      <Image
        style={{ width: 100, height: 100, resizeMode: 'contain' }}
        source={imagePath.evaluate}
      />
      <Text style={{ fontSize: 15, marginTop: 20, fontWeight: 'bold' }}>
        Không có đánh giá nào nào 👑
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.title}>Infomation Rating</Text>
      </View>
      <View style={{ marginHorizontal: '3%' }}>
        <View style={styles.ratingContainer}>
          <Rating
            readonly
            startingValue={data?.product_ratingAverage}
            imageSize={23}
          />
          <Text style={styles.ratingText}>
            {data?.product_ratingAverage}/5 (
            {Array.isArray(data?.reviews) ? data?.reviews.length : 0} đánh giá)
          </Text>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.ratingFilterContainer}>
            {['Tất cả', '5', '4', '3', '2', '1'].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.ratingFilterItem,
                  {
                    backgroundColor:
                      selectedRating === item ? 'black' : 'white',
                  },
                ]}
                onPress={() => handleRatingSelect(item)}>
                <Text
                  style={[
                    styles.ratingFilterText,
                    { color: selectedRating === item ? 'white' : 'black' },
                  ]}>
                  {item}
                </Text>
                {item !== 'Tất cả' && (
                  <AntDesign name="star" size={20} color={'#f39c12'} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {Array.isArray(data?.reviews) ? (
          data?.reviews?.filter(
            review =>
              selectedStar === null ||
              review.rating.toString() === selectedStar,
          ).length > 0 ? (
            <FlatList
              data={data?.reviews?.filter(
                review =>
                  selectedStar === null ||
                  review.rating.toString() === selectedStar,
              )}
              scrollEnabled={false}
              keyExtractor={item => item._id.toString()}
              renderItem={({ item }) => <ReviewItem item={item} />}
            />
          ) : (
            renderNoComments()
          )
        ) : (
          renderNoComments()
        )}
      </View>
    </View>
  );
};

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.reviewItemContainer}>
      <View style={{ width: '80%' }}>
        <View style={styles.reviewItemLeft}>
          <Image
            style={styles.avatar}
            source={{ uri: `${API_BASE_URL}${item?.user?.information?.avatar}` }}
          />
          <Text style={styles.reviewItemName}>
            {item?.user?.information?.fullName}
          </Text>
        </View>
        <View>
          <Text numberOfLines={2} style={styles.reviewItemComment}>
            {item?.comment}
          </Text>
          <Text style={styles.reviewItemDate}>
            {formatMessageTime(item?.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{item?.rating}</Text>
        <AntDesign name="star" color={'#f39c12'} size={18} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 8,
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ratingFilterContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  ratingFilterItem: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ratingFilterText: {
    fontWeight: 'bold',
  },
  reviewItemContainer: {
    elevation: 3,
    padding: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  reviewItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewItemName: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  reviewItemRight: {
    width: '50%',
  },
  reviewItemDate: {
    color: '#7f8c8d',
    marginTop: 5,
  },
  reviewItemComment: {
    lineHeight: 20,
    color: '#34495e',
    marginTop: 5,
  },
  ratingBadge: {
    width: 70,
    height: 35,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#f39c12',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginLeft: 'auto',
  },
  ratingText: {
    marginRight: 5,
    color: '#f39c12',
    fontWeight: 'bold',
  },
});

export default DetailRating;