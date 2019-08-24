import React from 'react';
import { WebView } from 'react-native';
import { Div } from '@common';

/* =============================================================================
<FileReaderScreen />
============================================================================= */
export const FileReaderScreen = ({ navigation }) => {
  const { source } = navigation.state.params;
  return (
    <Div flex={1}>
      <WebView
        originWhitelist={['http://*', 'https://*', 'file://*', 'data:*']}
        source={source}
        style={{ flex: 1 }}
      />
    </Div>
  );
};
