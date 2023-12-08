import React, { useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const TabButton = ({ item, onPress, accessibilityState }) => {
  const { selected: focused } = accessibilityState;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    const animationConfig = { 0: { scale: 0 }, 1: { scale: 1 } };

    if (viewRef.current && textViewRef.current) {
      if (focused) {
        viewRef.current.animate(animationConfig);
        textViewRef.current.animate(animationConfig);
      } else {
        viewRef.current.animate(animationConfig);
        textViewRef.current.animate(animationConfig);
      }
    }
  }, [focused]);

  const renderNotificationBadge = count => {
    if (count > 0) {
      return (
        <View
          style={styles.notificationBadge}
          animation={focused ? 'bounceIn' : 'bounceOut'}>
          <Text style={styles.notificationText}>
            {count > 9 ? '9+' : count}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[styles.background, { backgroundColor: item.color }]}
          animation={focused ? 'bounceIn' : 'bounceOut'}
          duration={500}
          useNativeDriver
        />
        <View style={[styles.button, focused && styles.expandedButton]}>
          <item.type name={item.icon} size={25} color={'black'} />
          <Animatable.View
            ref={textViewRef}
            animation={focused ? 'fadeIn' : 'fadeOut'}
            duration={500}
            useNativeDriver>
            {focused && <Text style={styles.label}>{item.label}</Text>}
          </Animatable.View>
          {item.label === 'Message'
            ? renderNotificationBadge(item.count)
            : null}
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
