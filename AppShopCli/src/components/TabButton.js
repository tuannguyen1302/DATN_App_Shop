import React, {useRef, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';

const TabButton = ({item, onPress, accessibilityState}) => {
  const data = useSelector(state => state?.chat?.chatData);
  const {selected: focused} = accessibilityState;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    const animationConfig = {0: {scale: 0}, 1: {scale: 1}};

    if (focused) {
      viewRef.current.animate(animationConfig);
      textViewRef.current.animate(animationConfig);
    } else {
      viewRef.current.animate(animationConfig);
      textViewRef.current.animate(animationConfig);
    }
  }, [focused]);

  const notificationCount = data
    ? data.reduce((count, item) => count + item.chat?.isRead?.shop?.countNew, 0)
    : 0;

  const renderNotificationBadge = () => {
    if (item.label === 'Message') {
      return (
        <Animatable.View ref={textViewRef} style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{notificationCount}</Text>
        </Animatable.View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[styles.background, {backgroundColor: item.color}]}
        />
        <View style={[styles.button, focused && styles.expandedButton]}>
          <item.type name={item.icon} size={25} color={'black'} />
          <Animatable.View ref={textViewRef}>
            {focused && <Text style={styles.label}>{item.label}</Text>}
          </Animatable.View>
          {notificationCount > 0 && renderNotificationBadge()}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    borderRadius: 16,
  },
  button: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: 50,
    height: 50,
    borderRadius: 16,
  },
  expandedButton: {
    width: 'auto',
  },
  label: {
    color: 'black',
    fontWeight: '400',
    paddingHorizontal: 8,
  },
  notificationBadge: {
    width: 20,
    height: 20,
    top: 0,
    right: 0,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#536EFF',
    position: 'absolute',
  },
  notificationText: {
    color: 'white',
  },
});

export default TabButton;
