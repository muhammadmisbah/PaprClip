// @flow

import * as React from 'react';
import { TouchableOpacity } from 'react-native';

/* @flow
============================================================================= */
type ReactNodeWithoutString = React.ChildrenArray<void | null | React.Element<any>>;

type Props = {
  flex?: number,
  center?: boolean,
  justifyContent?: any,
  padding?: number,
  paddingVertical?: number,
  paddingHorizontal?: number,
  margin?: number,
  marginVertical?: number,
  marginHorizontal?: number,
  backgroundColor?: string,
  shadow?: boolean,
  style?: Object,
  children: ReactNodeWithoutString,
  onPress: Function,
  activeOpacity?: number,
};

/* Constant Shadow properties
============================================================================= */
const shadowObj = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.44,
  shadowRadius: 10.32,
  elevation: 16,
};

/* =============================================================================
<Touchable />
============================================================================= */
export const Touchable = (props: Props) => {
  const {
    flex,
    center,
    justifyContent,
    padding,
    paddingVertical,
    paddingHorizontal,
    margin,
    marginVertical,
    marginHorizontal,
    backgroundColor,
    shadow,
    style,
    children,
    onPress,
    activeOpacity,
  } = props;
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[
        {
          flex,
          padding,
          paddingVertical,
          paddingHorizontal,
          margin,
          marginVertical,
          marginHorizontal,
          backgroundColor,
          justifyContent: center ? 'center' : justifyContent,
        },
        shadow && shadowObj,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

/* Default Props
============================================================================= */
Touchable.defaultProps = {
  flex: 0,
  center: false,
  justifyContent: undefined,
  padding: null,
  paddingVertical: null,
  paddingHorizontal: null,
  margin: null,
  marginVertical: null,
  marginHorizontal: null,
  backgroundColor: 'transparent',
  shadow: false,
  style: {},
  activeOpacity: 0.8,
};
