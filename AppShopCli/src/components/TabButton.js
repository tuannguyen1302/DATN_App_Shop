import React, {useRef, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

const TabButton = ({item, onPress, accessibilityState}) => {
  const {selected: focused} = accessibilityState;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

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
});

export default TabButton;
