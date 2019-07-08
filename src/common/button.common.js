// @flow

import * as React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';

/* Flow types
========================================================================= */
type Props = {
  disabled?: boolean,
  width?: number | string,
  height?: number,
  minWidth?: number,
  backgroundColor?: string,
  paddingVertical?: number,
  paddingHorizontal?: number,
  marginVertical?: number,
  marginHorizontal?: number,
  rounded?: boolean,
  borderRadius?: number,
  onPress: Function,
  buttonStyle?: ViewStyleProp,
  iconName?: any,
  iconColor?: string,
  loader?: boolean,
  color?: string,
  fontSize?: number,
  bold?: boolean,
  title: string,
  textStyle?: TextStyleProp,
};

/* =============================================================================
<Button />
============================================================================= */
export const Button = ({
  disabled,
  width,
  height,
  minWidth,
  backgroundColor,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  rounded,
  borderRadius,
  onPress,
  buttonStyle,
  iconName,
  iconColor,
  loader,
  color,
  fontSize,
  bold,
  title,
  textStyle,
}: Props) => (
  <TouchableOpacity
    disabled={loader || disabled}
    style={[
      {
        minWidth,
        width,
        height,
        flexDirection: 'row',
        backgroundColor,
        paddingVertical,
        paddingHorizontal,
        marginVertical,
        marginHorizontal,
        opacity: disabled ? 0.7 : 1,
        borderRadius: rounded ? 5 : borderRadius,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
      buttonStyle || null,
    ]}
    onPress={onPress}
    activeOpacity={1}
  >
    {iconName ? (
      <Icon name={iconName} style={{ color: iconColor, fontSize: 20 }} />
    ) : (
      <View />
    )}
    {loader ? (
      <ActivityIndicator
        size={Platform.OS === 'android' ? fontSize + 5 : null}
        color={color}
      />
    ) : (
      <Text
        style={[
          {
            color,
            fontSize,
            fontWeight: bold ? 'bold' : 'normal',
            marginLeft: 5,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    )}
    <View />
  </TouchableOpacity>
);

/* Default props
============================================================================= */
Button.defaultProps = {
  disabled: false,
  minWidth: 60,
  height: 45,
  width: undefined,
  backgroundColor: '#04A5CF',
  paddingVertical: 10,
  paddingHorizontal: 12,
  marginVertical: null,
  marginHorizontal: null,
  rounded: true,
  borderRadius: 5,
  buttonStyle: {},
  iconName: '',
  iconColor: '#FFFFFF',
  loader: false,
  color: '#FFFFFF',
  fontSize: 15,
  bold: true,
  textStyle: {},
};
