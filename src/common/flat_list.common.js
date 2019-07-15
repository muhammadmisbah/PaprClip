// @flow

import * as React from 'react';
import { FlatList } from 'react-native';

/* flow type
============================================================================= */
type Props = {
  data: Array<Object>,
  refreshing: boolean,
  horizontal: boolean,
  ListEmptyComponent: React.ComponentType<any> | null,
  ListFooterComponent?: React.ComponentType<any> | null,
  keyExtractor: string,
  renderItem: any,
  onFetchMore: () => void,
  onRefresh: () => void,
  padding?: number,
  style?: Object,
};

/* =============================================================================
<List />
============================================================================= */
export const List = ({
  data,
  renderItem,
  ListEmptyComponent,
  ListFooterComponent,
  keyExtractor,
  refreshing,
  onFetchMore,
  onRefresh,
  horizontal,
  padding,
  style,
}: Props) => {
  const _keyExtractor = item => item[keyExtractor];
  return (
    <FlatList
      data={data}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      keyExtractor={_keyExtractor}
      renderItem={renderItem}
      refreshing={!!refreshing}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.5}
      onEndReached={onFetchMore}
      horizontal={horizontal}
      contentContainerStyle={[
        {
          padding,
          flexGrow: 1,
        },
        style,
      ]}
    />
  );
};

/* Default props
============================================================================= */
List.defaultProps = {
  padding: 0,
  style: {},
  ListFooterComponent: null,
};
