// @flow

import * as React from 'react';
import { View, ScrollView } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

/* Flow Types
============================================================================= */
type ReactNodeWithoutString = React.ChildrenArray<
  void | null | boolean | React.Element<any>
>;

type Props = {
  ScrollViewStyle?: Object,
  padding?: number,
  paddingHorizontal?: ?number,
  paddingVertical?: ?number,
  backgroundColor?: string,
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  center?: boolean,
  style?: ViewStyleProp,
  children: ReactNodeWithoutString,
};

/* =============================================================================
<Content />
============================================================================= */
export const Content = ({
  ScrollViewStyle,
  padding,
  paddingHorizontal,
  paddingVertical,
  justifyContent,
  alignItems,
  backgroundColor,
  center,
  style,
  children,
}: Props) => (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={ScrollViewStyle}>
      <View
        style={[
          {
            flex: 1,
            padding,
            paddingHorizontal,
            paddingVertical,
            backgroundColor,
            justifyContent: center ? 'center' : justifyContent,
            alignItems: center ? 'center' : alignItems,
          },
          style,
        ]}
      >
        {children}
      </View>
    </ScrollView>
  </View>
);

/* Default Props
============================================================================= */
Content.defaultProps = {
  ScrollViewStyle: {},
  padding: 0,
  paddingHorizontal: null,
  paddingVertical: null,
  justifyContent: null,
  alignItems: null,
  center: false,
  backgroundColor: '#FFF',
  style: {},
};
