import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { addReceipt } from '../receipts.actions';

/* =============================================================================
<BarCodeScannerComponent />
============================================================================= */
class BarCodeScannerComponent extends React.Component {
  state = { scanned: false };

  /**
   * When user scanned the qr code
   */
  _handleBarCodeScanned = ({ data }) => {
    const { addNewReceipt, navigation } = this.props;
    this.setState({ scanned: true });
    addNewReceipt({
      _id: '123',
      url: data,
      name: 'test',
      date: 'til feb 2019',
      total: '0.00',
    });
    navigation.navigate('FileReader', { source: { uri: data } });
  };

  render() {
    const { scanned } = this.state;
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this._handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    );
  }
}

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = dispatch => ({
  addNewReceipt: data => dispatch(addReceipt(data)),
});

/* Export
============================================================================= */
export const BarCodeScannerScreen = connect(
  null,
  mapDispatchToProps
)(BarCodeScannerComponent);
