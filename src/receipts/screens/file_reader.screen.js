import React from 'react';
import PDFReader from 'rn-pdf-reader-js';
import { Div } from '@common';

/* =============================================================================
<FileReaderScreen />
============================================================================= */
export const FileReaderScreen = ({ navigation }) => {
  const { source } = navigation.state.params;
  return (
    <Div flex={1}>
      <PDFReader style={{ flex: 1, backgroundColor: '#FFF' }} source={source} />
    </Div>
  );
};
