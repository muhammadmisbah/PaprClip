// @flow

import * as React from 'react';
import { View } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

/* Flow types
============================================================================= */
type ReactNodeWithoutString = React.ChildrenArray<
  void | null | boolean | React.Element<any>
>;

type Props = {
  padding?: number,
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  center?: boolean,
  backgroundColor?: string,
  style?: ViewStyleProp,
  children: ReactNodeWithoutString,
};

/* =============================================================================
<Container />
============================================================================= */
export const Container = ({
  padding,
  center,
  justifyContent,
  alignItems,
  backgroundColor,
  style,
  children,
}: Props) => (
  <View
    style={[
      {
        flex: 1,
        padding,
        justifyContent: center ? 'center' : justifyContent,
        alignItems: center ? 'center' : alignItems,
        backgroundColor,
      },
      style,
    ]}
  >
    {children}
  </View>
);

/* Default Props
============================================================================= */
Container.defaultProps = {
  padding: 0,
  justifyContent: '',
  alignItems: 'flex-start',
  backgroundColor: '#FFF',
  center: false,
  style: {},
};
