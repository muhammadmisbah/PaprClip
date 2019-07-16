import React from 'react';
import { Div, PdfReader } from '@common';

/* =============================================================================
<FileReaderScreen />
============================================================================= */
export const FileReaderScreen = ({ navigation }) => {
  const { source } = navigation.state.params;
  return (
    <Div flex={1}>
      <PdfReader source={source} />
    </Div>
  );
};
