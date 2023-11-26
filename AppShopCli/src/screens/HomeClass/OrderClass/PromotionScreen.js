import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const PromotionScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setLoading(false); // Set loading to false when data is fetched
    }, 2000); // Simulate a 2-second delay, replace this with your actual data fetching logic
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>PromotionScreen</Text>
          {/* Add your other components here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PromotionScreen;
