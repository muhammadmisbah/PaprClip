// @flow

import * as React from 'react';
import { View } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

/* @flow
============================================================================= */
type ReactNodeWithoutString = React.ChildrenArray<
  void | null | boolean | React.Element<any>
>;

type Props = {
  flex?: number,
  width?: number | string,
  center?: boolean,
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  padding?: number,
  paddingVertical?: number,
  paddingHorizontal?: number,
  margin?: number,
  marginVertical?: number,
  marginHorizontal?: number,
  backgroundColor?: string,
  shadow?: boolean,
  style?: ViewStyleProp,
  children: ReactNodeWithoutString,
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
<Div />
============================================================================= */
export const Div = ({
  flex,
  width,
  center,
  alignItems,
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
}: Props) => (
  <View
    style={[
      shadow && shadowObj,
      {
        flex,
        width,
        padding,
        paddingVertical,
        paddingHorizontal,
        margin,
        marginVertical,
        marginHorizontal,
        backgroundColor,
        alignItems: center ? 'center' : alignItems,
        justifyContent: center ? 'center' : justifyContent,
      },
      style,
    ]}
  >
    {children}
  </View>
);

/* Default Props
============================================================================= */
Div.defaultProps = {
  flex: 0,
  width: null,
  center: false,
  justifyContent: null,
  alignItems: null,
  padding: null,
  paddingVertical: null,
  paddingHorizontal: null,
  margin: null,
  marginVertical: null,
  marginHorizontal: null,
  backgroundColor: 'transparent',
  shadow: false,
  style: {},
};
