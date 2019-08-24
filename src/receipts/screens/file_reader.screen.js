import React from 'react';
import Pdf from 'react-native-pdf';

/* =============================================================================
<FileReaderScreen />
============================================================================= */
export const FileReaderScreen = ({ navigation }) => {
  const { source } = navigation.state.params;
  // eslint-disable-next-line react-native/no-inline-styles
  return <Pdf source={source} style={{ flex: 1, width: '100%' }} />;
};
